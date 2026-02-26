import { NextResponse } from "next/server";
import { SelfBackendVerifier, AllIds, DefaultConfigStore } from "@selfxyz/core";
import { markSessionVerified } from "@/lib/auth";

let verifier: SelfBackendVerifier | null = null;

function getVerifier() {
  if (!verifier) {
    const endpoint = process.env.NEXT_PUBLIC_SELF_ENDPOINT;
    if (!endpoint) {
      throw new Error("NEXT_PUBLIC_SELF_ENDPOINT environment variable is not configured");
    }
    verifier = new SelfBackendVerifier(
      "zk-vote",
      endpoint,
      false,
      AllIds,
      new DefaultConfigStore({
        minimumAge: 18,
      }),
      "hex"
    );
  }
  return verifier;
}

export async function POST(req: Request) {
  try {
    // Extract sessionId from query params (appended by frontend)
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("session");

    const body = await req.json();
    console.log("[verify] Received body keys:", Object.keys(body));
    console.log("[verify] sessionId:", sessionId);

    const { attestationId, proof, publicSignals, userContextData } = body;

    if (!proof || !publicSignals || !attestationId || !userContextData) {
      console.log("[verify] Missing fields:", {
        hasProof: !!proof,
        hasPublicSignals: !!publicSignals,
        hasAttestationId: !!attestationId,
        hasUserContextData: !!userContextData,
      });
      return NextResponse.json(
        { status: "error", result: false, message: "Missing required fields: proof, publicSignals, attestationId, and userContextData are required" },
        { status: 400 }
      );
    }

    console.log("[verify] Starting verification...");
    const result = await getVerifier().verify(
      attestationId,
      proof,
      publicSignals,
      userContextData
    );
    console.log("[verify] Verification result:", JSON.stringify(result.isValidDetails));

    if (result.isValidDetails.isValid) {
      // Store session as verified so the browser can claim the cookie
      if (sessionId) {
        markSessionVerified(sessionId);
        console.log("[verify] Session marked verified:", sessionId);
      }

      return NextResponse.json({
        status: "success",
        result: true,
        credentialSubject: result.discloseOutput,
      });
    } else {
      return NextResponse.json({
        status: "error",
        result: false,
        details: result.isValidDetails,
      });
    }
  } catch (error) {
    console.error("[verify] Error:", error);
    return NextResponse.json(
      {
        status: "error",
        result: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
