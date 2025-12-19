import type { APIContext } from "astro";
import { getAdjacentMembers, getAllMembers } from "~/lib/webring";

export async function GET({ params, url }: APIContext) {
  const members = await getAllMembers({ url });
  const { prev } = getAdjacentMembers(members, params.id!);
  if (!prev) {
    return Response.redirect(new URL("/", url));
  }

  return Response.redirect(new URL(`/to/${prev.id}`, url));
}
