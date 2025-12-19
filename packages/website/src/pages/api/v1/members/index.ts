import type { APIContext } from "astro";
import { getAllMembers } from "~/lib/webring";

export async function GET({ url }: APIContext) {
  const members = await getAllMembers({ url });

  return Response.json(members);
}
