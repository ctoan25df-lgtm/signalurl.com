import {
  ArticleHeader,
  BamdalinPanel,
  Breadcrumb,
  RelatedDesks,
} from "../components/SiteChrome";
import {
  breadcrumbSchema,
  jsonLd,
  pageMetadata,
  SITE,
} from "../site";

export const metadata = pageMetadata({
  title: "시그널URL 편집 원칙",
  description:
    "시그널URL이 부비주소 신호를 어떻게 기록하고, 무엇을 단정하지 않으며, 정정 요청을 어떻게 처리하는지 공개합니다.",
  path: "/desk",
});

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "시그널URL 편집 원칙",
      url: `${SITE.url}/desk`,
      description: metadata.description,
      dateModified: SITE.reviewedAt,
      inLanguage: SITE.language,
    },
    breadcrumbSchema([
      { name: "현황판", path: "/" },
      { name: "편집 원칙", path: "/desk" },
    ]),
  ],
};

export default function DeskPage() {
  return (
    <main id="main" className="article-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <div className="shell">
        <Breadcrumb current="편집 원칙" />
        <ArticleHeader
          code="DESK 05 / EDITORIAL"
          title="편집 원칙과 한계"
          description={`${SITE.owner}는 부비주소 관련 공개 주장을 신호로 기록합니다. 운영사 인증, 안전 보증, 실시간 주소 안내를 하지 않습니다.`}
        />

        <section className="article-section" aria-labelledby="do-title">
          <div className="section-kicker">WE DO</div>
          <h2 id="do-title">하는 일</h2>
          <ul className="check-list">
            <li>공개 검색·안내 페이지에서 관찰한 주장·호스트·관찰일을 장부에 남깁니다.</li>
            <li>강한 신호와 약한 신호, 미러·경유 잡음을 구분해 서술합니다.</li>
            <li>채널이 불일치하면 ‘보류’ 상태를 기본값으로 유지합니다.</li>
            <li>역할이 다른 인접 사이트(검증·이용 가이드)와 경계를 명시합니다.</li>
          </ul>
        </section>

        <section className="article-section" aria-labelledby="dont-title">
          <div className="section-kicker">WE DON&apos;T</div>
          <h2 id="dont-title">하지 않는 일</h2>
          <ul className="check-list">
            <li>부산비비기 공식 주소라고 인증하거나 소유권을 주장하지 않습니다.</li>
            <li>특정 도메인의 안전·합법성·결제 보호를 보증하지 않습니다.</li>
            <li>검색 순위만으로 ‘오늘자 정답’을 발표하지 않습니다.</li>
            <li>장부의 미확정 상태를 외부 목록 링크로 덮지 않습니다.</li>
          </ul>
        </section>

        <section className="article-section two-column-copy" aria-labelledby="fix-title">
          <div>
            <p className="section-kicker">CORRECTIONS</p>
            <h2 id="fix-title">정정 요청</h2>
          </div>
          <div className="prose">
            <p>
              관찰일·호스트·주장 문구에 오류가 있으면 공개 가능한 근거(1차 공지 URL,
              캡처 시점, 채널명)와 함께 정정을 요청할 수 있습니다. 근거 없는 ‘삭제
              요구’만으로는 장부 행을 지우지 않습니다.
            </p>
            <p>
              정정이 반영되면 관찰일과 변경 이유를 함께 남깁니다. 과거 이력은 필요 시
              ‘이력’으로 유지해, 시점별 신호를 추적할 수 있게 합니다.
            </p>
          </div>
        </section>

        <RelatedDesks />
        <BamdalinPanel />
      </div>
    </main>
  );
}
