 import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Sales List - Test",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className="w-screen h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center">
        <main className="flex justify-center items-center typography-readable w-full h-full p-4">
          <Toaster />
          {children}
        </main>
      </body>
    </html>
  );
}