import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Registration } from "@/lib/models/Registration";
import { Payment } from "@/lib/models/Payment";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: eventId } = await params;

    // Total de inscrições
    const totalRegistrations = await Registration.countDocuments({ eventId });

    // Inscrições pagas
    const paidRegistrations = await Registration.countDocuments({
      eventId,
      status: "PAID",
    });

    // Inscrições pendentes
    const pendingRegistrations = await Registration.countDocuments({
      eventId,
      status: "PENDING_PAYMENT",
    });

    // Lutas casadas (LUTA_CONFIRMADA)
    const confirmedMatches = await Registration.countDocuments({
      eventId,
      matchStatus: "LUTA_CONFIRMADA",
    });

    // Lutas sugeridas
    const suggestedMatches = await Registration.countDocuments({
      eventId,
      matchStatus: "LUTA_SUGERIDA",
    });

    // Sem luta
    const noMatch = await Registration.countDocuments({
      eventId,
      matchStatus: "SEM_LUTA",
    });

    // Estornos
    const refunds = await Registration.countDocuments({
      eventId,
      status: "REFUNDED",
    });

    // Cancelados
    const canceled = await Registration.countDocuments({
      eventId,
      status: "CANCELED",
    });

    // Receita total (apenas pagamentos aprovados)
    const payments = await Payment.find({
      registrationId: {
        $in: await Registration.find({ eventId, status: "PAID" }).distinct("_id"),
      },
      status: "approved",
    }).lean();

    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

    return NextResponse.json({
      registrations: {
        total: totalRegistrations,
        paid: paidRegistrations,
        pending: pendingRegistrations,
        refunded: refunds,
        canceled: canceled,
      },
      matches: {
        confirmed: confirmedMatches,
        suggested: suggestedMatches,
        noMatch: noMatch,
      },
      revenue: {
        total: totalRevenue,
        currency: "BRL",
      },
    });
  } catch (error: any) {
    console.error("Erro ao buscar estatísticas:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar estatísticas" },
      { status: 500 }
    );
  }
}
