"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";

import TopicSidebar from "../layout/TopicSidebar";

interface LayoutProps {
  children: ReactNode;
}

const Providers: FC<LayoutProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <main className="max-w-7xl lg:flex gap-10 mx-auto px-2 lg:px-0 mt-16">
        <TopicSidebar />
        <div className="basis-1/2 ">{children}</div>
        <Card className="basis-1/4 h-fit sticky top-5 hidden lg:block">
          <CardHeader>
            <h1 className="text-xl font-semibold">Recent Activities</h1>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-5 "></CardContent>
        </Card>
      </main>
    </QueryClientProvider>
  );
};

export default Providers;
