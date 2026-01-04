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
    console.log("🔔 Webhook recebido:", JSON.stringify(body, null, 2));

    // Verificar tipo de notificação
    const type = body?.type;
    if (type !== "payment") {
      console.log("⏭️ Tipo ignorado:", type);
      return NextResponse.json({ ok: true });
    }

    const paymentId = body?.data?.id ? String(body.data.id) : null;
    if (!paymentId) {
      console.log("⚠️ PaymentId não encontrado no webhook");
      return NextResponse.json({ ok: true });
    }

    console.log("🔍 Buscando pagamento:", paymentId);
    const mp = new MercadoPagoService();
    const mpPayment = await mp.getPayment(paymentId);

    const status = String(mpPayment.status);
    const registrationId = String(mpPayment.external_reference ?? "");

    console.log("📊 Status do pagamento:", {
      paymentId,
      status,
      registrationId,
      amount: mpPayment.transaction_amount,
    });

    if (!registrationId) {
      console.log("⚠️ RegistrationId não encontrado no external_reference");
      return NextResponse.json({ ok: true });
    }

    // Atualizar Payment no banco
    const paymentUpdate = await Payment.updateOne(
      { registrationId },
      { $set: { mpPaymentId: paymentId, status } }
    );
    console.log("💾 Payment atualizado:", paymentUpdate.modifiedCount > 0 ? "✅" : "⚠️ Não modificado");

    // Atualizar Registration baseado no status
    if (status === "approved") {
      const regUpdate = await Registration.updateOne(
        { _id: registrationId },
        { $set: { status: "PAID", matchStatus: "SEM_LUTA" } }
      );
      console.log("✅ Pagamento APROVADO - Registration atualizada:", regUpdate.modifiedCount > 0 ? "✅" : "⚠️");
    } else if (status === "rejected" || status === "cancelled") {
      const regUpdate = await Registration.updateOne(
        { _id: registrationId },
        { $set: { status: "CANCELED" } }
      );
      console.log("❌ Pagamento RECUSADO/CANCELADO - Registration atualizada:", regUpdate.modifiedCount > 0 ? "✅" : "⚠️");
    } else if (status === "refunded") {
      const regUpdate = await Registration.updateOne(
        { _id: registrationId },
        { $set: { status: "REFUNDED" } }
      );
      console.log("💰 Pagamento ESTORNADO - Registration atualizada:", regUpdate.modifiedCount > 0 ? "✅" : "⚠️");
    } else {
      console.log("⏳ Status em processamento:", status);
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("❌ Erro no webhook:", error);
    // Sempre retornar 200 para evitar reenvios infinitos
    return NextResponse.json({ ok: true });
  }
}
