import RoomsFeed from "@/components/RoomsFeed";
import HomeHeader from "@/components/layout/HomeHeader";
import { db } from "@/lib/db";
import { FC } from "react";

interface HomeProps {
  searchParams: {
    topic?: string;
    search?: string;
  };
}

const Home: FC<HomeProps> = async ({ searchParams }) => {
  const roomsCount = await db.room.findMany({
    where: {
      topic: searchParams.topic,
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <main className="space-y-12">
      <HomeHeader roomsCount={roomsCount.length} />
      <RoomsFeed topic={searchParams.topic} search={searchParams.search} />
    </main>
  );
};

export default Home;
