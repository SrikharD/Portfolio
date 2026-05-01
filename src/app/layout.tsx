import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Srikhar Dogiparthy",
  description: "Full-Stack Developer — ASP.NET Core, C#, AI/ML",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
