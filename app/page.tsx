import Link from "next/link";
import { BamdalinPanel, RelatedDesks } from "./components/SiteChrome";
import {
  BAMDALIN,
  bamdalinRegionUrl,
  breadcrumbSchema,
  jsonLd,
  pageMetadata,
  SITE,
} from "./site";

export const metadata = pageMetadata({
  title: "부비주소 신호 장부 — 다중 주장·호스트 대조",
  description: SITE.description,
  path: "/",
});

const desks = [
  {
    number: "01",
    title: "주장 대조",
    description:
      "검색·안내 페이지에 나타난 여러 부비주소 주장을 호스트·관찰일·근거 상태와 함께 한 표에 올립니다.",
    href: "/claims",
  },
  {
    number: "02",
    title: "명칭 층위",
    description:
      "부비주소·부산비비기·숫자형 호스트·‘최신/공식’ 문구를 서로 다른 층위로 분리합니다.",
    href: "/names",
  },
  {
    number: "03",
    title: "변경 신호",
    description:
      "주소가 바뀌었다고 볼 때 강한 신호와 약한 신호를 구분해, 순위·수식어에 끌리지 않게 합니다.",
    href: "/signals",
  },
  {
    number: "04",
    title: "미러 분류",
    description:
      "철자 근접·경로 복제·경유 바로가기·시점 만료 캡처를 잡음으로 분류하는 기준을 둡니다.",
    href: "/mirrors",
  },
  {
    number: "05",
    title: "편집 원칙",
    description:
      "무엇을 기록하고 무엇을 단정하지 않는지, 정정 요청을 어떻게 받는지 공개합니다.",
    href: "/desk",
  },
] as const;

