import { FC, Suspense } from "react";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import RoomHeader from "@/components/room/RoomHeader";
import RoomSubscribers from "@/components/room/RoomSubscribers";
import { Editor } from "@/components/ui/Editor";
import { UserCheck2 } from "lucide-react";
import Loading from "@/components/shared/Loading";
import PostsFeed from "@/components/room/post/PostsFeed";

interface pageProps {
  params: {
    slug: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const user: User | null = await currentUser();

  const { slug } = params;
  const subscriptionState = await db.subscription.findFirst({
    where: {
      roomId: slug,
      userId: user?.id,
    },
  });

  const subscribers = await db.subscription.findMany({
    where: {
      roomId: slug,
    },
    select: {
      userId: true,
    },
  });
  const isSubscribed = !!subscriptionState;

  const room = await db.room.findFirst({
    where: { id: slug },
  });

  return (
    <div className=" gap-10 lg:grid grid-cols-3">
      <main className="col-span-2">
        <RoomHeader user={user} room={room} isSubscribed={isSubscribed} />
        {!isSubscribed ? (
          <div className="text-center space-y-2 text-gray-500 my-10">
            <UserCheck2 className="w-20 h-20 mx-auto" />
            <h1 className="text-3xl ">Subscribe to Post</h1>
          </div>
        ) : (
          <Editor roomId={room?.id as string} />
        )}
        <Suspense fallback={<Loading />}>
          <PostsFeed roomId={room?.id as string} />
        </Suspense>
      </main>

      <RoomSubscribers room={room} subscribers={subscribers} />
    </div>
  );
};

export default page;
