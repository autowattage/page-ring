import { getCollection } from "astro:content";
import { toMember, type Member, type ToMemberContext } from "./member";

export async function getAllMembers(context: ToMemberContext) {
  const members = await getCollection("members").then((members) =>
    members.map((m) => toMember(m, context)),
  );
  return members;
}

export function getCurrentMember(members: Member[], id: string) {
  return members.find((member) => member.id === id) || null;
}

export function getAdjacentMembers(members: Member[], id: string) {
  const index = members.findIndex((member) => member.id === id);
  if (index === -1) {
    return { prev: null, next: null };
  }

  const prev = members[index - 1] || members[members.length - 1];
  const next = members[index + 1] || members[0];

  return { prev, next };
}
