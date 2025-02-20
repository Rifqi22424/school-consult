// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import { z } from "zod";

// const prisma = new PrismaClient();

// // Schema validasi input update (semua field wajib diisi)
// const updateStudentSchema = z.object({
//   email: z.string().email("Invalid email format"),
//   fullname: z.string().min(3, "Full name must be at least 3 characters"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   studentId: z.string().min(5, "Student ID (NIS) must be at least 5 characters"),
//   grade: z.string().min(3, "Grade is required"),
//   schoolId: z.string(),
//   phoneNumber: z
//     .string()
//     .regex(/^62\d{9,13}$/, "Phone number must start with 62 and be between 10-14 digits"),
// });

// export async function PUT(req: Request) {
//   try {
//     // Ambil User ID dari header
//     const userId = req.headers.get("x-user-id");
//     if (!userId) {
//       return NextResponse.json({ message: "User ID is required in header" }, { status: 400 });
//     }

//     const body = await req.json();
//     const validatedData = updateStudentSchema.safeParse(body);

//     if (!validatedData.success) {
//       return NextResponse.json(
//         { message: "Validation error", errors: validatedData.error.format() },
//         { status: 400 }
//       );
//     }

//     const { email, fullname, password, studentId, grade, schoolId, phoneNumber } = validatedData.data;

//     // Cari user berdasarkan ID dari header
//     const user = await prisma.user.findUnique({ where: { id: userId } });

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // Cek apakah email yang baru sudah dipakai user lain
//     if (email !== user.email) {
//       const existingUser = await prisma.user.findUnique({ where: { email } });
//       if (existingUser) {
//         return NextResponse.json({ message: "Email already in use" }, { status: 400 });
//       }
//     }

//     // Hash password sebelum disimpan
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Update data user
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         email,
//         fullname,
//         password: hashedPassword,
//         student: {
//           update: {
//             studentId,
//             grade,
//             schoolId,
//             phoneNumber,
//           },
//         },
//       },
//       include: { student: true },
//     });

//     return NextResponse.json(
//       { message: "Profile updated successfully", user: updatedUser },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Update Error:", error);
//     return NextResponse.json(
//       { message: "Something went wrong", error: error instanceof Error ? error.message : error },
//       { status: 500 }
//     );
//   }
// }
