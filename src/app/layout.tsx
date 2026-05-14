import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "GCES IT Club | Government College of Engineering",
    template: "%s | GCES IT Club",
  },
  description:
    "Official website of the GCES IT Club — Government College of Engineering. Fostering innovation, learning, and collaboration through workshops, hackathons, and tech events.",
  keywords: ["GCES", "IT Club", "engineering college", "hackathon", "coding", "workshops", "tech events"],
  authors: [{ name: "GCES IT Club" }],
  openGraph: {
    type: "website",
    siteName: "GCES IT Club",
    title: "GCES IT Club | Government College of Engineering",
    description: "Innovate. Code. Collaborate. — The official IT Club of Government College of Engineering.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main style={{ minHeight: "100vh" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
