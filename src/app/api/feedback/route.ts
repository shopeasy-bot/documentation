import { NextRequest, NextResponse } from "next/server";
import { sendFeedbackToDiscord, type FeedbackType } from "@/lib/discord-webhook";

const FEEDBACK_TYPES: FeedbackType[] = ["reclamacao", "sugestao"];

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { type, message, name, contact, website } = (body ?? {}) as Record<string, unknown>;

  // honeypot: campo oculto que bots costumam preencher
  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (typeof type !== "string" || !FEEDBACK_TYPES.includes(type as FeedbackType)) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }

  if (typeof message !== "string" || message.trim().length < 10 || message.trim().length > 2000) {
    return NextResponse.json(
      { error: "Mensagem deve ter entre 10 e 2000 caracteres" },
      { status: 400 },
    );
  }

  if (name !== undefined && (typeof name !== "string" || name.length > 120)) {
    return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
  }

  if (contact !== undefined && (typeof contact !== "string" || contact.length > 200)) {
    return NextResponse.json({ error: "Contato inválido" }, { status: 400 });
  }

  try {
    await sendFeedbackToDiscord({
      type: type as FeedbackType,
      message,
      name: name as string | undefined,
      contact: contact as string | undefined,
    });
  } catch (err) {
    console.error("[feedback] falha ao enviar para o Discord", err);
    return NextResponse.json({ error: "Não foi possível enviar agora" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
