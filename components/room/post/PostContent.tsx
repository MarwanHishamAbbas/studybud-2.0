"use client";
import EditorOutput from "@/components/ui/EditorOutput";
import { FC, useRef } from "react";

interface PostContentProps {
  content: any;
}

const PostContent: FC<PostContentProps> = ({ content }) => {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="relative text-sm max-h-40 w-full overflow-clip" ref={pRef}>
      <EditorOutput content={content} />
      {pRef.current?.clientHeight === 160 ? (
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-gray-100 to-transparent rounded-lg" />
      ) : null}
    </div>
  );
};

export default PostContent;
