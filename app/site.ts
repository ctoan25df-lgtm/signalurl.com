import type { Metadata } from "next";

export const SITE = {
  name: "SIGNAL URL",
  koreanName: "시그널URL",
  tagline: "울산 룸싸롱 권역 안내",
  url: "https://signalurl.com",
  owner: "시그널URL 편집 데스크",
  /** 권역 정보를 마지막으로 편집·검토한 날. sitemap lastmod. */
  reviewedAt: "2026-09-06",
  edition: "004",
  locale: "ko_KR",
  language: "ko-KR",
  description:
    "울산 룸싸롱을 찾기 전에 권역부터 정하는 안내. 삼산동·성남동·무거동·북구·동구·울주의 가격대, 주차, 예약, 심야 귀가와 결제 전 확인 항목을 한 페이지에 정리했습니다.",
} as const;

/** 한 페이지 구성. 헤더·푸터는 본문 섹션 앵커로 이동한다. */
export const ROUTES = [
  { href: "/", label: "홈" },
  { href: "#areas", label: "권역 비교" },
  { href: "#zones", label: "세부 구역" },
  { href: "#cost", label: "비용 확인" },
  { href: "#timing", label: "요일·시즌" },
  { href: "#return", label: "심야 귀가" },
  { href: "#safety", label: "주의 사항" },
  { href: "#faq", label: "FAQ" },
] as const;

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE.url;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalized}`;
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl("/opengraph-image");

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      url,
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${SITE.tagline} · ${SITE.koreanName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export function breadcrumbSchema(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function jsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
