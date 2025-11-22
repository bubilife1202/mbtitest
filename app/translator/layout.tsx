import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI 속마음 번역기 | "괜찮아"의 진짜 의미는?',
  description: '연인이 "괜찮아"라고 할 때 진짜 의미는? MBTI별 숨겨진 속마음을 AI가 번역! ISFJ, ENFP, INTJ 등 16가지 유형별 진짜 마음 해독.',
  keywords: 'MBTI, 속마음 번역, 괜찮아 의미, MBTI 해석, 연애 심리, 진짜 마음',
  openGraph: {
    title: 'MBTI 속마음 번역기 | "괜찮아"의 숨겨진 의미',
    description: 'MBTI별 속마음을 AI가 번역해드립니다!',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI 속마음 번역기',
    description: '"괜찮아"의 진짜 의미를 파헤칩니다!',
  }
};

export default function TranslatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
