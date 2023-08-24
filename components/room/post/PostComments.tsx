import { Comment } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import PostCommentCard from "./PostCommentCard";

interface PostCommentsProps {
  comments: Comment[] | null;
}

const PostComments: FC<PostCommentsProps> = async ({ comments }) => {
  if (comments?.length === 0) {
    return (
      <div className="text-center space-y-2 text-gray-500">
        <AlertCircle className="w-20 h-20 mx-auto" />
        <h1 className="text-3xl ">No Comments</h1>
      </div>
    );
  }
  return comments?.map((comment) => <PostCommentCard comment={comment} />);
};

export default PostComments;
