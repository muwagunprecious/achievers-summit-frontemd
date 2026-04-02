export type PaystackVerificationData = {
  amount: number;
  customer?: {
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
  } | null;
  metadata?: Record<string, unknown> | null;
  reference: string;
  status: string;
};

export class PaystackVerificationError extends Error {
  code: string;

  constructor(message: string, code = "PAYSTACK_VERIFICATION_FAILED") {
    super(message);
    this.name = "PaystackVerificationError";
    this.code = code;
  }
}

const PAYSTACK_API_BASE = "https://api.paystack.co";

export function isPaystackConfigured() {
  return Boolean(process.env.PAYSTACK_SECRET_KEY);
}

export async function verifyPaystackTransaction(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new PaystackVerificationError(
      "PAYSTACK_SECRET_KEY is not configured.",
      "PAYSTACK_NOT_CONFIGURED",
    );
  }

  const response = await fetch(
    `${PAYSTACK_API_BASE}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  const payload = (await response.json().catch(() => null)) as
    | {
        data?: PaystackVerificationData;
        message?: string;
        status?: boolean;
      }
    | null;

  if (!response.ok || !payload?.status || !payload.data) {
    throw new PaystackVerificationError(
      payload?.message || "Paystack verification failed.",
      response.status === 401 || response.status === 403
        ? "PAYSTACK_INVALID_KEY"
        : "PAYSTACK_VERIFICATION_FAILED",
    );
  }

  return payload.data;
}
