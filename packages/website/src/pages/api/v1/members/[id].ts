import type { APIContext } from "astro";
import {
  getAdjacentMembers,
  getAllMembers,
  getCurrentMember,
} from "~/lib/webring";

export async function GET({ params, url }: APIContext) {
  const members = await getAllMembers({ url });

  const current = getCurrentMember(members, params.id!);
  const { prev, next } = getAdjacentMembers(members, params.id!);

  if (!current || !prev || !next) {
    return new Response("Member not found", { status: 404 });
  }

  return Response.json({
    current,
    prev,
    next,
  });
}
