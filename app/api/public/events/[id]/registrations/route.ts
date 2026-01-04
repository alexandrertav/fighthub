import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/lib/models/Event";
import { Registration } from "@/lib/models/Registration";
import { Payment } from "@/lib/models/Payment";
import { MercadoPagoService } from "@/lib/services/mercadopago";
import { Types } from "mongoose";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: eventId } = await params;
    const body = await req.json();

    const {
      fullName,
      age,
      weight,
      height,
      totalFights,
      recordNotes,
      team,
      level,
      modality,
    } = body;

    if (!fullName || !age || !weight || !height || totalFights === undefined || !team || !level || !modality) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    const event = await Event.findById(eventId).lean();
    if (!event) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
    }

    if (event.status === "FINISHED") {
      return NextResponse.json({ error: "Evento finalizado" }, { status: 400 });
    }

    const reg = await Registration.create({
      eventId: new Types.ObjectId(eventId),
      fullName,
      age,
      weight,
      height,
      totalFights,
      recordNotes,
      team,
      level,
      modality,
      status: "PENDING_PAYMENT",
      matchStatus: "SEM_LUTA",
    });

    const mp = new MercadoPagoService();
    const pref = await mp.createPreference({
      title: `Inscrição - ${event.title}`,
      amount: event.price,
      registrationId: reg._id.toString(),
      payer: {
        name: fullName,
        email: `${fullName.toLowerCase().replace(/\s+/g, '.')}@temp.fighthub.com`,
      },
    });

    const payment = await Payment.create({
      registrationId: reg._id,
      amount: event.price,
      mpPreferenceId: pref.preferenceId,
      checkoutUrl: pref.checkoutUrl,
      status: "pending",
    });

    await Registration.updateOne({ _id: reg._id }, { $set: { paymentId: payment._id } });

    return NextResponse.json({
      registrationId: reg._id.toString(),
      checkoutUrl: pref.checkoutUrl,
      status: "PENDING_PAYMENT",
      matchStatus: "SEM_LUTA",
    });
  } catch (error: any) {
    console.error("Erro ao criar inscrição:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao criar inscrição" },
      { status: 500 }
    );
  }
}
