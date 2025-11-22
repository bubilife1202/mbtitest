import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI 궁합 테스트 | 우리 커플 궁합은?',
  description: 'MBTI별 연애 궁합 분석! 우리 둘의 궁합은 천생연분? 환장의 조합? 16x16 조합의 모든 궁합과 관계 키워드 공개!',
  keywords: 'MBTI, 궁합, 연애 궁합, MBTI 궁합, 커플 테스트, 관계 분석',
  openGraph: {
    title: 'MBTI 궁합 테스트 | 우리 커플 운명은?',
    description: 'MBTI별 완벽한 궁합 분석!',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI 궁합 테스트',
    description: '우리 둘의 궁합을 확인하세요!',
  }
};

export default function CompatibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
