import type { Metadata } from "next";
import { AREAS, DISTANCES } from "./areas";
import {
  breadcrumbSchema,
  jsonLd,
  pageMetadata,
  SITE,
} from "./site";

const homeTitle = "울산 룸싸롱 | 권역별 위치·가격대·귀가 안내";

export const metadata: Metadata = {
  ...pageMetadata({ title: homeTitle, description: SITE.description, path: "/" }),
  // layout 템플릿이 브랜드를 한 번 더 붙이지 않도록 절대 제목으로 둔다.
  title: { absolute: homeTitle },
};

const COMPARE = [
  { area: "삼산동·달동", fit: "선택지 폭·외지 접근", price: "가장 높음", parking: "어려움", night: "택시 배차 지연", reserve: "금·토 20시 이후 권장" },
  { area: "성남동", fit: "짧은 도보 동선·여유", price: "완만", parking: "보통", night: "택시 확보 어려움", reserve: "대체로 불필요" },
  { area: "무거동", fit: "예산 우선·소규모", price: "가장 낮음", parking: "여유", night: "막차 이름", reserve: "넷 이상이면 필요" },
  { area: "북구·동구", fit: "권역 안에서 해결", price: "완만", parking: "가장 수월", night: "배차 가장 김", reserve: "주말 여유" },
  { area: "울주군", fit: "차량·KTX 일정", price: "언양 시내 수준, 나머지 완만", parking: "가장 여유", night: "막차 이르고 배차 오래", reserve: "심야 영업 확인" },
] as const;

const COST_CHECKS = [
  {
    title: "표기 금액에 무엇이 들어가는지",
    body: "요금은 업종과 구역에 따라 편차가 큽니다. 표기 금액에 포함되는 항목과 추가 조건은 입장 전에 확인해두면 계산 시점의 분쟁이 없습니다. 기본 요금 외에 추가되는 항목이 있는지, 인원수에 따라 달라지는지를 입장 시점에 물어보면 나중에 다툴 일이 없습니다. 구두 확인이 애매하면 메뉴판이나 안내문을 확인하세요.",
  },
  {
    title: "구역 선택이 곧 예산 조절",
    body: "삼산동은 같은 구역 안에서도 가격 스펙트럼이 넓습니다. 백화점권 중심부는 울산에서 가장 높게 형성돼 있고, 달동 연결부와 공업탑 방면으로 갈수록 완만해집니다. 예산을 낮게 잡는다면 달동 쪽에서 시작하는 편이 낫고, 성남동은 단골 중심 운영이라 같은 조건이면 삼산동보다 완만한 경우가 많습니다. 무거동은 울산 권역 중 가장 낮게 형성돼 있습니다.",
  },
  {
    title: "시간을 앞당기는 것이 실질적인 절약",
    body: "중심부를 쓸 계획이라면 초저녁대에는 같은 곳이라도 조건이 다른 경우가 있고, 무엇보다 자정 이후 택시 할증과 대기 시간이라는 숨은 비용이 붙지 않습니다.",
  },
  {
    title: "귀가 비용까지 총액에 넣기",
    body: "삼산동에서 북구·동구·울주로 나가는 심야 택시 요금은 무시할 수 없는 수준이고, 대리운전을 부르는 경우도 마찬가지입니다. 처음부터 대중교통 막차 안에 끝내는 계획이면 이 비용이 통째로 빠집니다. 울주에 숙소를 잡고 시내를 이용하면 왕복 30~40분 이동이 붙어 심야 택시 비용이 숙박비 차액을 넘어설 수 있습니다.",
  },
  {
    title: "결제 수단",
    body: "대부분 카드가 가능하지만 소규모 업소 중 현금만 받는 곳이 있습니다. 삼산동은 편의점 ATM 접근이 쉬운 편이지만 골목 안쪽으로 들어가기 전에 확인해두면 편하고, 성남동은 오래된 가게 중 드물게 현금만 받는 곳이 있어 현금을 조금 준비해두면 곤란한 상황을 피할 수 있습니다.",
  },
];

