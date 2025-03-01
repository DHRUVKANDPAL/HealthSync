import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string,deptId:string } }
) {
  const id = params.id;
  const deptId=params.deptId;
  const queue = await prisma.offlineMeet.findMany({
    where: {
      doctorId: id,
      deptId: deptId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const perHourQueue: Record<string, any[]> = {};

  queue.forEach((patient) => {
    const hour = patient.to ? new Date(patient.to).getHours() : 0;
    const hour2=patient.from? new Date(patient.from).getHours():0
    const hourLabel = `${hour}:00 - ${hour + 1}:00`; 
    const hourlabel2=`${hour2}:00 - ${hour2+1}:00`;
    if(hourLabel!==hourlabel2){
      if (!perHourQueue[hourLabel]) {
        perHourQueue[hourLabel] = [];
      }
      if (!perHourQueue[hourlabel2]) {
        perHourQueue[hourlabel2] = [];
      }
      perHourQueue[hourLabel].push(patient);
      perHourQueue[hourlabel2].push(patient);
    }
    else{
      if (!perHourQueue[hourLabel]) {
        perHourQueue[hourLabel] = [];
      }
      perHourQueue[hourLabel].push(patient);
    }
  });
  console.log({perHourQueue,queue});

  return NextResponse.json({ perHourQueue,queue, status: 200 });
}
