import {
  ArticleHeader,
  BamdalinPanel,
  Breadcrumb,
} from "../components/SiteChrome";
import {
  MIRROR_TYPES,
  breadcrumbSchema,
  jsonLd,
  pageMetadata,
  SITE,
} from "../site";

export const metadata = pageMetadata({
  title: "부비주소 미러·경유 분류",
  description:
    "부비주소를 표방하는 철자 근접 미러, 경로 복제, 경유 바로가기, 시점 만료 캡처를 잡음으로 분류하는 기준입니다.",
  path: "/mirrors",
});

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "부비주소 미러·경유 분류",
      url: `${SITE.url}/mirrors`,
      description: metadata.description,
      dateModified: SITE.reviewedAt,
      inLanguage: SITE.language,
    },
    breadcrumbSchema([
      { name: "현황판", path: "/" },
      { name: "미러 분류", path: "/mirrors" },
    ]),
  ],
};

export default function MirrorsPage() {
  return (
    <main id="main" className="article-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <div className="shell">
        <Breadcrumb current="미러 분류" />
        <ArticleHeader
          code="DESK 04 / MIRROR TAXONOMY"
          title="부비주소 미러·경유 분류"
          description="비슷해 보이는 페이지가 모두 ‘새 공식 주소’는 아닙니다. 미러와 경유를 먼저 걸러야 장부의 후보 목록이 줄어듭니다."
        />

        <section className="article-section" aria-labelledby="types-title">
          <div className="section-kicker">TAXONOMY</div>
          <h2 id="types-title">네 가지 잡음 유형</h2>
          <div className="mirror-grid">
            {MIRROR_TYPES.map((item) => (
              <article key={item.code} className="mirror-card">
                <span className="code">{item.code}</span>
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
                <p style={{ marginTop: 12 }}>
                  <strong style={{ color: "var(--ink)" }}>대응 · </strong>
                  {item.action}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="article-section two-column-copy" aria-labelledby="filter-title">
          <div>
            <p className="section-kicker">FILTER FIRST</p>
            <h2 id="filter-title">후보를 늘리기 전에 잡음을 줄입니다.</h2>
          </div>
          <div className="prose">
            <p>
              부비주소 관련 검색에는 ‘바로가기’를 내세운 중간 페이지가 끼어들기 쉽습니다.
              중간 페이지를 후보로 올리면 장부가 길어질 뿐 판정은 더 어려워집니다.
            </p>
            <p>
              실무적으로는 최종 주소창의 등록 도메인만 남기고, 경유 클릭 경로는 별도
              메모로 둡니다. 경로·파라미터만 다른 복제는 같은 호스트 이력으로 묶습니다.
            </p>
            <p>
              이 분류는 체크리스트의 ‘중단 신호’와 맞닿지만, 목적은 다릅니다. 중단 신호가
              행동을 멈추게 한다면, 미러 분류는 장부에 올릴 행을 줄입니다.
            </p>
          </div>
        </section>

        <section className="article-section" aria-labelledby="checklist-title">
          <div className="section-kicker">QUICK FILTER</div>
          <h2 id="checklist-title">장부 등재 전 30초 필터</h2>
          <ul className="check-list">
            <li>버튼 문구와 도착 호스트가 같은가?</li>
            <li>등록 도메인 철자를 끝까지 읽었는가?</li>
            <li>관찰일이 최근이며, 캡처만 남은 자료는 아닌가?</li>
            <li>같은 본문이 경로만 바꿔 반복되는가?</li>
          </ul>
        </section>

        <BamdalinPanel />
      </div>
    </main>
  );
}
