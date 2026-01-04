import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Registration } from "@/lib/models/Registration";

export const runtime = "nodejs";

// GET - Buscar atletas agrupados por categoria para matchmaking
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: eventId } = await params;
    const { searchParams } = new URL(req.url);
    const level = searchParams.get("level"); // AMADOR ou SEMI_PRO

    // Buscar apenas atletas pagos e sem luta
    const query: any = {
      eventId,
      status: "PAID",
      matchStatus: "SEM_LUTA",
    };

    if (level) {
      query.level = level;
    }

    const registrations = await Registration.find(query)
      .sort({ weight: 1 }) // Ordenar por peso
      .lean();

    // Agrupar por modalidade e criar categorias de peso
    const categories: any = {};

    registrations.forEach((reg) => {
      const key = `${reg.modality}_${reg.level}`;
      
      if (!categories[key]) {
        categories[key] = {
          modality: reg.modality,
          level: reg.level,
          athletes: [],
        };
      }

      categories[key].athletes.push({
        id: reg._id.toString(),
        fullName: reg.fullName,
        team: reg.team,
        weight: reg.weight,
        height: reg.height,
        age: reg.age,
        totalFights: reg.totalFights,
        recordNotes: reg.recordNotes,
      });
    });

    // Criar categorias de peso (agrupamentos de ~5kg)
    const weightCategories: any[] = [];

    Object.values(categories).forEach((cat: any) => {
      const { modality, level, athletes } = cat;

      // Agrupar atletas por faixas de peso
      const weightGroups: any = {};

      athletes.forEach((athlete: any) => {
        // Arredondar peso para múltiplo de 5
        const weightCategory = Math.floor(athlete.weight / 5) * 5;
        const categoryKey = `${weightCategory}-${weightCategory + 5}`;

        if (!weightGroups[categoryKey]) {
          weightGroups[categoryKey] = {
            id: `${modality}_${level}_${categoryKey}`.toLowerCase().replace(/\s+/g, "-"),
            modality,
            level,
            weightRange: categoryKey,
            minWeight: weightCategory,
            maxWeight: weightCategory + 5,
            athletes: [],
          };
        }

        weightGroups[categoryKey].athletes.push(athlete);
      });

      // Adicionar apenas categorias com 2+ atletas
      Object.values(weightGroups).forEach((group: any) => {
        if (group.athletes.length >= 2) {
          weightCategories.push(group);
        }
      });
    });

    // Ordenar por modalidade e peso
    weightCategories.sort((a, b) => {
      if (a.modality !== b.modality) {
        return a.modality.localeCompare(b.modality);
      }
      return a.minWeight - b.minWeight;
    });

    return NextResponse.json({
      categories: weightCategories,
      totalAthletes: registrations.length,
    });
  } catch (error: any) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}
