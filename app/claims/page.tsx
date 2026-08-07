import {
  ArticleHeader,
  BamdalinPanel,
  Breadcrumb,
  RelatedDesks,
} from "../components/SiteChrome";
import {
  CLAIMS,
  breadcrumbSchema,
  jsonLd,
  pageMetadata,
  SITE,
} from "../site";

export const metadata = pageMetadata({
  title: "부비주소 주장 대조판",
  description:
    "부비주소를 표방하는 공개 주장들을 호스트·관찰일·근거 상태로 나란히 올린 대조판입니다. 단일 공식 도메인을 단정하지 않습니다.",
  path: "/claims",
});

function statusClass(status: (typeof CLAIMS)[number]["status"]) {
  if (status === "교차검증 대기") return "status-tag status-wait";
  if (status === "경유·미러 의심") return "status-tag status-noise";
  if (status === "채널 불일치") return "status-tag status-conflict";
  return "status-tag";
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "부비주소 주장 대조판",
      url: `${SITE.url}/claims`,
      description: metadata.description,
      dateModified: SITE.reviewedAt,
      inLanguage: SITE.language,
    },
    breadcrumbSchema([
      { name: "현황판", path: "/" },
      { name: "주장 대조", path: "/claims" },
    ]),
  ],
};

export default function ClaimsPage() {
  return (
    <main id="main" className="article-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <div className="shell">
        <Breadcrumb current="주장 대조" />
        <ArticleHeader
          code="DESK 01 / CLAIM BOARD"
          title="부비주소 주장 대조판"
          description="한 시점의 검색·안내 화면에 동시에 존재하는 서로 다른 주장을 모아 둡니다. 표에 올렸다는 사실만으로 공식성을 부여하지 않습니다."
        />

        <section className="verdict-banner" aria-label="현재 판정">
          <p>현재 판정</p>
          <strong>단일 공식 주소 확정 보류</strong>
          <span>기준일 {SITE.reviewedAt}</span>
        </section>

        <section className="article-section" aria-labelledby="board-title">
          <div className="section-kicker">MULTI-CLAIM BOARD</div>
          <h2 id="board-title">공개 주장 관찰표</h2>
          <div className="table-wrap">
            <table>
              <caption className="sr-only">부비주소 관련 공개 주장 기록</caption>
              <thead>
                <tr>
                  <th scope="col">관찰 단위</th>
                  <th scope="col">페이지/출처가 내세우는 주장</th>
                  <th scope="col">관찰일</th>
                  <th scope="col">근거 상태</th>
                </tr>
              </thead>
              <tbody>
                {CLAIMS.map((claim) => (
                  <tr key={claim.id}>
                    <td>
                      <strong>{claim.host}</strong>
                      <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 13 }}>
                        {claim.note}
                      </div>
                    </td>
                    <td>{claim.claim}</td>
                    <td>{claim.observedAt}</td>
                    <td>
                      <span className={statusClass(claim.status)}>{claim.status}</span>
                      <div style={{ marginTop: 8, color: "var(--muted)", fontSize: 13 }}>
                        {claim.evidence}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-footnote">
            호스트 이름은 재현을 위한 관찰 단위입니다. 특정 도메인의 소유권·안전·최신성을
            보증하지 않으며, 숫자형 호스트는 변경 이력이 잦아 고정 정답으로 쓰지 않습니다.
          </p>
        </section>

        <section className="article-section two-column-copy" aria-labelledby="why-title">
          <div>
            <p className="section-kicker">WHY MULTI-CLAIM</p>
            <h2 id="why-title">한 줄 링크보다 여러 줄 대조가 필요합니다.</h2>
          </div>
          <div className="prose">
            <p>
              부비주소 검색은 같은 날에도 제목·스니펫·바로가기 버튼이 서로 다른 도착지를
              가리키는 경우가 있습니다. 이때 ‘하나만 남기고 지우기’보다, 불일치를 장부에
              남기는 쪽이 이후 판단을 덜 망가뜨립니다.
            </p>
            <p>
              검증 체크리스트는 이미 고른 한 후보를 재검토할 때 강합니다. 이 대조판은 그
              이전 단계—야생에 떠 있는 후보군을 나란히 두는 자리입니다. 후보가 하나로
              수렴하면 그때 검증 절차로 넘기면 됩니다.
            </p>
            <p>
              채널 불일치 상태가 보이면 로그인·가입·결제 같은 되돌리기 어려운 행동은
              보류하는 편이 안전합니다. 장부의 역할은 서두르게 만드는 것이 아니라,
              서두를 이유를 줄이는 것입니다.
            </p>
          </div>
        </section>

        <RelatedDesks />
        <BamdalinPanel />
      </div>
    </main>
  );
}
