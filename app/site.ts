import type { Metadata } from "next";

export const SITE = {
  name: "SIGNAL URL",
  koreanName: "시그널URL",
  tagline: "부비주소 신호 장부",
  url: "https://signalurl.com",
  owner: "시그널URL 편집 데스크",
  reviewedAt: "2026-08-07",
  edition: "001",
  locale: "ko_KR",
  language: "ko-KR",
  description:
    "부비주소 신호 장부. 검색에 나타나는 여러 주소 주장·호스트·관찰일을 한 장부에 대조하고, 강한 변경 신호와 약한 신호를 구분해 단일 공식 도메인을 단정하지 않습니다.",
  keywords: [
    "부비주소",
    "부비주소 신호",
    "부비주소 변경",
    "부산비비기 주소 주장",
    "부비 호스트 대조",
    "부비주소 미러",
    "부비주소 바로가기 구분",
  ],
  relatedSites: {
    bubiCheck: {
      label: "부비주소 검증 체크리스트",
      url: "https://bubi.yuheungpick.com",
      role: "클릭 전 출처·호스트·확인일 검증 절차",
    },
    bibigi: {
      label: "부산비비기 이용 가이드",
      url: "https://norangbubi.com",
      role: "도착 후 카테고리·순위 읽기",
    },
  },
} as const;

export const BAMDALIN = {
  source: "signalurl.com",
  campaign: "bubi_signal",
  regions: [
    { slug: "busan", label: "부산" },
    { slug: "gyeongnam", label: "경남" },
    { slug: "ulsan", label: "울산" },
  ],
} as const;

export function bamdalinRegionUrl(slug: string) {
  return `https://bamdalin.com/board/region/${slug}?utm_source=${BAMDALIN.source}&utm_medium=referral&utm_campaign=${BAMDALIN.campaign}`;
}

export type ClaimStatus =
  | "교차검증 대기"
  | "경유·미러 의심"
  | "주장만 존재"
  | "채널 불일치";

export const CLAIMS = [
  {
    id: "c01",
    host: "busanb38.net",
    claim: "부산비비기 관련 공개 화면으로 관찰된 호스트",
    observedAt: "2026-08-04",
    status: "교차검증 대기" as ClaimStatus,
    evidence: "공개 화면에 표시된 호스트 기록. 운영 주체 1차 공지와의 연속성은 미확정.",
    note: "숫자형 호스트는 변경 빈도가 높아 ‘현재 정답’으로 고정하지 않습니다.",
  },
  {
    id: "c02",
    host: "검색 제목형 ‘부비주소 최신’ 페이지군",
    claim: "최신·공식·바로가기를 동시에 표방하는 제3자 안내 페이지",
    observedAt: "2026-08-06",
    status: "주장만 존재" as ClaimStatus,
    evidence: "검색 스니펫·제목 문구만 관찰. 원문 운영 주체·리디렉션 종착지 미확정.",
    note: "제목에 ‘공식’이 있어도 운영권을 증명하지 않습니다.",
  },
  {
    id: "c03",
    host: "유사 철자·경로만 다른 경유 페이지",
    claim: "부비주소를 표방하지만 실제로는 중간 클릭을 유도하는 페이지",
    observedAt: "2026-08-06",
    status: "경유·미러 의심" as ClaimStatus,
    evidence: "호스트와 버튼 문구가 어긋나거나, 도착지가 안내 문구와 다른 패턴이 관찰됨.",
    note: "경유 페이지는 ‘주소 후보’가 아니라 ‘신호 잡음’으로 분류합니다.",
  },
  {
    id: "c04",
    host: "채널별 서로 다른 안내",
    claim: "검색·커뮤니티·바로가기 페이지가 서로 다른 호스트를 가리킴",
    observedAt: "2026-08-07",
    status: "채널 불일치" as ClaimStatus,
    evidence: "동일 시점 기준으로도 출처마다 다른 도착지가 보임.",
    note: "불일치가 해소되기 전에는 단일 공식 주소 판정을 보류합니다.",
  },
] as const;

