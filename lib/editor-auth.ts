import { cookies } from "next/headers";
import { supabaseConfig } from "./supabase-rest";

export const EDITOR_COOKIE = "artbop_editor_session";

type SupabaseUser = {
  id: string;
  email?: string;
};

export async function validateEditorToken(token: string) {
  const { url, anonKey } = supabaseConfig();
  const response = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const user = (await response.json()) as SupabaseUser;
  const allowedEmail = process.env.EDITOR_EMAIL?.toLowerCase();

  if (
    allowedEmail &&
    user.email?.toLowerCase() !== allowedEmail
  ) {
    return null;
  }

  return user;
}

export async function requireEditor() {
  const cookieStore = await cookies();
  const token = cookieStore.get(EDITOR_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return validateEditorToken(token);
}
