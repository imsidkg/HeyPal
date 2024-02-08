import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchRedis } from "@/redis/helper";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 400 });
    }

    //verify if both users are not already friends
    const isAlreadyFriend = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    );
    if (isAlreadyFriend) {
      return new Response("Already Friends with this user", { status: 400 });
    }
    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_request`,
      idToAdd
    );
    if (hasFriendRequest) {
      return new Response("No friendRequest Recieved from this user", {
        status: 400,
      });
    }

    db.sadd(`user:${session.user.id}:friends`, idToAdd);
    db.sadd(`user:${idToAdd}:friends`, session.user.id);
    db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd);
    return new Response("OK");
  } catch (error) {}
}
