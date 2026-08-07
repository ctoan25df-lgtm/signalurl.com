import {
  ArticleHeader,
  BamdalinPanel,
  Breadcrumb,
} from "../components/SiteChrome";
import {
  STRONG_SIGNALS,
  WEAK_SIGNALS,
  breadcrumbSchema,
  jsonLd,
  pageMetadata,
  SITE,
} from "../site";

export const metadata = pageMetadata({
  title: "부비주소 변경 신호 — 강·약 구분",
  description:
    "부비주소가 바뀌었다고 볼 때 강한 신호와 약한 신호를 구분하는 기준표입니다. 검색 순위·공식 문구만으로 도메인을 확정하지 않습니다.",
  path: "/signals",
});

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "부비주소 변경 신호 — 강·약 구분",
      url: `${SITE.url}/signals`,
      description: metadata.description,
      dateModified: SITE.reviewedAt,
      inLanguage: SITE.language,
    },
    breadcrumbSchema([
      { name: "현황판", path: "/" },
      { name: "변경 신호", path: "/signals" },
    ]),
  ],
};

export default function SignalsPage() {
  return (
    <main id="main" className="article-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <div className="shell">
        <Breadcrumb current="변경 신호" />
        <ArticleHeader
          code="DESK 03 / CHANGE SIGNALS"
          title="부비주소 변경 신호"
          description="주소가 ‘바뀐 것처럼’ 보이는 순간과, 실제로 강한 근거가 모인 순간은 다릅니다. 신호를 세기로 나눠 장부의 판정 속도를 늦춥니다."
        />

        <section className="article-section" aria-labelledby="strong-title">
          <div className="section-kicker">STRONG</div>
          <h2 id="strong-title">강한 신호</h2>
          <div className="signal-grid">
            {STRONG_SIGNALS.map((item) => (
              <article key={item.title} className="signal-card">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="article-section" aria-labelledby="weak-title">
          <div className="section-kicker">WEAK</div>
          <h2 id="weak-title">약한 신호 · 잡음</h2>
          <div className="signal-grid">
            {WEAK_SIGNALS.map((item) => (
              <article key={item.title} className="signal-card">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="article-section two-column-copy" aria-labelledby="rule-title">
          <div>
            <p className="section-kicker">DECISION RULE</p>
            <h2 id="rule-title">약한 신호가 쌓여도 강한 신호가 되지 않습니다.</h2>
          </div>
          <div className="prose">
            <p>
              검색 상위 + ‘오늘 확인’ + 커뮤니티 한 줄 링크가 동시에 보여도, 각각이 약한
              신호라면 합쳐도 운영권 증거가 되지 않습니다. 장부는 개수를 세기보다 신호의
              종류를 먼저 묻습니다.
            </p>
            <p>
              반대로 강한 신호가 하나라도 확실하지 않으면 ‘보류’가 기본값입니다. 보류는
              실패가 아니라, 잘못된 확정을 막는 상태입니다.
            </p>
            <p>
              보안 경고·과도한 선입금·버튼과 다른 도착지가 보이면 신호 평가를 중단합니다.
              그 지점부터는 주소 후보 경쟁이 아니라 위험 회피 문제입니다.
            </p>
          </div>
        </section>

        <BamdalinPanel />
      </div>
    </main>
  );
}
