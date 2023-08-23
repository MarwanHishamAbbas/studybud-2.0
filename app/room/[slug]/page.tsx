import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FC, use } from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const user: User | null = await currentUser();
  const { slug } = params;
  const subscription = await db.subscription.findFirst({
    where: {
      roomId: slug,
      userId: user?.id,
    },
  });

  const isSubscribed = !!subscription;

  const room = await db.room.findFirst({
    where: { id: slug },
  });
  return (
    <div className="space-y-12">
      <header className="space-y-7">
        <div className="py-3 bg-secondary rounded-lg">
          <Link href="/">
            <Button variant="ghost" className="group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-all" />
              <p>All Rooms</p>
            </Button>
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-primary">{room?.name}</h1>
          <Button>{isSubscribed ? "Leave Room" : "Subscribe"}</Button>
        </div>
      </header>
    </div>
  );
};

export default page;
