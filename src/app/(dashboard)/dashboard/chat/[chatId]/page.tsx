import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    chatId: string;
  };
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
  return <div>hello from chat</div>;
};

export default page;
