import { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  // E/I 차원 (외향/내향)
  {
    question: '주말에 친구들이 놀자고 연락했을 때',
    answers: [
      { text: 'A. 좋아! 바로 나가고 싶다 😊', scores: { E: 1 } },
      { text: 'B. 집에서 쉬고 싶은데... 🏠', scores: { I: 1 } }
    ]
  },
  {
    question: '처음 만난 사람들과 있을 때',
    answers: [
      { text: 'A. 먼저 말 걸고 친해지려고 노력한다', scores: { E: 1 } },
      { text: 'B. 조용히 관찰하고 천천히 적응한다', scores: { I: 1 } }
    ]
  },

  // S/N 차원 (감각/직관)
  {
    question: '친구가 고민 상담을 할 때',
    answers: [
      { text: 'A. 구체적인 해결책을 제시한다 💡', scores: { S: 1 } },
      { text: 'B. 왜 그런지 근본 원인을 탐구한다 🤔', scores: { N: 1 } }
    ]
  },
  {
    question: '새로운 프로젝트를 시작할 때',
    answers: [
      { text: 'A. 현실적으로 할 수 있는 것부터 계획', scores: { S: 1 } },
      { text: 'B. 미래의 가능성과 비전을 먼저 생각', scores: { N: 1 } }
    ]
  },

  // T/F 차원 (사고/감정)
  {
    question: '친구가 실수로 약속을 잊었을 때',
    answers: [
      { text: 'A. 왜 잊었는지 이유를 묻는다', scores: { T: 1 } },
      { text: 'B. 괜찮다고 위로하며 이해한다', scores: { F: 1 } }
    ]
  },
  {
    question: '의사결정을 할 때 더 중요한 것은?',
    answers: [
      { text: 'A. 논리적으로 옳은지 ⚖️', scores: { T: 1 } },
      { text: 'B. 사람들의 감정과 관계 ❤️', scores: { F: 1 } }
    ]
  },

  // J/P 차원 (판단/인식)
  {
    question: '여행 계획을 세울 때',
    answers: [
      { text: 'A. 일정표를 미리 상세하게 짠다 📋', scores: { J: 1 } },
      { text: 'B. 대략 정하고 현지에서 즉흥적으로 ✈️', scores: { P: 1 } }
    ]
  },
  {
    question: '과제나 일을 할 때',
    answers: [
      { text: 'A. 마감 전에 미리미리 끝낸다', scores: { J: 1 } },
      { text: 'B. 마감 직전에 집중해서 한다', scores: { P: 1 } }
    ]
  }
];
