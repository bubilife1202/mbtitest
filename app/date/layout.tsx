import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI별 데이트 코스 추천 | 100% 성공 플랜',
  description: 'MBTI별 완벽한 데이트 코스! ISTJ, ENFP, INFP 등 16가지 유형에 맞는 데이트 장소 추천. 가면 싸우는 WORST 코스도 공개!',
  keywords: 'MBTI, 데이트 코스, 데이트 추천, MBTI 데이트, 연애 장소, 커플 데이트',
  openGraph: {
    title: 'MBTI별 데이트 코스 추천 | 100% 성공 보장',
    description: 'MBTI 유형별 완벽한 데이트 코스를 찾아보세요!',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI별 데이트 코스 추천',
    description: '100% 성공하는 데이트 플랜!',
  }
};

export default function DateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
