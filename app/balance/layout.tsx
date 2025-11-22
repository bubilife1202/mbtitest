import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI 밸런스 게임 | 당신의 선택은?',
  description: 'MBTI별 선호도가 갈리는 밸런스 게임! A vs B 극한의 선택, 실시간 통계로 다른 사람들의 선택도 확인하세요.',
  keywords: 'MBTI, 밸런스 게임, 선택 게임, MBTI 테스트, A vs B',
  openGraph: {
    title: 'MBTI 밸런스 게임 | 극한의 선택',
    description: 'MBTI별 선호도가 갈리는 밸런스 게임!',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI 밸런스 게임',
    description: '당신의 선택은 A? B?',
  }
};

export default function BalanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