const TIMING = [
  {
    title: "삼산동: 요일 편차가 가장 큰 곳",
    body: "평일 초저녁은 직장인 회식 수요가 중심이라 20시 전후에 자리가 차고 23시경 한 차례 빠집니다. 금요일과 토요일은 19시부터 유동이 들어와 21~24시에 정점을 찍고, 이 구간에는 삼산로 차량 정체와 도보 혼잡이 동시에 발생합니다. 주말에 예약 없이 움직이면 첫 후보에서 자리를 못 잡고 여러 곳을 도는 경우가 흔합니다.",
  },
  {
    title: "연말·휴가철·성과급 시기",
    body: "연말(12월)은 예약이 몰려 평소 기준으로 판단하면 안 되고, 여름 휴가철(7월 말~8월 초)은 오히려 유동이 줄어듭니다. 울산은 제조업 사업장이 많아 집단 휴가 기간에 도시 전체가 한산해지고, 반대로 임금협상 타결이나 성과급 지급 시기에는 평일에도 주말 수준의 혼잡이 나타날 수 있습니다.",
  },
  {
    title: "성남동: 편차는 작고 종료가 이름",
    body: "단골 비중이 높아 평일에도 일정한 유동이 유지되고 주말이라고 갑자기 몇 배가 되지는 않습니다. 다만 삼산동은 심야까지 운영하는 곳이 많은 반면 성남동은 문을 닫는 시각이 이른 편입니다. 태화강대공원 행사나 축제 기간에는 일시적으로 붐빕니다.",
  },
  {
    title: "무거동: 학사 일정이 전부",
    body: "학기 중(3~6월, 9~12월)과 방학(1~2월, 7~8월)의 차이가 울산 어느 권역보다 큽니다. 방학에는 상당수가 영업시간을 줄이거나 문을 닫아 확인 없이 갔다가 헛걸음하는 사례가 흔하고, 학기 초(3월, 9월)와 축제 기간에는 예약 없이는 자리 잡기 어려울 수 있습니다. 시험 기간에는 오히려 한산합니다.",
  },
  {
    title: "북구·동구: 교대 근무가 만드는 시간대",
    body: "제조업 사업장이 주야 교대로 돌아가기 때문에 주간 근무자가 퇴근하는 오후 시간대에 한 차례, 야간 근무 교대 전후로 또 한 차례 유동이 발생합니다. 시내가 붐비는 금·토 저녁에 이 권역은 상대적으로 여유가 있습니다. 집단 휴가나 명절 연휴에는 배후 인구가 빠져나가 일부는 아예 문을 닫습니다. 방어진은 여름 주말과 겨울 평일의 차이가 전하동보다 큽니다.",
  },
];

const RETURN_OPTIONS = [
  "권역 내에서 해결하고 걸어서 귀가하거나",
  "차량으로 움직이되 음주하지 않거나",
  "시내로 나갈 거면 막차 안에 끝내는 것",
];

const SAFETY = [
  "길에서 접근해 특정 업소로 안내하겠다는 제안은 응하지 않는 편이 안전합니다. 표기된 가격과 실제 청구가 다른 사례가 이 경로에서 주로 발생합니다.",
  "결제 전에 총액을 확인하는 습관이 중요합니다. 기본 요금 외에 추가되는 항목이 있는지, 인원수에 따라 달라지는지를 입장 시점에 물어보세요.",
  "일행과 떨어지지 않는 것도 실질적인 주의 사항입니다. 삼산동은 블록 구조가 비슷해 초행자가 방향을 잃기 쉽고, 주말 밤에는 통신이 원활하지 않은 경우도 있습니다. 만날 지점을 미리 정해두면 문제가 생기지 않습니다.",
  "음주 후 운전은 금물이고, 대리운전을 부르더라도 차를 어디에 세웠는지 정확히 기억해야 합니다. 삼산동 공영주차장은 여러 곳이라 위치를 착각하는 경우가 자주 있습니다.",
  "성남동 안쪽 골목은 격자형이 아니라 방향 감각이 흐려질 수 있습니다. 처음이라면 큰길을 기준으로 움직이는 편이 안전합니다.",
];

