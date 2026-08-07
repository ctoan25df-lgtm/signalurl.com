import {
  ArticleHeader,
  BamdalinPanel,
  Breadcrumb,
} from "../components/SiteChrome";
import {
  NAME_LAYERS,
  breadcrumbSchema,
  jsonLd,
  pageMetadata,
  SITE,
} from "../site";

export const metadata = pageMetadata({
  title: "부비주소 명칭 층위 지도",
  description:
    "부비주소·부산비비기·숫자형 호스트·최신/공식 문구를 서로 다른 층위로 나눠, 이름이 같다고 같은 운영 주체로 묶지 않게 하는 명칭 지도입니다.",
  path: "/names",
});

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "부비주소 명칭 층위 지도",
      url: `${SITE.url}/names`,
      description: metadata.description,
      dateModified: SITE.reviewedAt,
      inLanguage: SITE.language,
    },
    breadcrumbSchema([
      { name: "현황판", path: "/" },
      { name: "명칭 층위", path: "/names" },
    ]),
  ],
};

export default function NamesPage() {
  return (
    <main id="main" className="article-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <div className="shell">
        <Breadcrumb current="명칭 층위" />
        <ArticleHeader
          code="DESK 02 / NAME LAYERS"
          title="부비주소 명칭 층위 지도"
          description="검색어·브랜드명·호스트·마케팅 문구는 같은 문장에 섞여 보이지만, 증거가 되는 층은 서로 다릅니다. 층을 나눠야 주장을 과장하지 않습니다."
        />

        <section className="article-section" aria-labelledby="layers-title">
          <div className="section-kicker">FOUR LAYERS</div>
          <h2 id="layers-title">한 문장에 섞이는 네 층</h2>
          <div className="name-grid">
            {NAME_LAYERS.map((item) => (
              <article key={item.term} className="name-card">
                <span className="layer">{item.layer}</span>
                <h3>{item.term}</h3>
                <p>{item.meaning}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="article-section two-column-copy" aria-labelledby="trap-title">
          <div>
            <p className="section-kicker">COMMON TRAP</p>
            <h2 id="trap-title">이름이 같으면 같은 사이트일까요?</h2>
          </div>
          <div className="prose">
            <p>
              그렇지 않을 수 있습니다. ‘부비주소’는 검색 의도이고, ‘부산비비기’는 서비스
              맥락의 이름이며, 주소창의 등록 도메인은 별도 관찰 대상입니다. 세 층이 한
              문장에 붙어도 자동으로 동일 운영 주체가 되지는 않습니다.
            </p>
            <p>
              특히 ‘최신·공식·바로가기’는 클릭을 유도하는 문구 층입니다. 이 층만으로
              장부의 판정을 바꾸지 않습니다. 판정을 바꿀 수 있는 것은 1차 공지·채널
              연속성·복수 출처 일치 같은 강한 신호입니다.
            </p>
            <p>
              이 지도는 용어집처럼 UI 기능을 설명하지 않습니다. 카테고리 축이나 순위
              읽기는 도착 후 가이드의 영역이고, 여기서는 주소 주장에 붙는 이름만
              분리합니다.
            </p>
          </div>
        </section>

        <section className="article-section" aria-labelledby="practice-title">
          <div className="section-kicker">PRACTICE</div>
          <h2 id="practice-title">기록할 때 쓰는 한 줄 템플릿</h2>
          <ul className="check-list">
            <li>
              <strong>검색어</strong> — 어떤 키워드로 이 페이지를 만났는지
            </li>
            <li>
              <strong>페이지 주장</strong> — 제목/버튼이 스스로 말하는 내용
            </li>
            <li>
              <strong>호스트</strong> — 주소창 등록 도메인(경로와 분리)
            </li>
            <li>
              <strong>관찰일</strong> — 그 조합을 본 날짜
            </li>
          </ul>
        </section>

        <BamdalinPanel />
      </div>
    </main>
  );
}
