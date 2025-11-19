import { MBTIType } from '../types';

export interface BalanceQuestion {
  id: number;
  optionA: string;
  optionB: string;
  scoreA: { I?: number; E?: number; S?: number; N?: number; T?: number; F?: number; J?: number; P?: number; };
  scoreB: { I?: number; E?: number; S?: number; N?: number; T?: number; F?: number; J?: number; P?: number; };
}

export const balanceQuestions: BalanceQuestion[] = [
  { id: 1, optionA: '친구가 고민 상담을 할 때\n구체적인 해결책을 제시한다', optionB: '친구가 고민 상담을 할 때\n공감하며 들어준다', scoreA: { T: 1 }, scoreB: { F: 1 } },
  { id: 2, optionA: '주말에\n집에서 혼자 쉰다', optionB: '주말에\n친구들과 만나서 논다', scoreA: { I: 1 }, scoreB: { E: 1 } },
  { id: 3, optionA: '여행 갈 때\n세세한 계획을 짠다', optionB: '여행 갈 때\n즉흥적으로 다닌다', scoreA: { J: 1 }, scoreB: { P: 1 } },
  { id: 4, optionA: '새로운 프로젝트를 시작할 때\n현실적으로 가능한지 따진다', optionB: '새로운 프로젝트를 시작할 때\n가능성과 비전을 본다', scoreA: { S: 1 }, scoreB: { N: 1 } },
  { id: 5, optionA: '논쟁할 때\n옳고 그름을 따진다', optionB: '논쟁할 때\n관계가 상할까 걱정된다', scoreA: { T: 1 }, scoreB: { F: 1 } },
  { id: 6, optionA: '모임에서\n먼저 말을 걸기보다 기다린다', optionB: '모임에서\n먼저 말을 걸고 분위기를 만든다', scoreA: { I: 1 }, scoreB: { E: 1 } },
  { id: 7, optionA: '약속 시간은\n정확하게 지켜야 한다', optionB: '약속 시간은\n여유있게 생각한다', scoreA: { J: 1 }, scoreB: { P: 1 } },
  { id: 8, optionA: '영화를 볼 때\n현실적인 스토리가 좋다', optionB: '영화를 볼 때\n판타지나 SF가 좋다', scoreA: { S: 1 }, scoreB: { N: 1 } },
  { id: 9, optionA: '결정할 때\n머리로 생각한다', optionB: '결정할 때\n마음이 시키는 대로 한다', scoreA: { T: 1 }, scoreB: { F: 1 } },
  { id: 10, optionA: '에너지 충전은\n혼자만의 시간이 필요하다', optionB: '에너지 충전은\n사람들과 어울려야 한다', scoreA: { I: 1 }, scoreB: { E: 1 } },
  { id: 11, optionA: '일할 때\n마감 전에 미리미리 한다', optionB: '일할 때\n마감 직전에 몰아서 한다', scoreA: { J: 1 }, scoreB: { P: 1 } },
  { id: 12, optionA: '대화할 때\n구체적인 사실을 말한다', optionB: '대화할 때\n큰 그림과 의미를 말한다', scoreA: { S: 1 }, scoreB: { N: 1 } },
  { id: 13, optionA: '비판할 때\n솔직하게 말하는 게 맞다', optionB: '비판할 때\n상대 기분을 먼저 생각한다', scoreA: { T: 1 }, scoreB: { F: 1 } },
  { id: 14, optionA: '사람 만난 후\n에너지가 소진된다', optionB: '사람 만난 후\n에너지가 충전된다', scoreA: { I: 1 }, scoreB: { E: 1 } },
  { id: 15, optionA: '하루 일과를\n미리 계획하고 실행한다', optionB: '하루 일과를\n그때그때 상황에 맞춰 한다', scoreA: { J: 1 }, scoreB: { P: 1 } },
  { id: 16, optionA: '배울 때\n실용적이고 응용 가능한 것', optionB: '배울 때\n이론적이고 개념적인 것', scoreA: { S: 1 }, scoreB: { N: 1 } },
  { id: 17, optionA: '갈등 상황에서\n논리적으로 해결한다', optionB: '갈등 상황에서\n감정을 먼저 달랜다', scoreA: { T: 1 }, scoreB: { F: 1 } },
  { id: 18, optionA: '파티에서\n조용히 소수와 깊은 대화', optionB: '파티에서\n여러 사람과 두루 어울림', scoreA: { I: 1 }, scoreB: { E: 1 } },
  { id: 19, optionA: '물건을 살 때\n미리 조사하고 계획적으로', optionB: '물건을 살 때\n보고 마음에 들면 바로', scoreA: { J: 1 }, scoreB: { P: 1 } },
  { id: 20, optionA: '설명할 때\n단계별로 자세하게', optionB: '설명할 때\n전체적인 흐름으로', scoreA: { S: 1 }, scoreB: { N: 1 } }
];

export interface MBTIResult {
  mbti: MBTIType;
  title: string;
  description: string;
  traits: string[];
}

