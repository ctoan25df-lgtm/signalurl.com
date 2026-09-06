import Link from "next/link";
import { ROUTES, SITE } from "../site";

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
            <a key={route.href} href={route.href}>
              {route.label}
            </a>
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
            {SITE.owner}가 운영하는 독립 안내입니다. 특정 업소와 제휴·중개·예약 연결이
            없고, 업소 순위나 추천을 하지 않습니다. 영업시간·가격·주차 조건은 예고 없이
            바뀔 수 있으니 실제 방문 전에 현장 안내를 다시 확인하세요.
          </p>
        </div>
        <div>
          <p className="micro-label">LAST REVIEW</p>
          <p>{SITE.reviewedAt}</p>
          <a href="#safety">주의 사항·편집 원칙 보기 →</a>
        </div>
      </div>
    </footer>
  );
}
