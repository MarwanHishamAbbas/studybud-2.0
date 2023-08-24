import RoomsFeed from "@/components/RoomsFeed";
import HomeHeader from "@/components/layout/HomeHeader";
import { db } from "@/lib/db";
import { FC, Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Loading from "@/components/shared/Loading";

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
    <main className="lg:grid grid-cols-3 gap-10">
      <div className=" col-span-2 space-y-12">
        <HomeHeader roomsCount={roomsCount.length} />
        <Suspense fallback={<Loading />}>
          <RoomsFeed topic={searchParams.topic} search={searchParams.search} />
        </Suspense>
      </div>

      <Card className="basis-1/4 h-fit sticky top-5 hidden lg:block">
        <CardHeader>
          <h1 className="text-xl font-semibold">Recent Activities</h1>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-5 "></CardContent>
      </Card>
    </main>
  );
};

export default Home;