const POLICY = [
  "특정 업소를 1위·최고로 선정하지 않습니다.",
  "협찬·제휴를 정보 순서에 반영하지 않습니다.",
  "출처 없는 후기와 가상의 이용자 평점을 만들지 않습니다.",
  "예약 전화·메신저 연결을 중개하지 않습니다.",
  "불법 영업을 권하거나 정상 영업처럼 안내하지 않습니다.",
  "영업시간·가격처럼 자주 바뀌는 정보는 고정 사실처럼 보증하지 않습니다.",
];

const faqs = [
  {
    question: "울산 룸싸롱을 처음 찾는데 어느 권역부터 봐야 하나요?",
    answer:
      "삼산동입니다. 업종 다양성과 접근성이 울산에서 가장 높아 기준점으로 삼기 좋습니다. 여기서 분위기를 본 뒤 성남동이나 무거동 같은 다른 권역과 비교하는 순서를 권합니다.",
  },
  {
    question: "삼산동과 달동은 따로 봐야 하나요?",
    answer:
      "도보로 이어지는 연속 상권이라 사실상 한 권역으로 봐도 됩니다. 삼산동 쪽 대기가 길 때 달동으로 넘어가면 여유가 있는 경우가 있고 가격대도 한 단계 아래입니다.",
  },
  {
    question: "주말과 평일 차이가 큰가요?",
    answer:
      "삼산동은 큽니다. 주말 저녁은 삼산로 정체와 택시 대기가 동시에 걸립니다. 여유 있게 보시려면 평일이, 선택지를 넓게 보시려면 주말이 낫습니다. 성남동과 북구·동구는 편차가 작은 편입니다.",
  },
  {
    question: "예약 없이 가도 되나요?",
    answer:
      "삼산동은 평일 초저녁이면 대체로 괜찮지만 금·토 20시 이후는 미리 연락하는 편이 확실하고, 인원이 넷 이상이면 요일과 무관하게 예약을 권합니다. 성남동은 주말에도 대기가 짧은 편입니다.",
  },
  {
    question: "가격대는 권역별로 얼마나 다른가요?",
    answer:
      "삼산동 백화점권이 울산에서 가장 높고 달동·공업탑 방면으로 갈수록 완만해집니다. 성남동과 북구·동구는 완만한 편이고, 무거동이 가장 낮습니다. 울주는 언양이 시내와 비슷하고 나머지 읍은 완만합니다.",
  },
  {
    question: "결제 전에 무엇을 확인해야 하나요?",
    answer:
      "표기 금액에 포함되는 항목과 추가 조건, 인원수에 따른 변동 여부를 입장 시점에 확인하세요. 구두 확인이 애매하면 메뉴판이나 안내문을 보고, 소규모 업소는 현금만 받는 곳이 있으니 결제 수단도 미리 물어두면 편합니다.",
  },
  {
    question: "주차는 어디가 낫나요?",
    answer:
      "삼산동은 주말 저녁 노상 주차를 기대하지 않는 편이 낫고 공영주차장이나 백화점 주차장을 목적지로 찍고 출발하세요. 북구·동구와 울주는 주차가 가장 수월합니다. 음주 계획이 있다면 차를 두고 오는 쪽이 대리비까지 계산하면 저렴합니다.",
  },
  {
    question: "몇 시까지 하나요?",
    answer:
      "업종과 가게마다 다르지만 삼산동이 울산에서 심야까지 운영하는 곳이 가장 많고, 성남동은 종료가 이른 편입니다. 대중교통은 자정 전후로 끊기므로 늦게까지 있을 계획이면 택시나 숙박을 전제로 잡아야 합니다.",
  },
  {
    question: "북구·동구에 사는데 시내로 나가야 하나요?",
    answer:
      "대부분 그럴 필요가 없습니다. 걸어서 갈 수 있으면 귀가 문제가 사라지고, 이 권역 최대 약점인 심야 택시 배차 지연도 무력화됩니다. 인원이 많아 규모 있는 곳이 필요할 때만 시내를 고려하되, 그때는 숙박이나 대리운전을 전제로 계획하세요.",
  },
  {
    question: "KTX 울산역에서 시내까지 가까운가요?",
    answer:
      "가깝지 않습니다. 울산역은 울주군 삼남읍에 있어 삼산동까지 차량으로 30~40분 걸립니다. 도착 전에 역 주변에서 해결할지 시내로 갈지를 정하고, 막차 기준이면 최소 1시간 전에 시내를 출발하세요.",
  },
  {
    question: "이 사이트가 업소를 추천해 주나요?",
    answer:
      "아닙니다. 개별 업소 이름·순위·예약 연결은 다루지 않고, 권역과 이동·비용 구조만 정리합니다. 실제 방문 전에는 현장 안내와 공식 교통 정보를 다시 확인하세요.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE.url}/#webpage`,
      url: SITE.url,
      name: homeTitle,
      description: SITE.description,
      dateModified: SITE.reviewedAt,
      inLanguage: SITE.language,
      isPartOf: { "@id": `${SITE.url}/#website` },
      breadcrumb: { "@id": `${SITE.url}/#breadcrumb` },
      about: [
        { "@type": "Thing", name: "울산 룸싸롱" },
        { "@type": "Thing", name: "울산 유흥 권역" },
        { "@type": "Thing", name: "울산 심야 귀가" },
      ],
      mentions: AREAS.map((area) => ({ "@type": "Place", name: `울산 ${area.name}` })),
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE.url}/opengraph-image`,
      },
    },
    {
      ...breadcrumbSchema([{ name: "울산 룸싸롱 권역 안내", path: "/" }]),
      "@id": `${SITE.url}/#breadcrumb`,
    },
    {
      "@type": "ItemList",
      name: "울산 룸싸롱 권역 비교",
      itemListElement: AREAS.map((area, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: area.name,
        url: `${SITE.url}/#area-${area.id}`,
        description: area.summary,
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
              <span>AREA GUIDE</span>
              울산 5개 권역 비교 · {SITE.reviewedAt}
            </p>
            <h1>
              울산 룸싸롱,
              <br />
              <em>업소보다 권역</em>을 먼저 정합니다
            </h1>
            <p className="hero-lede">
              울산은 권역 사이 이동이 짧지 않아 어디서 출발하고 어디로 돌아가는지가
              선택을 좌우합니다. 삼산동·성남동·무거동·북구·동구·울주의 가격대,
              주차, 예약, 심야 귀가 변수와 결제 전 확인 항목을 한 페이지에
              정리했습니다. 개별 업소 이름과 순위는 다루지 않습니다.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#areas">
                권역 비교표
              </a>
              <a className="button button-accent" href="#cost">
                비용 확인 항목
              </a>
              <a className="button" href="#return">
                심야 귀가
              </a>
            </div>
          </div>

          <aside className="signal-console" aria-label="이 안내의 범위">
            <div className="console-top">
              <span>AREA DESK / {SITE.edition}</span>
              <span className="live-dot">REVIEWED</span>
            </div>
            <div className="console-status">
              <p>다루는 것</p>
              <strong>권역 · 가격대 · 주차 · 귀가</strong>
            </div>
            <dl className="console-grid">
              <div>
                <dt>권역</dt>
                <dd>{AREAS.length}개</dd>
              </div>
              <div>
                <dt>세부 구역</dt>
                <dd>{AREAS.reduce((sum, area) => sum + area.zones.length, 0)}곳</dd>
              </div>
              <div>
                <dt>편집 검토</dt>
                <dd>{SITE.reviewedAt}</dd>
              </div>
              <div>
                <dt>다루지 않는 것</dt>
                <dd>업소 순위 · 예약 중개</dd>
              </div>
            </dl>
            <p className="console-caption">
              영업시간·가격은 예고 없이 바뀝니다. 방문 전 현장 안내를 다시 확인하세요.
            </p>
          </aside>
        </div>
      </section>

      <section className="ticker" aria-label="안내 원칙">
        <div>
          <span>AREA BEFORE VENUE</span>
          <b>•</b>
          <span>CHECK THE TOTAL</span>
          <b>•</b>
          <span>PLAN THE WAY HOME</span>
          <b>•</b>
          <span>NO RANKING</span>
          <b>•</b>
          <span>AREA BEFORE VENUE</span>
          <b>•</b>
          <span>CHECK THE TOTAL</span>
          <b>•</b>
          <span>PLAN THE WAY HOME</span>
          <b>•</b>
          <span>NO RANKING</span>
        </div>
      </section>

      <section id="areas" className="section shell" aria-labelledby="areas-title">
        <div className="section-heading split-heading">
          <div>
            <p className="micro-label">FIVE AREAS</p>
            <h2 id="areas-title">울산 룸싸롱 권역 한눈에 비교</h2>
          </div>
          <p>
            “가장 유명한 곳”과 “내 일정에 맞는 곳”은 다릅니다. 아래 평가는 업소
            순위가 아니라 이동과 상권 구조를 기준으로 한 편집 판단입니다.
          </p>
        </div>
        <div className="table-wrap">
          <table>
            <caption className="sr-only">울산 5개 권역의 가격대·주차·심야 귀가·예약 비교</caption>
            <thead>
              <tr>
                <th scope="col">권역</th>
                <th scope="col">잘 맞는 일정</th>
                <th scope="col">가격대</th>
                <th scope="col">주차</th>
                <th scope="col">심야 귀가</th>
                <th scope="col">예약</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row.area}>
                  <th scope="row">{row.area}</th>
                  <td>{row.fit}</td>
                  <td>{row.price}</td>
                  <td>{row.parking}</td>
                  <td>{row.night}</td>
                  <td>{row.reserve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-footnote">
          표의 귀가 평가는 특정 시각의 배차 보장이 아니라 권역 간 거리와 대체 수단의 상대 비교입니다.
        </p>

        <div className="feature-grid">
          {AREAS.map((area) => (
            <article key={area.id} id={`area-${area.id}`} className="feature-card">
              <p className="micro-label">{area.gu}</p>
              <h3>{area.name}</h3>
              <p>{area.summary}</p>
              <dl className="console-grid">
                <div>
                  <dt>가격대</dt>
                  <dd>{area.price}</dd>
                </div>
                <div>
                  <dt>주차</dt>
                  <dd>{area.parking}</dd>
                </div>
                <div>
                  <dt>예약</dt>
                  <dd>{area.reservation}</dd>
                </div>
                <div>
                  <dt>심야 귀가</dt>
                  <dd>{area.nightReturn}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section id="zones" className="section section-ink" aria-labelledby="zones-title">
        <div className="shell">
          <div className="section-heading inverse-heading">
            <p className="micro-label">ZONES</p>
            <h2 id="zones-title">
              같은 권역 안에서도
              <br />
              구역에 따라 조건이 갈립니다.
            </h2>
          </div>
          {AREAS.map((area) => (
            <div key={area.id} className="zone-group">
              <h3>{area.name}</h3>
              <div className="desk-grid">
                {area.zones.map((zone) => (
                  <article key={zone.name} className="desk-card">
                    <span>{zone.character}</span>
                    <h4>{zone.name}</h4>
                    <p>{zone.note}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="cost" className="section shell" aria-labelledby="cost-title">
        <div className="section-heading split-heading">
          <div>
            <p className="micro-label">COST</p>
            <h2 id="cost-title">비용은 입장 전에, 귀가까지 넣어 계산합니다</h2>
          </div>
          <p>
            이 사이트는 요금을 숫자로 단정하지 않습니다. 대신 어떤 항목을 언제
            확인해야 계산 시점에 다툼이 없는지를 정리합니다.
          </p>
        </div>
        <ol className="numbered-list">
          {COST_CHECKS.map((item, index) => (
            <li key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="timing" className="section shell" aria-labelledby="timing-title">
        <div className="section-heading split-heading">
          <div>
            <p className="micro-label">WHEN</p>
            <h2 id="timing-title">요일과 시즌에 따라 같은 곳이 다른 곳이 됩니다</h2>
          </div>
          <p>
            울산은 산업도시라 회식·휴가·성과급 시기가 유동을 움직입니다. 권역마다
            그 패턴이 다릅니다.
          </p>
        </div>
        <div className="feature-grid">
          {TIMING.map((item) => (
            <article key={item.title} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="return" className="section section-ink" aria-labelledby="return-title">
        <div className="shell">
          <div className="section-heading inverse-heading">
            <p className="micro-label">WAY HOME</p>
            <h2 id="return-title">
              울산에서는 귀가 수단이
              <br />
              권역 선택보다 먼저입니다.
            </h2>
          </div>
          <div className="two-column-copy">
            <div className="prose">
              <p>
                울산 시내버스는 노선별로 자정 전후 끊깁니다. 삼산동은 울산 전역에서
                사람이 모였다가 사방으로 흩어지는 지점이라 자정 이후 택시 수요가
                집중되고, 외곽 방면일수록 배차가 길어집니다. 성남동은 심야 택시
                물량 자체가 삼산동에 몰려 있어 자정을 넘기면 호출이 잡히지 않아
                삼산동 방향으로 걸어 나오거나 한참 기다리는 상황이 생깁니다.
              </p>
              <p>
                북구·동구는 울산에서 심야 택시 배차가 가장 긴 곳입니다. 택시 기사
                입장에서 삼산동에서 동구나 북구로 나가는 운행은 돌아올 때 손님을
                태울 가능성이 낮은 거리라 자정 이후 이 방면 호출은 후순위로 밀리고,
                대기가 30분을 넘기는 경우가 생깁니다. 시내버스는 외곽 노선일수록
                막차가 이르기 때문에, 정작 이동 거리가 먼 사람이 먼저 발이 묶이는
                구조입니다.
              </p>
            </div>
            <div className="prose">
              <p>결론적으로 선택지는 셋입니다.</p>
              <ol className="plain-list">
                {RETURN_OPTIONS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <p>
                이 셋 중 하나를 정하지 않고 나서면 새벽에 발이 묶입니다. 삼산동
                일대 숙소를 잡으면 귀가 문제가 통째로 사라지고, KTX로 왔다면 역
                주변 삼남읍에서 해결하는 것이 시내 왕복 60~80분을 아끼는
                선택입니다.
              </p>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <caption className="sr-only">울산 권역 간 차량 이동 소요 시간</caption>
              <thead>
                <tr>
                  <th scope="col">구간</th>
                  <th scope="col">차량 소요</th>
                  <th scope="col">참고</th>
                </tr>
              </thead>
              <tbody>
                {DISTANCES.map((row) => (
                  <tr key={`${row.from}-${row.to}`}>
                    <th scope="row">{row.from} ↔ {row.to}</th>
                    <td>{row.time}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-footnote">
            심야에는 배차 대기가 더해져 위 값보다 길어질 수 있습니다. 실제 막차 시각은 공식 교통 정보에서 다시 확인하세요.
          </p>
        </div>
      </section>

      <section id="safety" className="section shell" aria-labelledby="safety-title">
        <div className="section-heading split-heading">
          <div>
            <p className="micro-label">SAFETY &amp; POLICY</p>
            <h2 id="safety-title">주의 사항과 이 안내의 원칙</h2>
          </div>
          <p>
            삼산동은 유동이 많은 만큼 호객 행위도 있는 구역입니다. 아래 다섯 가지만
            지켜도 표기 가격과 청구가 다른 상황은 대부분 피할 수 있습니다.
          </p>
        </div>
        <ol className="numbered-list">
          {SAFETY.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>{item}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="verdict-banner">
          <p>편집 원칙</p>
          <strong>추천·순위·중개 없음</strong>
          <span>검토 {SITE.reviewedAt}</span>
        </div>
        <ul className="plain-list policy-list">
          {POLICY.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="table-footnote">
          {SITE.owner}가 공개 자료와 편집 비교를 바탕으로 작성합니다. 현장 취재나 전수조사를 했다고 주장하지 않으며, 개별 업소의 현재 영업·가격·서비스 품질을 검증했다고 표시하지 않습니다. 내용 변경이 있을 때만 검토일을 갱신합니다.
        </p>
      </section>

      <section id="faq" className="section shell faq-section" aria-labelledby="faq-title">
        <div className="section-heading">
          <p className="micro-label">QUICK ANSWERS</p>
          <h2 id="faq-title">울산 룸싸롱 자주 묻는 질문</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
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
