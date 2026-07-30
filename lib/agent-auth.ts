export function isAgentAuthorized(request: Request) {
  const secret = process.env.AGENT_INGEST_KEY;
  const authorization = request.headers.get("authorization");

  if (!secret || !authorization?.startsWith("Bearer ")) {
    return false;
  }

  return authorization.slice(7) === secret;
}
