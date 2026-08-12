export type FeedbackType = "reclamacao" | "sugestao";

interface SendFeedbackEmbedParams {
  type: FeedbackType;
  message: string;
  name?: string;
  contact?: string;
}

const TYPE_CONFIG: Record<FeedbackType, { title: string; color: number }> = {
  reclamacao: { title: "Nova reclamação", color: 0xe74c3c },
  sugestao: { title: "Nova sugestão", color: 0x3498db },
};

export async function sendFeedbackToDiscord({
  type,
  message,
  name,
  contact,
}: SendFeedbackEmbedParams) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("DISCORD_WEBHOOK_URL não configurada");
  }

  const { title, color } = TYPE_CONFIG[type];

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title,
          color,
          fields: [
            { name: "Nome", value: name?.trim() || "Não informado", inline: true },
            { name: "Contato", value: contact?.trim() || "Não informado", inline: true },
            { name: "Mensagem", value: message.trim().slice(0, 1024) },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Discord webhook respondeu ${res.status}`);
  }
}
