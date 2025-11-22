import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI 1분 퀴즈 | 연애 IQ 테스트',
  description: '단 1분만에 끝나는 MBTI 연애 IQ 테스트! 시간 제한 안에 정답을 맞춰보세요. 랭킹 시스템으로 친구들과 실력 겨루기!',
  keywords: 'MBTI, 퀴즈, 연애 테스트, IQ 테스트, 타임 어택, MBTI 문제',
  openGraph: {
    title: 'MBTI 1분 퀴즈 | 당신의 연애 IQ는?',
    description: '시간 제한 안에 MBTI 문제를 풀어보세요!',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI 1분 퀴즈',
    description: '연애 IQ 테스트 도전!',
  }
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
