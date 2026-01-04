import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Registration } from "@/lib/models/Registration";

export const runtime = "nodejs";

// POST - Criar/sugerir luta entre dois atletas
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { athlete1Id, athlete2Id, confirmed } = body;

    if (!athlete1Id || !athlete2Id) {
      return NextResponse.json(
        { error: "IDs dos atletas são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar os dois atletas
    const athlete1 = await Registration.findById(athlete1Id);
    const athlete2 = await Registration.findById(athlete2Id);

    if (!athlete1 || !athlete2) {
      return NextResponse.json(
        { error: "Um ou ambos atletas não encontrados" },
        { status: 404 }
      );
    }

    // Validar se ambos estão pagos
    if (athlete1.status !== "PAID" || athlete2.status !== "PAID") {
      return NextResponse.json(
        { error: "Ambos atletas precisam ter pagamento confirmado" },
        { status: 400 }
      );
    }

    // Validar se são do mesmo evento
    if (athlete1.eventId.toString() !== athlete2.eventId.toString()) {
      return NextResponse.json(
        { error: "Atletas precisam ser do mesmo evento" },
        { status: 400 }
      );
    }

    // Validar compatibilidade
    const weightDiff = Math.abs(athlete1.weight - athlete2.weight);
    if (weightDiff > 5) {
      return NextResponse.json(
        { 
          error: "Diferença de peso muito grande",
          warning: `Diferença de ${weightDiff.toFixed(1)}kg pode ser incompatível`
        },
        { status: 400 }
      );
    }

    // Atualizar status dos atletas
    const newStatus = confirmed ? "LUTA_CONFIRMADA" : "LUTA_SUGERIDA";

    await Registration.updateOne(
      { _id: athlete1Id },
      { $set: { matchStatus: newStatus } }
    );

    await Registration.updateOne(
      { _id: athlete2Id },
      { $set: { matchStatus: newStatus } }
    );

    return NextResponse.json({
      success: true,
      matchStatus: newStatus,
      athletes: [
        {
          id: athlete1._id.toString(),
          fullName: athlete1.fullName,
          weight: athlete1.weight,
        },
        {
          id: athlete2._id.toString(),
          fullName: athlete2.fullName,
          weight: athlete2.weight,
        },
      ],
    });
  } catch (error: any) {
    console.error("Erro ao criar luta:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao criar luta" },
      { status: 500 }
    );
  }
}
