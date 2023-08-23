import HomeHeader from "@/components/layout/HomeHeader";
import { db } from "@/lib/db";
import { FC } from "react";

interface HomeProps {}

const Home: FC<HomeProps> = async ({}) => {
  const roomsCount = await db.room.findMany({});

  return (
    <main className="lg:w-1/2 mx-auto">
      <HomeHeader roomsCount={roomsCount.length} />
    </main>
  );
};

export default Home;
