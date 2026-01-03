import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/lib/models/Event";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;
    const event = await Event.findOne({ slug }).lean();

    if (!event) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      id: event._id.toString(),
      title: event.title,
      price: event.price,
      allowedModalities: event.allowedModalities,
      date: event.date ?? null,
      location: event.location ?? null,
      status: event.status,
      slug: event.slug,
    });
  } catch (error: any) {
    console.error("Erro ao buscar evento:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar evento" },
      { status: 500 }
    );
  }
}
