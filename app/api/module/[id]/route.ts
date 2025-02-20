import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const userId = req.headers.get("x-user-id") ?? "";

//     // Pastikan student ada dan hanya bisa mengakses modul dari sekolahnya
//     const student = await prisma.student.findUnique({
//       where: { userId },
//       select: { schoolId: true },
//     });

//     if (!student) {
//       return NextResponse.json({ error: "Student not found" }, { status: 404 });
//     }

//     const module = await prisma.module.findUnique({
//       where: {
//         id: params.id,
//         schoolId: student.schoolId, // Pastikan hanya module dari sekolah yang sama
//       },
//       include: {
//         teacher: { select: { user: { select: { fullname: true } } } },
//       },
//     });

//     if (!module) {
//       return NextResponse.json({ error: "Module not found" }, { status: 404 });
//     }

//     return NextResponse.json(module);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Gagal mengambil detail module" },
//       { status: 400 }
//     );
//   }
// }

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("x-user-id") ?? "";
    const userRole = req.headers.get("x-user-role") ?? "";

    if (!userId || !userRole) {
      return NextResponse.json(
        { error: "User ID and role are required" },
        { status: 400 }
      );
    }

    // Dapatkan schoolId berdasarkan role
    let schoolId: string | null = null;

    if (userRole === "STUDENT") {
      const student = await prisma.student.findUnique({
        where: { userId },
        select: { schoolId: true },
      });

      if (!student) {
        return NextResponse.json(
          { error: "Student not found" },
          { status: 404 }
        );
      }

      schoolId = student.schoolId;
    } else if (userRole === "TEACHER") {
      const teacher = await prisma.teacher.findUnique({
        where: { userId },
        select: { schoolId: true },
      });

      if (!teacher) {
        return NextResponse.json(
          { error: "Teacher not found" },
          { status: 404 }
        );
      }

      schoolId = teacher.schoolId ?? "";
    } else {
      return NextResponse.json({ error: "Invalid role" }, { status: 403 });
    }

    // Ambil module berdasarkan schoolId
    const module = await prisma.module.findUnique({
      where: {
        id: params.id,
        schoolId: schoolId, // Pastikan hanya module dari sekolah yang sama
      },
      include: {
        teacher: { select: { user: { select: { fullname: true } } } },
      },
    });

    if (!module) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    return NextResponse.json(module);
  } catch (error) {
    console.error("Error fetching module:", error);
    return NextResponse.json(
      { error: "Gagal mengambil detail module" },
      { status: 500 }
    );
  }
}
