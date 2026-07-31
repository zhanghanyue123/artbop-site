# ArtBOP Site

ArtBOP public site and editorial CMS.

## Editorial CMS setup

1. In Supabase SQL Editor, run `supabase/schema.sql`.
2. Optionally run `supabase/seed-airforce.sql`.
3. In Supabase Authentication, create one email/password editor user.
4. Add the values from `.env.example` to Vercel Environment Variables.
5. Deploy and open `/editor`.

Only articles with `published` status, or scheduled articles whose publish
time has arrived, appear on the public website. The service-role key and
agent ingest key must only be stored as server environment variables.

The Tencent Cloud agent can upload images to `/api/agent/upload` and send an
article to `/api/agent/articles` with:

```text
Authorization: Bearer <AGENT_INGEST_KEY>
```

Agent submissions default to `pending_review`. An authenticated agent may
send `status: "published"` to publish immediately. Social-media copy remains
outside the website CMS.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
