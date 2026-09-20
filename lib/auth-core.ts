const SESSION_COOKIE = "am_admin.session";
const SESSION_DAYS = 15;

const enc = new TextEncoder();

function hex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(exp: number): Promise<string> {
  const secret = envPassword();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(String(exp))
  );
  return hex(sig);
}

function envPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

export async function createSessionToken(): Promise<string> {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const sig = await sign(exp);
  return `${exp}.${sig}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || !process.env.ADMIN_PASSWORD) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || !sig) return false;
  if (Date.now() > exp) return false;
  const expected = await sign(exp);
  if (expected !== sig) return false;
  return true;
}

export const adminSessionCookieName = () => SESSION_COOKIE;