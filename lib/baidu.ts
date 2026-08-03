const DEFAULT_SITE = "https://www.artbop.xyz";

export async function submitUrlsToBaidu(urls: string[]) {
  const token = process.env.BAIDU_PUSH_TOKEN;
  const site = process.env.BAIDU_SITE_URL || DEFAULT_SITE;

  if (!token || urls.length === 0) {
    return { skipped: true };
  }

  const normalized = urls.map((url) => new URL(url, site).toString());
  const endpoint = new URL("https://data.zz.baidu.com/urls");
  endpoint.searchParams.set("site", site);
  endpoint.searchParams.set("token", token);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: normalized.join("\n"),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Baidu submission failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

export async function submitPublishedArticle(record: { slug?: string; status?: string } | null | undefined) {
  if (!record?.slug || record.status !== "published") return;

  try {
    await submitUrlsToBaidu([`/articles/${record.slug}`]);
  } catch (error) {
    console.error("Unable to submit article to Baidu:", error);
  }
}