export const NAME_LAYERS = [
  {
    term: "부비주소",
    layer: "검색·줄임말 층",
    meaning: "이용자가 주소를 찾을 때 쓰는 검색어. 특정 도메인 소유권을 뜻하지 않습니다.",
  },
  {
    term: "부산비비기",
    layer: "서비스·브랜드 층",
    meaning: "서비스 맥락의 명칭. 명칭이 같다고 해서 모든 ‘부비주소’ 페이지가 같은 운영 주체는 아닙니다.",
  },
  {
    term: "busanb / 숫자형 호스트",
    layer: "호스트 표기 층",
    meaning: "주소창에 보이는 등록 도메인·하위 경로. 관찰일과 함께 적어야 재현 가능합니다.",
  },
  {
    term: "최신·공식·바로가기",
    layer: "마케팅 문구 층",
    meaning: "검색 클릭을 유도하는 수식어. 단독으로는 강한 신호가 아닙니다.",
  },
] as const;

export const STRONG_SIGNALS = [
  {
    title: "운영 주체 1차 공지의 호스트 일치",
    detail: "기존에 이어온 공식 채널이 직접 표시한 호스트와 주소창 등록 도메인이 같을 때.",
  },
  {
    title: "이전 주소에서의 일관된 이동",
    detail: "구 호스트에서 신 호스트로 안내가 반복·고정되고, 중간 경유 광고 페이지가 아닐 때.",
  },
  {
    title: "복수 독립 출처의 동일 종착지",
    detail: "서로 다른 1차 채널이 같은 등록 도메인을 가리키고, 관찰일이 근접할 때.",
  },
] as const;

export const WEAK_SIGNALS = [
  {
    title: "검색 결과 상위 노출",
    detail: "광고·복제 글·시점 차이로 순위가 바뀝니다. 운영권 증거가 아닙니다.",
  },
  {
    title: "제목의 ‘공식/오늘확인’ 문구",
    detail: "작성자가 붙인 수식어일 수 있습니다. 원문 공지와 별개로 봅니다.",
  },
  {
    title: "단일 블로그·커뮤니티 한 줄 링크",
    detail: "재게시·스크랩이 많아 신호가 증폭되어 보일 수 있습니다.",
  },
  {
    title: "버튼 문구와 다른 도착지",
    detail: "경유·미러 패턴입니다. 약한 신호가 아니라 잡음으로 분류합니다.",
  },
] as const;

export const MIRROR_TYPES = [
  {
    code: "M1",
    name: "철자 근접 미러",
    summary: "비슷한 철자·숫자만 바꾼 호스트로 같은 브랜드를 사칭하는 패턴.",
    action: "주소창 등록 도메인을 끝까지 읽고, 1차 공지와 대조하기 전에는 로그인하지 않습니다.",
  },
  {
    code: "M2",
    name: "경로만 다른 복제",
    summary: "본문은 비슷한데 경로·파라미터만 바뀐 안내 페이지.",
    action: "호스트 단위로 기록하고, 경로 차이를 ‘새 공식 주소’로 해석하지 않습니다.",
  },
  {
    code: "M3",
    name: "경유 바로가기",
    summary: "‘부비주소 바로가기’를 표방하지만 중간 광고·수집 페이지를 거치는 유형.",
    action: "중간 클릭 수를 줄이고, 최종 주소창 호스트만 장부에 남깁니다.",
  },
  {
    code: "M4",
    name: "시점 만료 캡처",
    summary: "과거에는 맞았을 수 있으나 관찰일이 오래된 스크린샷·퍼머링크.",
    action: "관찰일을 필수 필드로 두고, 오래된 기록은 ‘후보’가 아니라 ‘이력’으로 둡니다.",
  },
] as const;

export const ROUTES = [
  { href: "/", label: "현황판" },
  { href: "/claims", label: "주장 대조" },
  { href: "/names", label: "명칭 층위" },
  { href: "/signals", label: "변경 신호" },
  { href: "/mirrors", label: "미러 분류" },
  { href: "/desk", label: "편집 원칙" },
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
    keywords: [...SITE.keywords],
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
