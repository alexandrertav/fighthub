import { randomUUID } from "crypto";

export class MercadoPagoService {
  private accessToken: string;
  private apiPublicUrl?: string;
  private frontendUrl?: string;

  constructor() {
    this.accessToken = process.env.MP_ACCESS_TOKEN || "";
    this.apiPublicUrl = process.env.API_PUBLIC_URL;
    this.frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

    if (!this.accessToken) {
      throw new Error("MP_ACCESS_TOKEN não configurado");
    }
  }

  async createPreference(params: {
    title: string;
    amount: number;
    registrationId: string;
  }): Promise<{ preferenceId: string; checkoutUrl: string }> {
    const body: any = {
      items: [{ title: params.title, quantity: 1, unit_price: params.amount }],
      external_reference: params.registrationId,
    };

    if (this.frontendUrl) {
      const successUrl = `${this.frontendUrl}/inscricao/${params.registrationId}/aguardando?result=success`;
      const pendingUrl = `${this.frontendUrl}/inscricao/${params.registrationId}/aguardando?result=pending`;
      const failureUrl = `${this.frontendUrl}/inscricao/${params.registrationId}/aguardando?result=failure`;

      body.back_urls = { success: successUrl, pending: pendingUrl, failure: failureUrl };
      body.auto_return = "approved";
    }

    if (this.apiPublicUrl) {
      body.notification_url = `${this.apiPublicUrl}/api/webhooks/mercadopago`;
    }

    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`MP preference error: ${res.status} ${txt}`);
    }

    const data: any = await res.json();
    return {
      preferenceId: String(data.id),
      checkoutUrl: String(data.init_point ?? data.sandbox_init_point),
    };
  }

  async getPayment(paymentId: string): Promise<any> {
    const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`MP get payment error: ${res.status} ${txt}`);
    }

    return res.json();
  }
}
