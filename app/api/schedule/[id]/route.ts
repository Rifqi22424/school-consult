import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
      const userId = req.headers.get("x-user-id") ?? "";
      const userRole = req.headers.get("x-user-role") ?? "";
  
      if (userRole !== "TEACHER") {
        return NextResponse.json({ error: "Only teachers can update schedules" }, { status: 403 });
      }
  
      const teacher = await prisma.teacher.findUnique({
        where: { userId },
        select: { id: true },
      });
  
      if (!teacher) {
        return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
      }
  
      const body = await req.json();
      const { status } = body;
  
      if (!["APPROVED", "REJECTED"].includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
  
      // Update status schedule
      const updatedSchedule = await prisma.schedule.update({
        where: { id: params.id, status: "PENDING" },
        data: {
          status,
          counselorId: teacher.id,
          confirmedAt: status === "APPROVED" ? new Date() : null,
        },
      });
  
      return NextResponse.json({ message: "Schedule updated", schedule: updatedSchedule });
    } catch (error) {
      console.error("Error updating schedule:", error);
      return NextResponse.json({ error: "Failed to update schedule" }, { status: 500 });
    }
  }
  