import Link from "next/link";
import {
  BAMDALIN,
  bamdalinRegionUrl,
  ROUTES,
  SITE,
} from "../site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label={`${SITE.koreanName} 홈`}>
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>
            <strong>{SITE.name}</strong>
            <small>
              {SITE.tagline} / ED {SITE.edition}
            </small>
          </span>
        </Link>
        <nav aria-label="주요 메뉴">
          {ROUTES.filter((route) => route.href !== "/").map((route) => (
            <Link key={route.href} href={route.href}>
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-brand">{SITE.name}</p>
          <p>
            {SITE.owner}가 운영하는 독립 신호 장부입니다. 부산비비기 운영사와 제휴하거나
            공식 관계를 맺은 사이트가 아닙니다. 주소 소유권·안전·합법성을 보증하지 않습니다.
            클릭 전 검증은{" "}
            <a href={SITE.relatedSites.bubiCheck.url} rel="noopener noreferrer">
              bubi.yuheungpick.com
            </a>
            , 도착 후 읽기는{" "}
            <a href={SITE.relatedSites.bibigi.url} rel="noopener noreferrer">
              norangbubi.com
            </a>
            으로 나눕니다.
          </p>
        </div>
        <div>
          <p className="micro-label">LAST REVIEW</p>
          <p>{SITE.reviewedAt}</p>
          <Link href="/desk">정정·출처 원칙 보기 →</Link>
        </div>
      </div>
    </footer>
  );
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="breadcrumb" aria-label="경로">
      <Link href="/">현황판</Link>
      <span aria-hidden="true">/</span>
      <span>{current}</span>
    </nav>
  );
}

export function ArticleHeader({
  code,
  title,
  description,
}: {
  code: string;
  title: string;
  description: string;
}) {
  return (
    <header className="article-header">
      <p className="micro-label">{code}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export function BamdalinPanel() {
  return (
    <section className="bamdalin-panel" aria-labelledby="bamdalin-panel-title">
      <div>
        <p className="micro-label">SEPARATE PLATFORM</p>
        <h2 id="bamdalin-panel-title">밤의달인 지역 목록</h2>
        <p>
          신호 장부의 미확정 상태를 덮지 않는 별도 공개 목록입니다. 부비 공식 주소가 아니며,
          부산·경남·울산 정보를 지역 단위로 확인할 때 사용합니다.
        </p>
      </div>
      <div className="button-row">
        {BAMDALIN.regions.map((region) => (
          <a
            key={region.slug}
            className="button"
            href={bamdalinRegionUrl(region.slug)}
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            {region.label} 목록
          </a>
        ))}
      </div>
    </section>
  );
}

export function RelatedDesks() {
  return (
    <aside className="related-desks" aria-label="역할이 다른 인접 사이트">
      <p className="micro-label">ADJACENT DESKS</p>
      <ul>
        <li>
          <a href={SITE.relatedSites.bubiCheck.url} rel="noopener noreferrer">
            {SITE.relatedSites.bubiCheck.label}
          </a>
          <span>{SITE.relatedSites.bubiCheck.role}</span>
        </li>
        <li>
          <a
            href={`${SITE.relatedSites.bubiCheck.url}/safety`}
            rel="noopener noreferrer"
          >
            부비 사칭·안전 점검
          </a>
          <span>한 후보 클릭 직전 중단 신호</span>
        </li>
        <li>
          <a
            href={`${SITE.relatedSites.bubiCheck.url}/access`}
            rel="noopener noreferrer"
          >
            부비 접속 점검
          </a>
          <span>검증 실패와 네트워크 장애 구분</span>
        </li>
        <li>
          <a href={SITE.relatedSites.bibigi.url} rel="noopener noreferrer">
            {SITE.relatedSites.bibigi.label}
          </a>
          <span>{SITE.relatedSites.bibigi.role}</span>
        </li>
      </ul>
      <p>
        이 사이트({SITE.koreanName})는 여러 주소 주장을 <strong>신호로 대조</strong>하는
        장부입니다. 접속·모바일·즐겨찾기 운영 노트는 검증 체크로, 카테고리·순위
        깊이 읽기는 이용 가이드로 넘깁니다.
      </p>
    </aside>
  );
}
