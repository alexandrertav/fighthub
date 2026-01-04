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

    const { id } = await params;
    const registration = await Registration.findById(id).lean();

    if (!registration) {
      return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });
    }

    // Buscar payment para pegar checkoutUrl
    const payment = registration.paymentId
      ? await Payment.findById(registration.paymentId).lean()
      : null;

    return NextResponse.json({
      registrationId: registration._id.toString(),
      status: registration.status,
      matchStatus: registration.matchStatus,
      checkoutUrl: payment?.checkoutUrl || null,
    });
  } catch (error: any) {
    console.error("Erro ao buscar status:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar status" },
      { status: 500 }
    );
  }
}
