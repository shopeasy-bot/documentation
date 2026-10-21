import Anthropic from '@anthropic-ai/sdk';
import { botSource, devSource } from '@/lib/sourcer';
import { getLLMText } from '@/lib/get-llm-text';

// Assistente da documentação: responde usando apenas o conteúdo das páginas.
// Fica desativado (GET devolve enabled: false) quando ANTHROPIC_API_KEY não está definida.

export const dynamic = 'force-dynamic';

const MODEL = 'claude-opus-5-5';
const MAX_QUESTION = 600;
const MAX_HISTORY = 6;
const RATE_LIMIT = 8; // perguntas por minuto, por IP
const hits = new Map<string, number[]>();

const INSTRUCTIONS = `Você é o assistente da documentação oficial do ShopEasy, um bot de vendas para Discord.
Responda em português do Brasil, de forma curta e prática (no máximo uns 8 parágrafos curtos ou listas).
Use apenas as informações da documentação abaixo. Se a resposta não estiver nela, diga que não encontrou na documentação e sugira falar com o suporte. Nunca invente comandos, preços, limites ou recursos.
Quando citar uma página, use um link Markdown com o caminho dela, por exemplo [Pagamentos](/docs/pagamentos).
Escreva comandos entre crases, como \`/produto criar\`.
Nunca peça nem aceite tokens, senhas, chaves de API ou dados de pagamento; oriente a pessoa a informar esses dados apenas nos formulários do bot.`;

let docsCache: Promise<string> | undefined;

function loadDocs() {
  docsCache ??= Promise.all(
    [...botSource.getPages(), ...devSource.getPages()].map(getLLMText),
  ).then((pages) => pages.join('\n\n---\n\n'));
  return docsCache;
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

export function GET() {
  return Response.json({ enabled: Boolean(process.env.ANTHROPIC_API_KEY) });
}

interface AskBody {
  question?: unknown;
  page?: unknown;
  history?: unknown;
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'O assistente de IA não está configurado.' }, { status: 503 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (rateLimited(ip)) {
    return Response.json({ error: 'Muitas perguntas seguidas. Aguarde um minuto.' }, { status: 429 });
  }

  let body: AskBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Requisição inválida.' }, { status: 400 });
  }

  const question = typeof body.question === 'string' ? body.question.trim() : '';
  if (!question || question.length > MAX_QUESTION) {
    return Response.json({ error: `Escreva uma pergunta de até ${MAX_QUESTION} caracteres.` }, { status: 400 });
  }
  const page = typeof body.page === 'string' ? body.page.slice(0, 200) : '';

  // Histórico curto, alternando usuário/assistente, apenas texto.
  const history: Anthropic.Beta.BetaMessageParam[] = [];
  if (Array.isArray(body.history)) {
    for (const item of body.history.slice(-MAX_HISTORY)) {
      if (
        item &&
        typeof item === 'object' &&
        (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string' &&
        item.content.trim()
      ) {
        history.push({ role: item.role, content: item.content.slice(0, 4000) });
      }
    }
    while (history.length && history[0].role !== 'user') history.shift();
    if (history.length && history[history.length - 1].role === 'user') history.pop();
  }

  const docs = await loadDocs();
  const client = new Anthropic();

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 4000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'low' },
    system: [
      { type: 'text', text: INSTRUCTIONS },
      // A documentação é estável entre perguntas: fica em cache.
      { type: 'text', text: `<documentacao>\n${docs}\n</documentacao>`, cache_control: { type: 'ephemeral' } },
    ],
    messages: [
      ...history,
      {
        role: 'user',
        content: page ? `Estou na página ${page} da documentação.\n\n${question}` : question,
      },
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === 'refusal') {
          controller.enqueue(encoder.encode('\n\nNão consigo responder isso por aqui. Fale com o suporte, por favor.'));
        } else if (final.stop_reason === 'max_tokens') {
          controller.enqueue(encoder.encode('…'));
        }
      } catch (error) {
        const message =
          error instanceof Anthropic.RateLimitError
            ? 'O assistente está muito ocupado agora. Tente de novo em instantes.'
            : 'Não consegui responder agora. Tente de novo ou fale com o suporte.';
        console.error('[ask]', error instanceof Anthropic.APIError ? `${error.status} ${error.message}` : error);
        controller.enqueue(encoder.encode(`\n\n${message}`));
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