export const mbtiResults: MBTIResult[] = [
  { mbti: 'ISTJ', title: '세상 제일 믿음직한 현실주의자', description: '계획적이고 책임감 있는 당신! 약속과 원칙을 중요하게 생각하며, 현실적이고 체계적으로 일을 처리합니다.', traits: ['철저한 계획가', '책임감 MAX', '현실적 사고', '원칙주의자'] },
  { mbti: 'ISFJ', title: '따뜻한 마음의 수호자', description: '헌신적이고 배려심 많은 당신! 다른 사람을 돌보는 것을 좋아하며, 조용하지만 강한 책임감을 가지고 있습니다.', traits: ['배려왕', '헌신적', '세심함', '안정 추구'] },
  { mbti: 'INFJ', title: '신비로운 이상주의자', description: '깊이 있고 통찰력 있는 당신! 이상을 추구하며, 사람들의 진심을 꿰뚫어보는 능력이 있습니다.', traits: ['통찰력 갑', '이상주의자', '깊은 공감', '신비로움'] },
  { mbti: 'INTJ', title: '독립적인 전략가', description: '논리적이고 독창적인 당신! 장기적인 비전을 가지고 효율적으로 목표를 달성하는 전략가입니다.', traits: ['전략적 사고', '독립적', '효율 추구', '완벽주의'] },
  { mbti: 'ISTP', title: '쿨한 만능 해결사', description: '실용적이고 분석적인 당신! 문제 해결 능력이 뛰어나며, 자유롭고 유연한 사고를 합니다.', traits: ['문제 해결사', '실용주의', '쿨함', '손재주 좋음'] },
  { mbti: 'ISFP', title: '자유로운 예술가', description: '감성적이고 유연한 당신! 아름다움을 추구하며, 자신만의 독특한 감성을 표현합니다.', traits: ['감성 충만', '예술적', '자유로움', '온화함'] },
  { mbti: 'INFP', title: '열정적인 중재자', description: '이상주의적이고 창의적인 당신! 깊은 가치관을 가지고 있으며, 진정성을 중요하게 생각합니다.', traits: ['이상주의', '창의적', '진정성', '감수성 풍부'] },
  { mbti: 'INTP', title: '논리적인 사색가', description: '분석적이고 독창적인 당신! 논리와 지식을 탐구하며, 복잡한 문제를 해결하는 것을 즐깁니다.', traits: ['논리왕', '지적 호기심', '독창적', '분석가'] },
  { mbti: 'ESTP', title: '대담한 모험가', description: '활동적이고 현실적인 당신! 순발력이 뛰어나며, 새로운 경험을 즐기는 행동파입니다.', traits: ['행동파', '순발력 갑', '사교적', '현실주의'] },
  { mbti: 'ESFP', title: '자유로운 연예인', description: '사교적이고 즐거운 당신! 분위기 메이커이며, 현재를 즐기고 사람들과 함께하는 것을 좋아합니다.', traits: ['분위기 메이커', '사교적', '즐거움 추구', '즉흥적'] },
  { mbti: 'ENFP', title: '열정 넘치는 활동가', description: '열정적이고 창의적인 당신! 새로운 가능성을 탐구하며, 사람들에게 영감을 주는 에너지를 가지고 있습니다.', traits: ['열정 MAX', '창의적', '사교적', '긍정적'] },
  { mbti: 'ENTP', title: '똑똑한 논쟁가', description: '재치있고 도전적인 당신! 새로운 아이디어를 즐기며, 논리적인 토론을 통해 성장합니다.', traits: ['논쟁 즐김', '재치있음', '창의적', '도전적'] },
  { mbti: 'ESTJ', title: '효율적인 관리자', description: '체계적이고 실용적인 당신! 조직을 잘 운영하며, 명확한 규칙과 질서를 중요시합니다.', traits: ['리더십', '체계적', '실용적', '책임감'] },
  { mbti: 'ESFJ', title: '사교적인 외교관', description: '친절하고 협조적인 당신! 사람들과의 조화를 중요시하며, 배려심이 넘칩니다.', traits: ['친화력 갑', '배려심', '사교적', '협력적'] },
  { mbti: 'ENFJ', title: '카리스마 넘치는 리더', description: '공감능력이 뛰어난 당신! 사람들에게 영감을 주며, 함께 성장하는 것을 추구합니다.', traits: ['카리스마', '공감능력', '리더십', '열정적'] },
  { mbti: 'ENTJ', title: '대담한 지휘관', description: '결단력 있고 전략적인 당신! 목표 지향적이며, 효율적으로 조직을 이끄는 타고난 리더입니다.', traits: ['리더십 갑', '전략적', '결단력', '효율 추구'] }
];

export function calculateMBTI(scores: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number }): MBTIType {
  const e_i = scores.E > scores.I ? 'E' : 'I';
  const s_n = scores.S > scores.N ? 'S' : 'N';
  const t_f = scores.T > scores.F ? 'T' : 'F';
  const j_p = scores.J > scores.P ? 'J' : 'P';

  return `${e_i}${s_n}${t_f}${j_p}` as MBTIType;
}

export function getMBTIResult(mbti: MBTIType): MBTIResult | undefined {
  return mbtiResults.find(result => result.mbti === mbti);
}
