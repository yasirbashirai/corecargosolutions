import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type Lead = {
  id: string;
  at: string;
  subject: string;
  status: "new" | "done";
  fields: [label: string, value: string][];
};

const dir = () => process.env.LEADS_DIR || path.join(process.cwd(), "data");
const file = () => path.join(dir(), "leads.json");

// On Vercel the disk is read-only, so leads live in Upstash Redis (added from the Vercel Marketplace).
// Without those variables, leads are stored in a local file, which suits development and a server with a disk.
const redisUrl = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const HASH = "core-cargo:leads";

async function redis(...command: string[]): Promise<unknown> {
  const res = await fetch(redisUrl()!, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error || `Redis error ${res.status}`);
  return json.result;
}

// Serialises file writes so two simultaneous submissions cannot overwrite each other
let queue: Promise<unknown> = Promise.resolve();
const locked = <T,>(fn: () => Promise<T>): Promise<T> => {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
};

async function readFileLeads(): Promise<Lead[]> {
  try {
    return JSON.parse(await fs.readFile(file(), "utf8"));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeFileLeads(leads: Lead[]) {
  await fs.mkdir(dir(), { recursive: true });
  const tmp = `${file()}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(leads, null, 2));
  await fs.rename(tmp, file());
}

export async function readLeads(): Promise<Lead[]> {
  if (!redisUrl()) return readFileLeads();
  const flat = (await redis("HGETALL", HASH)) as string[];
  const leads: Lead[] = [];
  for (let i = 1; i < flat.length; i += 2) leads.push(JSON.parse(flat[i]));
  return leads.sort((x, y) => y.at.localeCompare(x.at));
}

export async function saveLead(subject: string, fields: Lead["fields"]) {
  const lead: Lead = { id: randomUUID(), at: new Date().toISOString(), subject, status: "new", fields };
  if (redisUrl()) {
    await redis("HSET", HASH, lead.id, JSON.stringify(lead));
    return;
  }
  await locked(async () => writeFileLeads([lead, ...(await readFileLeads())]));
}

export async function updateLead(id: string, change: "done" | "new" | "delete") {
  if (redisUrl()) {
    if (change === "delete") {
      await redis("HDEL", HASH, id);
      return;
    }
    const raw = (await redis("HGET", HASH, id)) as string | null;
    if (raw) await redis("HSET", HASH, id, JSON.stringify({ ...JSON.parse(raw), status: change }));
    return;
  }
  await locked(async () => {
    const leads = await readFileLeads();
    await writeFileLeads(
      change === "delete" ? leads.filter((l) => l.id !== id) : leads.map((l) => (l.id === id ? { ...l, status: change } : l))
    );
  });
}

/** Cookie value proving the admin password was entered. Null when no password is configured. */
export function adminToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  return password ? createHmac("sha256", password).update("core-cargo-admin").digest("hex") : null;
}

export function passwordMatches(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const a = createHmac("sha256", "cmp").update(input).digest();
  const b = createHmac("sha256", "cmp").update(password).digest();
  return timingSafeEqual(a, b);
}

export function tokenMatches(value: string | undefined): boolean {
  const expected = adminToken();
  if (!expected || !value || value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}
