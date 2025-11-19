import { MBTIType } from '../types';
export interface AngryData {
  mbti: MBTIType;
  male: { signal: string[]; why: string; solution: string; avoid: string; };
  female: { signal: string[]; why: string; solution: string; avoid: string; };
}
export const angryData: AngryData[] = [
  { mbti: 'ISTJ', male: { signal: ['말이 짧아짐', '표정이 굳어짐', '사무적으로 대함'], why: '약속이 지켜지지 않거나 비효율적인 상황', solution: '시간을 주고, 차분히 사과하며 개선 의지 보이기', avoid: '변명하거나 책임 회피하기' }, female: { signal: ['냉담해짐', '필요한 말만 함', '연락 빈도 줄어듦'], why: '신뢰가 깨지거나 계획이 틀어질 때', solution: '진심으로 사과하고 구체적인 해결책 제시', avoid: '감정적으로만 호소하기' } },
  { mbti: 'ISFJ', male: { signal: ['조용해짐', '상처받은 표정', '혼자 있으려 함'], why: '배려받지 못한다고 느낄 때', solution: '따뜻하게 위로하고 진심 전달하기', avoid: '무시하거나 대수롭지 않게 여기기' }, female: { signal: ['말이 없어짐', '눈물 참는 모습', '거리를 둠'], why: '자신의 노력이 인정받지 못할 때', solution: '감사함 표현하고 따뜻하게 대하기', avoid: '당연하게 여기거나 무관심하기' } },
  { mbti: 'INFJ', male: { signal: ['깊은 침묵', '실망한 눈빛', '마음의 문을 닫음'], why: '가치관이 무시되거나 진심이 통하지 않을 때', solution: '깊이 있는 대화로 이해하려는 노력 보이기', avoid: '피상적으로 넘어가려 하기' }, female: { signal: ['혼자만의 시간 요구', '표정이 어두워짐', '거리감 느껴짐'], why: '이상과 현실의 괴리, 이해받지 못한다는 느낌', solution: '진심으로 경청하고 공감하기', avoid: '논리로만 설득하려 하기' } },
  { mbti: 'INTJ', male: { signal: ['냉정해짐', '논리적으로 따짐', '거리를 둠'], why: '비효율적이거나 불합리한 상황', solution: '논리적으로 설명하고 개선 방안 제시', avoid: '감정적으로만 호소하기' }, female: { signal: ['무표정', '대화 단절', '혼자 문제 해결 시도'], why: '무능력하거나 계획이 방해받을 때', solution: '합리적인 대화와 해결책 모색', avoid: '감정에만 의존하기' } },
  { mbti: 'ISTP', male: { signal: ['혼자 있으려 함', '무뚝뚝해짐', '대답이 짧아짐'], why: '간섭받거나 자유가 제한될 때', solution: '공간 주고 시간이 지나면 자연스럽게 접근', avoid: '계속 쫓아다니며 설명 요구하기' }, female: { signal: ['회피함', '무관심한 척', '필요한 말만 함'], why: '귀찮게 하거나 통제하려 할 때', solution: '여유 주고 편하게 대하기', avoid: '감정적으로 따지기' } },
  { mbti: 'ISFP', male: { signal: ['조용히 상처받음', '표정이 어두워짐', '거리를 둠'], why: '강요당하거나 자유가 없다고 느낄 때', solution: '부드럽게 위로하고 자율성 존중하기', avoid: '강압적인 태도 보이기' }, female: { signal: ['눈물을 참음', '말이 없어짐', '혼자 있으려 함'], why: '감정이 무시되거나 강요받을 때', solution: '따뜻하게 공감하고 기다려주기', avoid: '다그치거나 재촉하기' } },
  { mbti: 'INFP', male: { signal: ['깊이 상처받음', '혼자만의 시간 가짐', '표현 안 함'], why: '가치관이 무시되거나 진심이 통하지 않을 때', solution: '진심으로 공감하고 이해하려 노력하기', avoid: '형식적으로 대하기' }, female: { signal: ['마음을 닫음', '조용해짐', '눈물 흘림'], why: '이상이 깨지거나 배신감을 느낄 때', solution: '깊은 대화와 진심어린 사과', avoid: '가볍게 넘기려 하기' } },
  { mbti: 'INTP', male: { signal: ['논리적으로 분석', '거리를 둠', '냉정해짐'], why: '비논리적이거나 일관성 없을 때', solution: '논리적으로 설명하고 이성적 대화', avoid: '감정에만 호소하기' }, female: { signal: ['무관심한 척', '분석적 태도', '대화 회피'], why: '억지나 비합리적인 요구', solution: '합리적인 대화로 풀기', avoid: '감정적으로만 대응하기' } },
  { mbti: 'ESTP', male: { signal: ['직설적으로 화냄', '바로 표현', '행동으로 보여줌'], why: '거짓말하거나 시간 낭비할 때', solution: '솔직하게 인정하고 빨리 해결', avoid: '변명하거나 회피하기' }, female: { signal: ['확실하게 티냄', '직접적 표현', '행동으로 화냄'], why: '지루하거나 속았다고 느낄 때', solution: '즉각 사과하고 재미있게 풀기', avoid: '변명만 늘어놓기' } },
  { mbti: 'ESFP', male: { signal: ['평소와 다르게 조용함', '에너지 다운', '표정 어두움'], why: '무시당하거나 재미없을 때', solution: '관심 주고 밝게 달래주기', avoid: '더 무겁게 만들기' }, female: { signal: ['삐짐', '표정으로 티내기', '말투 변함'], why: '소외감 느끼거나 심심할 때', solution: '재미있게 달래고 관심 표현', avoid: '진지하게만 대하기' } },
  { mbti: 'ENFP', male: { signal: ['갑자기 조용해짐', '에너지 없어짐', '표정 변화'], why: '제한받거나 이해받지 못할 때', solution: '진심으로 이해하고 자유 주기', avoid: '틀에 가두려 하기' }, female: { signal: ['삐지고 토라짐', '갑자기 차가워짐', '말 없어짐'], why: '무시당하거나 감정이 무시될 때', solution: '재미있으면서 진심있게 풀기', avoid: '대충 넘어가려 하기' } },
  { mbti: 'ENTP', male: { signal: ['논쟁 시작', '반박 많아짐', '비꼬는 말투'], why: '모순되거나 억지 부릴 때', solution: '논리적으로 인정하고 유머로 풀기', avoid: '감정적으로만 싸우기' }, female: { signal: ['말로 공격', '논리로 따지기', '비판적 태도'], why: '일관성 없거나 틀렸을 때', solution: '인정하고 재치있게 대응', avoid: '방어만 하기' } },
  { mbti: 'ESTJ', male: { signal: ['직설적 지적', '화난 표정', '단호한 태도'], why: '규칙 안 지키거나 무책임할 때', solution: '명확히 인정하고 빨리 개선', avoid: '변명하거나 책임 회피' }, female: { signal: ['확실히 화냄', '직접적 표현', '냉정해짐'], why: '약속 안 지키거나 비효율적일 때', solution: '즉각 사과하고 해결책 제시', avoid: '두루뭉술하게 대응' } },
  { mbti: 'ESFJ', male: { signal: ['서운함 표현', '거리두기', '말투 변화'], why: '배려 없거나 무시당할 때', solution: '따뜻하게 사과하고 관심 표현', avoid: '무관심하거나 쿨한 척' }, female: { signal: ['주변에 말함', '서운함 티냄', '냉담해짐'], why: '신경 안 써주거나 무례할 때', solution: '정성스럽게 사과하고 챙기기', avoid: '대충 넘기기' } },
  { mbti: 'ENFJ', male: { signal: ['실망한 표정', '진지해짐', '대화 요구'], why: '관계가 소홀해지거나 무시될 때', solution: '진심으로 대화하고 관계 회복 노력', avoid: '피상적으로 대하기' }, female: { signal: ['깊은 실망감', '표정 어두움', '거리감'], why: '배신감 느끼거나 기대 저버릴 때', solution: '깊이 있는 대화와 진심 전달', avoid: '가볍게 넘어가기' } },
  { mbti: 'ENTJ', male: { signal: ['냉정한 분석', '차갑게 대함', '단호한 태도'], why: '무능력하거나 목표 방해할 때', solution: '명확히 개선하고 효율적으로 해결', avoid: '감정에만 호소하기' }, female: { signal: ['차가워짐', '직설적 비판', '거리두기'], why: '비효율적이거나 발전 없을 때', solution: '확실한 개선안과 실행', avoid: '우물쭈물 변명하기' } }
];
export function getAngryData(mbti: MBTIType): AngryData | undefined {
  return angryData.find(data => data.mbti === mbti);
}
