import { ArticleInput, ArticleRecord } from "./articles";

function requiredEnvironment(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function supabaseConfig() {
  return {
    url: requiredEnvironment("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: requiredEnvironment("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  };
}

export function serviceConfig() {
  return {
    ...supabaseConfig(),
    serviceKey: requiredEnvironment("SUPABASE_SERVICE_ROLE_KEY"),
  };
}

function publicHeaders() {
  const { anonKey } = supabaseConfig();

  return {
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
  };
}

function serviceHeaders() {
  const { serviceKey } = serviceConfig();

  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };
}

export async function getPublicArticles() {
  const { url } = supabaseConfig();
  const query = new URLSearchParams({
    select: "*",
    order: "publish_at.desc.nullslast,created_at.desc",
  });
  const response = await fetch(
    `${url}/rest/v1/public_articles?${query}`,
    {
      headers: publicHeaders(),
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`Unable to load articles: ${response.status}`);
  }

  return (await response.json()) as ArticleRecord[];
}

export async function getPublicArticle(slug: string) {
  const { url } = supabaseConfig();
  const query = new URLSearchParams({
    select: "*",
    slug: `eq.${slug}`,
    limit: "1",
  });
  const response = await fetch(
    `${url}/rest/v1/public_articles?${query}`,
    {
      headers: publicHeaders(),
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`Unable to load article: ${response.status}`);
  }

  const records = (await response.json()) as ArticleRecord[];
  return records[0] || null;
}

export async function getEditorArticles() {
  const { url } = serviceConfig();
  const query = new URLSearchParams({
    select: "*",
    order: "updated_at.desc",
  });
  const response = await fetch(`${url}/rest/v1/articles?${query}`, {
    headers: serviceHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to load editor articles: ${response.status}`);
  }

  return (await response.json()) as ArticleRecord[];
}

export async function createEditorArticle(input: ArticleInput) {
  const { url } = serviceConfig();
  const response = await fetch(`${url}/rest/v1/articles`, {
    method: "POST",
    headers: {
      ...serviceHeaders(),
      Prefer: "return=representation",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const records = (await response.json()) as ArticleRecord[];
  return records[0];
}

export async function upsertEditorArticle(input: ArticleInput) {
  const { url } = serviceConfig();
  const response = await fetch(
    `${url}/rest/v1/articles?on_conflict=slug`,
    {
      method: "POST",
      headers: {
        ...serviceHeaders(),
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(input),
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const records = (await response.json()) as ArticleRecord[];
  return records[0];
}

export async function updateEditorArticle(
  id: string,
  input: Partial<ArticleInput>,
) {
  const { url } = serviceConfig();
  const response = await fetch(
    `${url}/rest/v1/articles?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        ...serviceHeaders(),
        Prefer: "return=representation",
      },
      body: JSON.stringify(input),
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const records = (await response.json()) as ArticleRecord[];
  return records[0];
}

export async function deleteEditorArticle(id: string) {
  const { url } = serviceConfig();
  const response = await fetch(
    `${url}/rest/v1/articles?id=eq.${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: serviceHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
}

export async function uploadArticleImage(
  path: string,
  file: File,
) {
  const { url, serviceKey } = serviceConfig();
  const response = await fetch(
    `${url}/storage/v1/object/article-images/${path}`,
    {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "true",
      },
      body: await file.arrayBuffer(),
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return `${url}/storage/v1/object/public/article-images/${path}`;
}
