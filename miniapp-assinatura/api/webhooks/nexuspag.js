import { createHmac, timingSafeEqual } from "node:crypto";

function json(data, status = 200) {
  return Response.json(data, { status });
}

function validSignature(rawBody, signature, timestamp, secret) {
  if (!signature || !timestamp || !secret) return false;
  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  const receivedBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return json({ error: "Método não permitido" }, 405);
    }

    const secret = process.env.NEXUSPAG_WEBHOOK_SECRET;
    if (!secret) {
      return json({ error: "Webhook não configurado" }, 500);
    }

    const rawBody = await request.text();
    const signature = request.headers.get("x-nexuspag-signature");
    const timestamp = request.headers.get("x-nexuspag-timestamp");
    if (!validSignature(rawBody, signature, timestamp, secret)) {
      return json({ error: "Assinatura inválida" }, 401);
    }

    let event;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return json({ error: "JSON inválido" }, 400);
    }

    if (event.event !== "payment.confirmed" || event.status !== "paid") {
      return json({ received: true });
    }

    console.log("Pagamento PIX confirmado", {
      transactionId: event.transaction_id,
      externalId: event.external_id,
      amount: event.amount,
      paidAt: event.paid_at,
    });

    return json({ received: true });
  },
};
