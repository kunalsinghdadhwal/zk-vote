import { NextResponse } from "next/server";
import { SelfBackendVerifier, ATTESTATION_ID, DefaultConfigStore } from "@selfxyz/core";
import type { AttestationId } from "@selfxyz/core";

const aadhaarOnly = new Map<AttestationId, boolean>([
  [ATTESTATION_ID.AADHAAR, true],
]);

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
      true,
      aadhaarOnly,
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
    const { attestationId, proof, publicSignals, userContextData } = await req.json();

    if (!proof || !publicSignals || !attestationId || !userContextData) {
      return NextResponse.json(
        { status: "error", result: false, message: "Missing required fields: proof, publicSignals, attestationId, and userContextData are required" },
        { status: 400 }
      );
    }

    const result = await getVerifier().verify(
      attestationId,
      proof,
      publicSignals,
      userContextData
    );

    if (result.isValidDetails.isValid) {
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
