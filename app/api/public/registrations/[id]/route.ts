import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Registration } from "@/lib/models/Registration";
import { Payment } from "@/lib/models/Payment";
import { Event } from "@/lib/models/Event";

export const runtime = "nodejs";

// GET - Buscar detalhes completos da inscrição
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const registration = await Registration.findById(id).lean();

    if (!registration) {
      return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });
    }

    // Buscar evento relacionado
    const event = await Event.findById(registration.eventId).lean();

    // Buscar pagamento relacionado
    const payment = registration.paymentId
      ? await Payment.findById(registration.paymentId).lean()
      : null;

    return NextResponse.json({
      id: registration._id.toString(),
      eventId: registration.eventId.toString(),
      eventTitle: event?.title || "Evento não encontrado",
      eventSlug: event?.slug || "",
      fullName: registration.fullName,
      age: registration.age,
      weight: registration.weight,
      height: registration.height,
      totalFights: registration.totalFights,
      recordNotes: registration.recordNotes,
      team: registration.team,
      level: registration.level,
      modality: registration.modality,
      status: registration.status,
      matchStatus: registration.matchStatus,
      payment: payment
        ? {
            id: payment._id.toString(),
            amount: payment.amount,
            mpPreferenceId: payment.mpPreferenceId,
            mpPaymentId: payment.mpPaymentId,
            status: payment.status,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
          }
        : null,
      createdAt: registration.createdAt,
      updatedAt: registration.updatedAt,
    });
  } catch (error: any) {
    console.error("Erro ao buscar inscrição:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar inscrição" },
      { status: 500 }
    );
  }
}

// DELETE - Remover inscrição
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const registration = await Registration.findById(id);

    if (!registration) {
      return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });
    }

    // Remover pagamento associado se existir
    if (registration.paymentId) {
      await Payment.findByIdAndDelete(registration.paymentId);
    }

    // Remover inscrição
    await Registration.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Inscrição removida com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao remover inscrição:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao remover inscrição" },
      { status: 500 }
    );
  }
}
