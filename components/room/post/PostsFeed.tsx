import { db } from "@/lib/db";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import PostCard from "./PostCard";

interface PostsFeedProps {
  roomId: string;
}

const PostsFeed: FC<PostsFeedProps> = async ({ roomId }) => {
  const posts = await db.post.findMany({
    where: {
      roomId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (posts.length === 0) {
    return (
      <div className="text-center space-y-2 text-gray-500">
        <AlertCircle className="w-20 h-20 mx-auto" />
        <h1 className="text-3xl ">No Posts Found</h1>
      </div>
    );
  }
  return (
    <main className="space-y-7">
      {posts.map((post, idx) => (
        <PostCard post={post} key={idx} />
      ))}
    </main>
  );
};

export default PostsFeed;