const faqs = [
  {
    question: "시그널URL이 현재 부비주소를 찍어 주나요?",
    answer:
      "아니요. 서로 다른 공개 주장이 보이면 호스트·관찰일·근거 상태만 장부에 남기고, 강한 신호가 모이기 전에는 단일 공식 도메인을 올리지 않습니다.",
  },
  {
    question: "부비주소 검증 체크리스트(bubi.yuheungpick.com)와 뭐가 다른가요?",
    answer:
      "검증 사이트는 이미 손에 쥔 한 주장을 출처·호스트·확인일로 재검토하는 절차입니다. 시그널URL은 야생에 떠 있는 여러 주장을 동시에 대조하는 장부입니다.",
  },
  {
    question: "norangbubi.com(부산비비기 가이드)과 겹치나요?",
    answer:
      "겹치지 않습니다. 그곳은 도착 후 카테고리·순위 읽기입니다. 여기는 도착 전에 주소 주장 자체를 신호로 정리합니다.",
  },
  {
    question: "검색 1위면 공식 부비주소인가요?",
    answer:
      "아닙니다. 검색 순위는 약한 신호입니다. 운영 주체 1차 공지, 채널 연속성, 복수 출처의 동일 종착지가 있어야 강한 신호로 올립니다.",
  },
  {
    question: "밤의달인(bamdalin.com)은 부비 공식인가요?",
    answer:
      "아닙니다. 별도 공개 목록 플랫폼입니다. 장부의 미확정 상태를 목록 링크로 덮지 마세요.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE.url}/#webpage`,
      url: SITE.url,
      name: "부비주소 신호 장부 — 다중 주장·호스트 대조",
      description: SITE.description,
      dateModified: SITE.reviewedAt,
      inLanguage: SITE.language,
      isPartOf: { "@id": `${SITE.url}/#website` },
      breadcrumb: { "@id": `${SITE.url}/#breadcrumb` },
      about: [
        { "@type": "Thing", name: "부비주소 신호" },
        { "@type": "Thing", name: "부비 호스트 대조" },
        { "@type": "Thing", name: "부비주소 미러 분류" },
      ],
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE.url}/opengraph-image`,
      },
    },
    {
      ...breadcrumbSchema([{ name: "현황판", path: "/" }]),
      "@id": `${SITE.url}/#breadcrumb`,
    },
    {
      "@type": "ItemList",
      name: "부비주소 신호 데스크",
      itemListElement: desks.map((desk, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: desk.title,
        url: `${SITE.url}${desk.href}`,
        description: desk.description,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faq`,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />

      <section className="hero shell">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">
              <span>LIVE LEDGER</span>
              부비주소 다중 주장 대조 · {SITE.reviewedAt}
            </p>
            <h1>
              부비주소를
              <br />
              <em>맞히지 않고</em> 기록합니다
            </h1>
            <p className="hero-lede">
              검색에 동시에 떠 있는 서로 다른 주소 주장·호스트·관찰일을 한 장부에
              올립니다. 강한 변경 신호가 모이기 전에는 단일 공식 도메인을 올리지
              않습니다. 한 후보를 클릭하기 직전 검증·접속·사칭 점검은{" "}
              <a href={SITE.relatedSites.bubiCheck.url} rel="noopener noreferrer">
                bubi.yuheungpick.com
              </a>
              으로, 도착 후 카테고리·순위는{" "}
              <a href={SITE.relatedSites.bibigi.url} rel="noopener noreferrer">
                norangbubi.com
              </a>
              으로 넘깁니다.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/claims">
                주장 대조판 열기
              </Link>
              <Link className="button button-accent" href="/mirrors">
                미러·경유 분류
              </Link>
              <a
                className="button"
                href={SITE.relatedSites.bubiCheck.url}
                rel="noopener noreferrer"
              >
                검증 체크
              </a>
              <a
                className="button"
                href={bamdalinRegionUrl("busan")}
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                밤달 부산
              </a>
            </div>
          </div>

          <aside className="signal-console" aria-label="현재 장부 상태">
            <div className="console-top">
              <span>SIGNAL DESK / {SITE.edition}</span>
              <span className="live-dot">HOLD</span>
            </div>
            <div className="console-status">
              <p>현재 판정</p>
              <strong>단일 공식 주소 보류</strong>
            </div>
            <dl className="console-grid">
              <div>
                <dt>기록 단위</dt>
                <dd>주장 · 호스트 · 일자</dd>
              </div>
              <div>
                <dt>판정 기준</dt>
                <dd>강·약 신호 분리</dd>
              </div>
              <div>
                <dt>역할</dt>
                <dd>다중 주장 대조</dd>
              </div>
              <div>
                <dt>비역할</dt>
                <dd>공식 도메인 인증</dd>
              </div>
            </dl>
            <p className="console-caption">
              검증 절차와 이용 가이드는 인접 데스크로 분리합니다.
            </p>
          </aside>
        </div>
      </section>

      <section className="ticker" aria-label="장부 원칙">
        <div>
          <span>CLAIM ≠ PROOF</span>
          <b>•</b>
          <span>RANK ≠ OWNER</span>
          <b>•</b>
          <span>MIRROR ≠ HOME</span>
          <b>•</b>
          <span>DATE THE SIGNAL</span>
          <b>•</b>
          <span>CLAIM ≠ PROOF</span>
          <b>•</b>
          <span>RANK ≠ OWNER</span>
          <b>•</b>
          <span>MIRROR ≠ HOME</span>
          <b>•</b>
          <span>DATE THE SIGNAL</span>
        </div>
      </section>

      <section className="section shell" aria-labelledby="diff-title">
        <div className="section-heading split-heading">
          <div>
            <p className="micro-label">WHY THIS DESK</p>
            <h2 id="diff-title">한 주소를 고르는 사이트와 역할을 나눕니다.</h2>
          </div>
          <p>
            ‘지금 뭐가 맞나’를 찍어 주는 페이지가 많을수록, 서로 다른 주장이 한꺼번에
            쌓입니다. 시그널URL은 그 주장들을 신호로 남겨 대조합니다.
          </p>
        </div>
        <RelatedDesks />
      </section>

      <section className="section section-ink" aria-labelledby="desk-title">
        <div className="shell">
          <div className="section-heading inverse-heading">
            <p className="micro-label">FIVE DESKS</p>
            <h2 id="desk-title">
              주소 하나보다
              <br />
              신호의 구조를 먼저 봅니다.
            </h2>
          </div>
          <div className="desk-grid">
            {desks.map((desk) => (
              <Link key={desk.href} href={desk.href} className="desk-card">
                <span>{desk.number}</span>
                <h3>{desk.title}</h3>
                <p>{desk.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" aria-labelledby="method-title">
        <div className="section-heading split-heading">
          <div>
            <p className="micro-label">METHOD</p>
            <h2 id="method-title">장부에 올리는 최소 단위</h2>
          </div>
          <p>
            도메인 하나보다 ‘누가 · 무엇을 · 언제’를 한 줄로 남기는 쪽이 재현에
            유리합니다.
          </p>
        </div>
        <ol className="numbered-list">
          <li>
            <span>01</span>
            <div>
              <h3>주장</h3>
              <p>페이지가 스스로 내세우는 문구(최신·공식·바로가기 등)를 그대로 적습니다.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>호스트</h3>
              <p>주소창의 등록 도메인을 끝까지 읽고, 경유 페이지와 종착지를 구분합니다.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>관찰일</h3>
              <p>그 주장을 본 날짜를 붙입니다. 날짜 없는 캡처는 이력으로만 취급합니다.</p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h3>근거 상태</h3>
              <p>교차검증 대기·경유 의심·주장만 존재·채널 불일치 중 하나로 표시합니다.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="section shell" aria-labelledby="bamdalin-title">
        <BamdalinPanel />
      </section>

      <section className="section shell faq-section" aria-labelledby="faq-title">
        <div className="section-heading">
          <p className="micro-label">QUICK ANSWERS</p>
          <h2 id="faq-title">먼저 확인할 질문</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                <span>0{index + 1}</span>
                {item.question}
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
