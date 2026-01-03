import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Payment } from "@/lib/models/Payment";
import { Registration } from "@/lib/models/Registration";
import { MercadoPagoService } from "@/lib/services/mercadopago";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const paymentId = body?.data?.id ? String(body.data.id) : null;
    if (!paymentId) {
      return NextResponse.json({ ok: true });
    }

    const mp = new MercadoPagoService();
    const mpPayment = await mp.getPayment(paymentId);

    const status = String(mpPayment.status);
    const registrationId = String(mpPayment.external_reference ?? "");

    if (!registrationId) {
      return NextResponse.json({ ok: true });
    }

    await Payment.updateOne(
      { registrationId },
      { $set: { mpPaymentId: paymentId, status } }
    );

    if (status === "approved") {
      await Registration.updateOne(
        { _id: registrationId },
        { $set: { status: "PAID", matchStatus: "SEM_LUTA" } }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ ok: true });
  }
}
