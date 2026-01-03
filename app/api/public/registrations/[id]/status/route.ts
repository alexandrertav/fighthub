import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Registration } from "@/lib/models/Registration";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const reg = await Registration.findById(id).lean();

    if (!reg) {
      return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });
    }

    return NextResponse.json({
      registrationId: reg._id.toString(),
      status: reg.status,
      matchStatus: reg.matchStatus,
    });
  } catch (error: any) {
    console.error("Erro ao buscar status:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar status" },
      { status: 500 }
    );
  }
}
