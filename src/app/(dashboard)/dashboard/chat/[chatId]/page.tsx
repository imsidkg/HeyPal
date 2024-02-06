import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchRedis } from "@/redis/helper";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Message } from "postcss";

interface pageProps {
  params: {
    chatId: string;
  };
}
async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      `zrange`,
      `chat:${chatId}:messages`,
      0,
      -1
    );
    const dbMessages = results.map((message) => {
      JSON.parse(message) as Message;
    });
    const reverseDbMessages = dbMessages.reverse();
  } catch (error) {
    notFound();
  }
}

const page = async ({ params }: pageProps) => {
  const { chatId } = params;

  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const { user } = session;
  const [userId1, userId2] = params.chatId.split("--");
  if (userId1 != user.id && userId2 != user.id) {
    notFound();
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartner = await db.get(`user:${chatPartnerId}`);
  const initialMessages = await getChatMessages(chatId);
  return <div>hello from chat</div>;
};

export default page;
