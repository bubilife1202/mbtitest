import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI별 사과하는 법 | 완벽한 사과 가이드',
  description: 'MBTI별 맞춤 사과법! ISTJ, INFP, ENFJ 등 16가지 유형별로 효과적인 사과 방법과 절대 하면 안 되는 실수까지 완벽 정리.',
  keywords: 'MBTI, 사과하는 법, 화해 방법, MBTI 사과, 연애 갈등, 관계 회복',
  openGraph: {
    title: 'MBTI별 사과하는 법 | 화해 성공률 UP',
    description: 'MBTI 유형별 완벽한 사과법을 배우세요!',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI별 사과하는 법',
    description: '유형별 맞춤 사과 가이드!',
  }
};

export default function ApologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
