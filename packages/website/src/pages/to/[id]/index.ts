import type { APIContext } from "astro";
import { getAllMembers, getCurrentMember } from "~/lib/webring";

export async function GET({ params, url }: APIContext) {
  const members = await getAllMembers({ url });
  const member = getCurrentMember(members, params.id!);
  if (!member) {
    return Response.redirect(new URL("/", url));
  }

  return Response.redirect(member.url);
}
