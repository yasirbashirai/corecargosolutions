"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { adminToken, passwordMatches, tokenMatches, updateLead } from "@/lib/leads";

const COOKIE = "cc_admin";

export async function login(_: unknown, form: FormData) {
  await new Promise((r) => setTimeout(r, 800));
  const token = adminToken();
  if (!token || !passwordMatches(String(form.get("password") ?? ""))) return "Wrong password";
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 14,
  });
  redirect("/admin/leads");
}

export async function logout() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
  redirect("/admin/leads");
}

export async function changeLead(form: FormData) {
  if (!tokenMatches((await cookies()).get(COOKIE)?.value)) redirect("/admin/leads");
  const change = String(form.get("change"));
  if (change !== "done" && change !== "new" && change !== "delete") return;
  await updateLead(String(form.get("id")), change);
  revalidatePath("/admin/leads");
}
