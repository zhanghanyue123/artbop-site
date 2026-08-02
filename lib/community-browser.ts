import type { AuthSession } from "./auth-browser";

export type CommunityPost = {
  id: string;
  user_id: string;
  content: string;
  image_urls: string[];
  link_url: string;
  status: string;
  created_at: string;
  profiles?: {
    display_name?: string;
    username?: string;
    avatar_url?: string;
  } | null;
};

function browserConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("网站数据服务尚未配置");
  return { url, anonKey };
}

function authHeaders(accessToken?: string) {
  const { anonKey } = browserConfig();
  return {
    apikey: anonKey,
    Authorization: `Bearer ${accessToken || anonKey}`,
    "Content-Type": "application/json",
  };
}

async function responseData(response: Response) {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || data?.error || "提交失败，请稍后再试");
  }
  return data;
}

export async function getPublishedCommunityPosts() {
  const { url } = browserConfig();
  const query = new URLSearchParams({
    select: "*,profiles(display_name,username,avatar_url)",
    status: "eq.published",
    order: "created_at.desc",
    limit: "50",
  });
  const response = await fetch(`${url}/rest/v1/community_posts?${query}`, {
    headers: authHeaders(),
  });
  return (await responseData(response)) as CommunityPost[];
}

export async function uploadUserMedia(
  session: AuthSession,
  bucket: "community-media" | "submission-media",
  file: File,
) {
  const { url, anonKey } = browserConfig();
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const objectPath = `${session.user.id}/${crypto.randomUUID()}.${extension}`;
  const response = await fetch(
    `${url}/storage/v1/object/${bucket}/${objectPath}`,
    {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "false",
      },
      body: file,
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "图片上传失败");
  }

  return bucket === "community-media"
    ? `${url}/storage/v1/object/public/${bucket}/${objectPath}`
    : objectPath;
}

export async function createCommunityPost(
  session: AuthSession,
  input: { content: string; linkUrl: string; imageUrls: string[] },
) {
  const { url } = browserConfig();
  const response = await fetch(`${url}/rest/v1/community_posts`, {
    method: "POST",
    headers: {
      ...authHeaders(session.access_token),
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      user_id: session.user.id,
      content: input.content,
      link_url: input.linkUrl,
      image_urls: input.imageUrls,
      status: "pending_review",
    }),
  });
  return responseData(response);
}

export async function createProjectSubmission(
  session: AuthSession,
  input: {
    projectTitle: string;
    category: string;
    authorOrStudio: string;
    contactEmail: string;
    description: string;
    institution: string;
    projectUrl: string;
    imageUrls: string[];
    rightsConfirmed: boolean;
    status: "draft" | "pending_review";
  },
) {
  const { url } = browserConfig();
  const response = await fetch(`${url}/rest/v1/project_submissions`, {
    method: "POST",
    headers: {
      ...authHeaders(session.access_token),
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      user_id: session.user.id,
      project_title: input.projectTitle,
      category: input.category,
      author_or_studio: input.authorOrStudio,
      contact_email: input.contactEmail,
      description: input.description,
      institution: input.institution,
      project_url: input.projectUrl,
      image_urls: input.imageUrls,
      rights_confirmed: input.rightsConfirmed,
      status: input.status,
    }),
  });
  return responseData(response);
}
