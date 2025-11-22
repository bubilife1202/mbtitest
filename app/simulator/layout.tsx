import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI 갈등 시뮬레이터 | 실전 연애 대처법 훈련',
  description: 'MBTI별 갈등 상황 시뮬레이션! 실제 시나리오로 연습하는 연애 대처법. ISTJ, INFP, ENTP 등 상대방 유형별 최적의 선택지를 배우세요.',
  keywords: 'MBTI, 갈등 시뮬레이터, 연애 시뮬레이션, 커플 갈등, MBTI 대처법, 관계 훈련',
  openGraph: {
    title: 'MBTI 갈등 시뮬레이터 | 실전 연애 대처법',
    description: '실제 시나리오로 배우는 MBTI별 갈등 해결법!',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI 갈등 시뮬레이터',
    description: '실제 시나리오로 배우는 연애 대처법!',
  }
};

export default function SimulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
