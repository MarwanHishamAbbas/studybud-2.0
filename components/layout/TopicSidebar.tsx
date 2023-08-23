"use client";

import { FC } from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { topicList } from "@/lib/validators/room";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
interface TopicSidebarProps {}

const TopicSidebar: FC<TopicSidebarProps> = ({}) => {
  const router = useRouter();

  return (
    <Card className="basis-1/4 h-fit sticky top-5 hidden lg:block ">
      <CardHeader>
        <h1 className="text-xl font-semibold">Browse Topics</h1>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-5 ">
        {topicList.map((topic) => (
          <Button
            variant="link"
            className="text-base"
            onClick={() => {
              router.replace(`/?topic=${topic}`);
            }}
          >
            {topic}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopicSidebar;
