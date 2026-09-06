import type { Metadata } from "next";
import { IBM_Plex_Mono, Noto_Sans_KR, Space_Grotesk } from "next/font/google";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { SITE, absoluteUrl, jsonLd } from "./site";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const body = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: {
    default: `${SITE.tagline} | ${SITE.koreanName}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.tagline} | ${SITE.koreanName}`,
    description: SITE.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE.tagline} · ${SITE.koreanName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.tagline} | ${SITE.koreanName}`,
    description: SITE.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      alternateName: [SITE.koreanName, SITE.tagline, "울산 룸살롱 안내"],
      description: SITE.description,
      inLanguage: SITE.language,
      dateModified: SITE.reviewedAt,
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.koreanName,
      alternateName: [SITE.name, SITE.owner],
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
      },
      image: absoluteUrl("/opengraph-image"),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }}
        />
      </head>
      <body
        style={{
          fontFamily: "var(--font-noto), var(--font-body)",
          ["--font-display" as string]: "var(--font-space), var(--font-display)",
          ["--font-mono" as string]: "var(--font-plex), var(--font-mono)",
        }}
      >
        <a className="skip-link" href="#main">
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
