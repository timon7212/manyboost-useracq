import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ManyBoost - Acquire Loyal Users via Creators",
  description: "Distribute your app through creator-driven offerwalls. Measured, capped, and tracked like real UA.",
  keywords: ["user acquisition", "mobile marketing", "influencer marketing", "app promotion", "CPI", "CPA"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GT Walsheim Trial - using system fonts as fallback */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
