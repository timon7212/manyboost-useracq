import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Creators — Earn Money Promoting Games",
  description: "Join 3,700+ creators earning money by promoting mobile games to their audience. Get paid for every install. No minimum followers required.",
  keywords: [
    "creator monetization",
    "influencer earnings",
    "promote games",
    "earn money instagram",
    "earn money tiktok",
    "creator economy",
    "gaming influencer",
  ],
  openGraph: {
    title: "For Creators — Earn Money Promoting Games | ManyBoost",
    description: "Join 3,700+ creators earning money by promoting mobile games to their audience.",
    url: "https://manyboost.io/creators",
  },
  twitter: {
    title: "For Creators — Earn Money Promoting Games | ManyBoost",
    description: "Join 3,700+ creators earning money by promoting mobile games to their audience.",
  },
};

export default function CreatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
