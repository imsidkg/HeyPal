import { authOptions } from "@/lib/auth";
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
      `user:{idToAdd}:friends`,
      idToAdd
    );
    if (isAlreadyFriend) {
      return new Response("Already Friends with this user", { status: 400 });
    }
    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:{idToAdd}:incoming_friend_request`,
      idToAdd
    );
    if (hasFriendRequest) {
      return new Response("No friendRequest Recieved from this user", {
        status: 400,
      });
    }
    return new Response("OK");
  } catch (error) {}
}
