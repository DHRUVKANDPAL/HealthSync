import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const queue = await prisma.offlineMeet.findMany({
    where: {
      doctorId: id,
      deptId: id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const perHourQueue: Record<string, any[]> = {};

  queue.forEach((patient) => {
    const hour = patient.createdAt ? new Date(patient.createdAt).getHours() : 0;
    const hourLabel = `${hour}:00 - ${hour + 1}:00`; 

    if (!perHourQueue[hourLabel]) {
      perHourQueue[hourLabel] = [];
    }
    perHourQueue[hourLabel].push(patient);
  });

  return NextResponse.json({ perHourQueue,queue, status: 200 });
}
