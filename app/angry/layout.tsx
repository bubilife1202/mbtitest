import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI별 화났을 때 대처법 | 연인 달래는 법 완벽 가이드',
  description: '연인이 화났을 때 MBTI별 맞춤 대처법! INFP, ISTJ, ENFP 등 16가지 유형별 달래는 말, 피해야 할 행동까지. 생존율 5% 위기 상황 탈출법!',
  keywords: 'MBTI, 화났을때, 연인 달래기, MBTI 대처법, 갈등 해결, 커플 싸움',
  openGraph: {
    title: 'MBTI별 화났을 때 대처법 | 5% 생존율 위기 탈출',
    description: '연인이 화났을 때 어떻게? MBTI별 맞춤 해결책!',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI별 화났을 때 대처법',
    description: '연인이 화났을 때 MBTI별 맞춤 대처법!',
  }
};

export default function AngryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
