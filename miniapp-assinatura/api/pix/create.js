const NEXUSPAG_URL = "https://nexuspag.com";

const PRODUCTS = new Map([
  [1699, "Plano principal"],
  [3000, "Plano premium"],
  [999, "Plano promocional"],
  [499, "Plano com desconto final"],
]);

function json(data, status = 200) {
  return Response.json(data, { status });
}

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return json({ error: "MÃ©todo nÃ£o permitido" }, 405);
    }

    if (!process.env.NEXUSPAG_API_KEY) {
      return json({ error: "NEXUSPAG_API_KEY nÃ£o configurada" }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "JSON invÃ¡lido" }, 400);
    }

    const amountInCents = Number(body.amount);
    const product = PRODUCTS.get(amountInCents);
    if (!product) {
      return json({ error: "Produto ou preÃ§o invÃ¡lido" }, 400);
    }

    const externalId = `miniapp-${crypto.randomUUID()}`;
    const origin = new URL(request.url).origin;
    const payload = {
      amount: amountInCents / 100,
      description: product,
      external_id: externalId,
      webhook_url: `${origin}/api/webhooks/nexuspag`,
      expiration: 1800,
    };

    try {
      const response = await fetch(`${NEXUSPAG_URL}/api/pix/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXUSPAG_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.transaction) {
        console.error("NexusPag create error", response.status, result);
        return json({ error: "NÃ£o foi possÃ­vel gerar o PIX" }, response.status >= 400 && response.status < 500 ? response.status : 502);
      }

      const transaction = result.transaction;
      return json({
        id: transaction.id,
        externalId: transaction.external_id,
        status: transaction.status,
        copyPasteCode: transaction.pix_copia_cola,
        qrCodeBase64: transaction.qr_code_base64,
        expiresAt: transaction.expires_at,
      });
    } catch (error) {
      console.error("NexusPag unavailable", error);
      return json({ error: "Gateway de pagamento indisponÃ­vel" }, 502);
    }
  },
};

