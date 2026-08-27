export type TurnstileResult = { success: boolean; hostname?: string; action?: string; "error-codes"?: string[] };

export async function verifyTurnstileToken({ token, secret, expectedHostname, remoteIp, fetcher = fetch }: { token: string; secret: string; expectedHostname?: string; remoteIp?: string; fetcher?: typeof fetch }) {
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);
  const response = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, signal: AbortSignal.timeout(8000) });
  if (!response.ok) return false;
  const result = await response.json() as TurnstileResult;
  if (!result.success) return false;
  if (expectedHostname && result.hostname !== expectedHostname) return false;
  return !result.action || result.action === "inquiry";
}
