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
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");

    // Buscar inscrições recentes
    const recentRegistrations = await Registration.find({ eventId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // Buscar pagamentos recentes confirmados
    const registrationIds = recentRegistrations.map((r) => r._id);
    const recentPayments = await Payment.find({
      registrationId: { $in: registrationIds },
      status: "approved",
    })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .lean();

    // Combinar e ordenar atividades
    const activities: any[] = [];

    // Adicionar inscrições
    recentRegistrations.forEach((reg) => {
      activities.push({
        type: "registration",
        timestamp: reg.createdAt,
        description: `Nova inscrição: ${reg.fullName}`,
        data: {
          registrationId: reg._id.toString(),
          athleteName: reg.fullName,
          status: reg.status,
          modality: reg.modality,
          weight: reg.weight,
        },
      });

      // Se foi atualizado recentemente (diferente de criado), adicionar atualização
      if (reg.updatedAt && reg.updatedAt.getTime() !== reg.createdAt.getTime()) {
        activities.push({
          type: "status_change",
          timestamp: reg.updatedAt,
          description: `Status atualizado: ${reg.fullName} - ${reg.status}`,
          data: {
            registrationId: reg._id.toString(),
            athleteName: reg.fullName,
            status: reg.status,
            matchStatus: reg.matchStatus,
          },
        });
      }
    });

    // Adicionar pagamentos confirmados
    for (const payment of recentPayments) {
      const reg = recentRegistrations.find(
        (r) => r._id.toString() === payment.registrationId.toString()
      );
      if (reg) {
        activities.push({
          type: "payment_confirmed",
          timestamp: payment.updatedAt,
          description: `Pagamento confirmado: ${reg.fullName}`,
          data: {
            registrationId: reg._id.toString(),
            athleteName: reg.fullName,
            amount: payment.amount,
            paymentId: payment.mpPaymentId,
          },
        });
      }
    }

    // Ordenar por timestamp (mais recente primeiro)
    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return NextResponse.json({
      activities: activities.slice(0, limit),
      total: activities.length,
    });
  } catch (error: any) {
    console.error("Erro ao buscar atividades:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar atividades" },
      { status: 500 }
    );
  }
}
