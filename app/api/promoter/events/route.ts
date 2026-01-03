import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/lib/models/Event";
import { Types } from "mongoose";
import slugify from "slugify";

export const runtime = "nodejs";

function uniqueSlug(title: string) {
  const base = slugify(title, { lower: true, strict: true });
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${base}-${suffix}`;
}

// GET - Listar eventos do promotor
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const promoterId = searchParams.get("promoterId");

    if (!promoterId) {
      return NextResponse.json(
        { error: "promoterId é obrigatório" },
        { status: 400 }
      );
    }

    const events = await Event.find({ promoterId: new Types.ObjectId(promoterId) })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      events.map((event) => ({
        id: event._id.toString(),
        slug: event.slug,
        title: event.title,
        price: event.price,
        allowedModalities: event.allowedModalities,
        date: event.date ?? null,
        location: event.location ?? null,
        status: event.status,
        createdAt: event.createdAt,
      }))
    );
  } catch (error: any) {
    console.error("Erro ao listar eventos:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao listar eventos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { promoterId, title, price, allowedModalities, date, location } = body;

    if (!promoterId || !title || price === undefined || !allowedModalities) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    const slug = uniqueSlug(title);

    const created = await Event.create({
      promoterId: new Types.ObjectId(promoterId),
      title,
      price,
      allowedModalities,
      date: date ? new Date(date) : undefined,
      location,
      slug,
      status: "DRAFT",
    });

    return NextResponse.json({
      id: created._id.toString(),
      slug: created.slug,
      status: created.status,
    });
  } catch (error: any) {
    console.error("Erro ao criar evento:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao criar evento" },
      { status: 500 }
    );
  }
}
