"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Providers: FC<LayoutProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className="max-w-7xl mx-auto px-2 lg:px-0 mt-16">{children}</main>
    </QueryClientProvider>
  );
};

export default Providers;
