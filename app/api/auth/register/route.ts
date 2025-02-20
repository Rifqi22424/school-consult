// import { NextResponse } from "next/server";
// import { PrismaClient, Role } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import { sendVerificationEmail } from "@/app/utils/mailer";
// import { z } from "zod";

// const prisma = new PrismaClient();

// // Schema validasi menggunakan zod
// const registerSchema = z.object({
//   email: z.string().email("Invalid email format"),
//   fullname: z.string().min(3, "Full name must be at least 3 characters"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   role: z.enum(["GURU", "MURID"], { message: "Invalid role" }), // Sesuaikan dengan Prisma
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     // Validasi input
//     const validatedData = registerSchema.safeParse(body);
//     if (!validatedData.success) {
//       return NextResponse.json(
//         { message: "Validation error", errors: validatedData.error.format() },
//         { status: 400 }
//       );
//     }

//     const { email, fullname, password, role } = validatedData.data;

//     // Cek apakah email sudah digunakan
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return NextResponse.json(
//         { message: "Email already in use" },
//         { status: 400 }
//       );
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Generate verification code
//     const verificationCode = Math.random().toString(36).substring(2, 8);

//     // Simpan user ke database
//     const user = await prisma.user.create({
//       data: { email, fullname, password: hashedPassword, role, verificationCode },
//     });

//     // Kirim email verifikasi
//     await sendVerificationEmail(email, verificationCode);

//     return NextResponse.json(
//       { message: "User registered. Check your email for verification." },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Registration Error:", error);
//     return NextResponse.json(
//       { message: "Something went wrong", error: error instanceof Error ? error.message : error },
//       { status: 500 }
//     );
//   }
// }
