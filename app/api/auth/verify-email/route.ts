import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { message: "No verification code provided" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({
    where: { verificationCode: code },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired verification code" },
      { status: 400 }
    );
  }

  // Update user status to verified
  await prisma.user.update({
    where: { id: user.id },
    data: { verified: true, verificationCode: null },
  });

  return NextResponse.json({ message: "Email verified!" });
}
