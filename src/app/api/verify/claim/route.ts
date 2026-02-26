import { NextResponse } from "next/server";
import { claimSession, createVerificationToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json(
        { status: "error", message: "Missing sessionId" },
        { status: 400 }
      );
    }

    const valid = claimSession(sessionId);
    if (!valid) {
      return NextResponse.json(
        { status: "error", message: "Session not verified or expired" },
        { status: 403 }
      );
    }

    // Session was verified -- issue the JWT cookie to the browser
    const uuid = crypto.randomUUID();
    const token = await createVerificationToken(uuid);

    const response = NextResponse.json({
      status: "success",
      result: true,
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      path: "/",
      maxAge: 86400,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("[verify/claim] Error:", error);
    return NextResponse.json(
      { status: "error", message: "Internal error" },
      { status: 500 }
    );
  }
}
