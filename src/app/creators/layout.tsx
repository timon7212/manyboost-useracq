import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Creators — Earn Money Promoting Games",
  description: "Join 130+ creators with 19.5M audience earning money by promoting mobile games. Get paid for every install. No minimum followers required.",
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
    description: "Join 130+ creators with 19.5M audience earning money by promoting mobile games.",
    url: "https://manyboost.io/creators",
  },
  twitter: {
    title: "For Creators — Earn Money Promoting Games | ManyBoost",
    description: "Join 130+ creators with 19.5M audience earning money by promoting mobile games.",
  },
};

export default function CreatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
