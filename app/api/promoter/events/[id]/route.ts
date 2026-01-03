import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/lib/models/Event";

export const runtime = "nodejs";

// PATCH - Atualizar evento (incluindo preço)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
    }

    // Atualiza apenas os campos fornecidos
    if (body.title !== undefined) event.title = body.title;
    if (body.price !== undefined) event.price = body.price;
    if (body.allowedModalities !== undefined) event.allowedModalities = body.allowedModalities;
    if (body.date !== undefined) event.date = body.date ? new Date(body.date) : undefined;
    if (body.location !== undefined) event.location = body.location;
    if (body.status !== undefined) event.status = body.status;

    await event.save();

    return NextResponse.json({
      id: event._id.toString(),
      slug: event.slug,
      title: event.title,
      price: event.price,
      status: event.status,
    });
  } catch (error: any) {
    console.error("Erro ao atualizar evento:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao atualizar evento" },
      { status: 500 }
    );
  }
}

// GET - Buscar evento por ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const event = await Event.findById(id).lean();

    if (!event) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      id: event._id.toString(),
      slug: event.slug,
      title: event.title,
      price: event.price,
      allowedModalities: event.allowedModalities,
      date: event.date ?? null,
      location: event.location ?? null,
      status: event.status,
    });
  } catch (error: any) {
    console.error("Erro ao buscar evento:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar evento" },
      { status: 500 }
    );
  }
}
