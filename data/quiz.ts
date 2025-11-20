import { MBTIType } from '../types';

export interface QuizQuestion {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  correctAnswer: 'A' | 'B';
  mbtiType: 'EI' | 'SN' | 'TF' | 'JP';
  timeLimit: number; // 초
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: '친구가 고민 상담을 하면?',
    optionA: '해결책을 제시한다',
    optionB: '공감하며 들어준다',
    correctAnswer: 'A',
    mbtiType: 'TF',
    timeLimit: 10
  },
  {
    id: 2,
    question: '주말 계획은?',
    optionA: '집에서 쉰다',
    optionB: '친구들 만난다',
    correctAnswer: 'A',
    mbtiType: 'EI',
    timeLimit: 10
  },
  {
    id: 3,
    question: '여행 스타일은?',
    optionA: '계획 필수!',
    optionB: '즉흥적으로~',
    correctAnswer: 'A',
    mbtiType: 'JP',
    timeLimit: 10
  },
  {
    id: 4,
    question: '새 프로젝트를 보면?',
    optionA: '현실적으로 가능한지 따진다',
    optionB: '가능성과 비전을 본다',
    correctAnswer: 'B',
    mbtiType: 'SN',
    timeLimit: 10
  },
  {
    id: 5,
    question: '논쟁이 생기면?',
    optionA: '옳고 그름을 따진다',
    optionB: '관계가 상할까 걱정된다',
    correctAnswer: 'A',
    mbtiType: 'TF',
    timeLimit: 10
  },
  {
    id: 6,
    question: '모임에 가면?',
    optionA: '먼저 말 걸기보다 기다린다',
    optionB: '먼저 말 걸고 분위기 만든다',
    correctAnswer: 'B',
    mbtiType: 'EI',
    timeLimit: 10
  },
];

export interface QuizResult {
  score: number;
  rank: string;
  message: string;
  percentage: number; // 상위 몇 %
}

export function calculateQuizResult(correctCount: number, totalTime: number): QuizResult {
  const score = correctCount;
  const totalQuestions = quizQuestions.length;
  const accuracy = (correctCount / totalQuestions) * 100;

  let rank = '';
  let message = '';
  let percentage = 0;

  if (score === totalQuestions && totalTime < 30) {
    rank = '🏆 MBTI 마스터';
    message = '완벽해요! 당신은 MBTI 전문가!';
    percentage = 1;
  } else if (score >= totalQuestions * 0.8) {
    rank = '🥇 눈치력 갑';
    message = '대부분 맞췄어요! 눈치가 빠르시네요!';
    percentage = 5;
  } else if (score >= totalQuestions * 0.6) {
    rank = '🥈 평범한 관찰자';
    message = '절반 이상 맞췄어요! 나쁘지 않아요!';
    percentage = 20;
  } else if (score >= totalQuestions * 0.4) {
    rank = '🥉 초보 관찰자';
    message = '조금 더 공부가 필요해요!';
    percentage = 50;
  } else {
    rank = '😅 MBTI 새싹';
    message = 'MBTI에 대해 더 알아보세요!';
    percentage = 80;
  }

  return { score, rank, message, percentage };
}
