import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: "ManyBoost — User Acquisition via Creators",
    template: "%s | ManyBoost",
  },
  description: "Creator-driven user acquisition for mobile games. High-LTV users through gamified offerwall campaigns. CPI/CPE/CPA pricing with full MMP integration.",
  keywords: [
    "user acquisition",
    "mobile UA",
    "influencer marketing",
    "creator marketing",
    "mobile games",
    "app promotion",
    "CPI",
    "CPE", 
    "CPA",
    "offerwall",
    "game studio",
    "mobile marketing",
    "performance marketing",
    "LTV",
    "retention",
  ],
  authors: [{ name: "ManyBoost", url: "https://manyboost.io" }],
  creator: "ManyBoost",
  publisher: "ManyBoost",
  
  // Favicon & Icons
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manyboost.io",
    siteName: "ManyBoost",
    title: "ManyBoost — User Acquisition via Creators",
    description: "Creator-driven user acquisition for mobile games. High-LTV users through gamified offerwall campaigns.",
    images: [
      {
        url: "/HeroPhone.png",
        width: 571,
        height: 634,
        alt: "ManyBoost Platform",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ManyBoost — User Acquisition via Creators",
    description: "Creator-driven user acquisition for mobile games. High-LTV users through gamified offerwall campaigns.",
    images: ["/HeroPhone.png"],
    creator: "@manyboost",
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verification (add your IDs when ready)
  // verification: {
  //   google: "your-google-verification-code",
  // },
  
  // Other
  category: "technology",
  classification: "Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Google Fonts - Playfair Display for corporate pages */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://manyboost.io" />

        {/* Amplitude Analytics with Session Replay */}
        <script 
          src="https://cdn.amplitude.com/script/e71d3b2393199399ddfd46eb8e3c0c52.js"
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function initAmplitude() {
                  if (window.amplitude && window.sessionReplay) {
                    window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));
                    window.amplitude.init('e71d3b2393199399ddfd46eb8e3c0c52', {
                      "fetchRemoteConfig": true,
                      "autocapture": {
                        "attribution": true,
                        "fileDownloads": true,
                        "formInteractions": true,
                        "pageViews": true,
                        "sessions": true,
                        "elementInteractions": true,
                        "networkTracking": true,
                        "webVitals": true,
                        "frustrationInteractions": true
                      }
                    });
                  } else {
                    setTimeout(initAmplitude, 100);
                  }
                }
                if (document.readyState === 'complete') {
                  initAmplitude();
                } else {
                  window.addEventListener('load', initAmplitude);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
