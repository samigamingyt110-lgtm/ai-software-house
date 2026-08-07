import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Software House — CEO Dashboard",
  description: "Command center for your autonomous AI software company",
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
