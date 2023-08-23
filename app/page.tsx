import RoomsFeed from "@/components/RoomsFeed";
import HomeHeader from "@/components/layout/HomeHeader";
import { db } from "@/lib/db";
import { FC } from "react";

interface HomeProps {}

const Home: FC<HomeProps> = async ({}) => {
  const roomsCount = await db.room.findMany({});

  return (
    <main className="space-y-12">
      <HomeHeader roomsCount={roomsCount.length} />
      <RoomsFeed />
    </main>
  );
};

export default Home;
