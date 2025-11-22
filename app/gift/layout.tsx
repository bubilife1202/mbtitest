import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI별 선물 추천 | 칼같이 맞는 선물 가이드',
  description: 'MBTI별 최적의 선물 추천! ISFJ, ENTP, INTJ 등 16가지 유형이 진짜 좋아하는 선물. 절대 사주면 안 되는 WORST 선물도 공개!',
  keywords: 'MBTI, 선물 추천, MBTI 선물, 연인 선물, 생일 선물, 기념일 선물',
  openGraph: {
    title: 'MBTI별 선물 추천 | 100% 만족 보장',
    description: 'MBTI 유형별 완벽한 선물을 찾아보세요!',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI별 선물 추천',
    description: '칼같이 맞는 선물 가이드!',
  }
};

export default function GiftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
