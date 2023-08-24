"use client";

import { FC } from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { topicList } from "@/lib/validators/room";
import { Button } from "../ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
interface TopicSidebarProps {}

const TopicSidebar: FC<TopicSidebarProps> = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicQuery = searchParams.get("topic");

  return (
    <Card className=" h-fit sticky top-5 hidden lg:block ">
      <CardHeader className="border-b mb-5 py-5">
        <h1 className="text-xl font-semibold">Browse Topics</h1>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-5 ">
        <Button
          variant="link"
          className={`text-base ${!topicQuery ? "underline" : ""}`}
          onClick={() => {
            router.replace(`/`);
          }}
        >
          All Rooms
        </Button>
        {topicList.map((topic) => (
          <Button
            variant="link"
            className={`text-base ${topicQuery === topic ? "underline" : ""}`}
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
