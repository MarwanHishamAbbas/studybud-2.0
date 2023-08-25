import { TailwindIndicator } from "@/components/helper/TailwindIndicator";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/shared/Providers";
import { Toaster } from "@/components/ui/Toaster";

export const metadata = {
  title: "StudyBud | Find study partner around the world!",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <Providers>{children}</Providers>
          <Toaster />
          <TailwindIndicator />
        </body>
      </html>
    </ClerkProvider>
  );
}
