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

    const { id: eventId } = await params;
    const { searchParams } = new URL(req.url);
    
    const status = searchParams.get("status");
    const matchStatus = searchParams.get("matchStatus");
    const limit = parseInt(searchParams.get("limit") || "100");
    const skip = parseInt(searchParams.get("skip") || "0");

    const query: any = { eventId };
    if (status) query.status = status;
    if (matchStatus) query.matchStatus = matchStatus;

    const registrations = await Registration.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await Registration.countDocuments(query);

    return NextResponse.json({
      registrations: registrations.map((reg) => ({
        id: reg._id.toString(),
        eventId: reg.eventId.toString(),
        fullName: reg.fullName,
        age: reg.age,
        weight: reg.weight,
        height: reg.height,
        totalFights: reg.totalFights,
        recordNotes: reg.recordNotes,
        team: reg.team,
        level: reg.level,
        modality: reg.modality,
        status: reg.status,
        matchStatus: reg.matchStatus,
        createdAt: reg.createdAt,
        updatedAt: reg.updatedAt,
      })),
      total,
      limit,
      skip,
    });
  } catch (error: any) {
    console.error("Erro ao buscar inscrições:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar inscrições" },
      { status: 500 }
    );
  }
}
