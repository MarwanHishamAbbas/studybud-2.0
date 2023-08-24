"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { FC, ReactNode } from "react";

import TopicSidebar from "../layout/TopicSidebar";

interface LayoutProps {
  children: ReactNode;
}

const Providers: FC<LayoutProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <main className="max-w-7xl lg:grid grid-cols-4 gap-10 mx-auto px-2 lg:px-0 my-16">
        <TopicSidebar />
        <div className="col-span-3">{children}</div>
      </main>
    </QueryClientProvider>
  );
};

export default Providers;
