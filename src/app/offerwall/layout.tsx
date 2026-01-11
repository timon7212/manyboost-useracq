import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Publishers — Monetize with Premium Offerwalls",
  description: "Turn your app's engaged users into revenue. High eCPM offers from top game studios, seamless SDK integration. NET-7 payouts.",
  keywords: [
    "offerwall SDK",
    "app monetization",
    "publisher monetization",
    "mobile ads",
    "rewarded offers",
    "eCPM",
    "mobile publisher",
  ],
  openGraph: {
    title: "For Publishers — Premium Offerwall Monetization | ManyBoost",
    description: "Turn your app's engaged users into revenue. High eCPM offers from top game studios.",
    url: "https://manyboost.io/offerwall",
  },
  twitter: {
    title: "For Publishers — Premium Offerwall Monetization | ManyBoost",
    description: "Turn your app's engaged users into revenue. High eCPM offers from top game studios.",
  },
};

export default function OfferwallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
