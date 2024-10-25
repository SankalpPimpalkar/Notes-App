import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Notes App",
  description: "A platform which provides you a platform to create notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body className={`antialiased`}>
        <div className="bg-gray-100 w-full min-h-dvh">
          {children}
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
