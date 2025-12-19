import type { APIContext } from "astro";
import { getAdjacentMembers, getAllMembers } from "~/lib/webring";

const getHostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

export async function GET({ url, request }: APIContext) {
  const origin = request.headers.get("origin");
  const originHostname = getHostname(origin || "");
  if (!origin || !originHostname) {
    return new Response("Origin header missing or invalid", { status: 400 });
  }

  const members = await getAllMembers({ url });
  let current = members.find(
    (member) => getHostname(member.url) === originHostname,
  );
  if (!current) {
    if (import.meta.env.DEV && originHostname === "localhost") {
      current = members[0];
    } else {
      return new Response("Member not found", { status: 404 });
    }
  }

  const { prev, next } = getAdjacentMembers(members, current.id);
  if (!prev || !next) {
    return new Response("Member not found", { status: 404 });
  }

  return Response.json({
    current,
    prev,
    next,
    members,
  });
}
