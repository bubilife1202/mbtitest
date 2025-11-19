import { MBTIType } from '../types';
export interface ApologyData {
  mbti: MBTIType;
  male: { signal: string; want: string; avoid: string; example: string; };
  female: { signal: string; want: string; avoid: string; example: string; };
}
export const apologyData: ApologyData[] = [
  { mbti: 'ISTJ', male: { signal: '말이 줄어들고 사무적으로 변함', want: '정확한 사과와 개선 계획 제시', avoid: '변명하거나 핑계대기', example: '"내가 ○○한 부분이 잘못됐어. 다음부터는 ○○하게 할게"' }, female: { signal: '연락이 뜸해지고 냉담해짐', want: '진심어린 사과와 구체적인 해결책', avoid: '두루뭉실한 사과', example: '"미안해. 정말 내 실수야. 앞으로는 ○○할게"' } },
  { mbti: 'ISFJ', male: { signal: '상처받은 티를 내지 않으려 하지만 표정이 어두움', want: '따뜻하고 진심어린 사과', avoid: '형식적인 사과', example: '"정말 미안해. 네 마음 많이 상했지? 다시는 그러지 않을게"' }, female: { signal: '평소보다 조용해지고 거리를 둠', want: '마음을 담은 사과와 시간', avoid: '급하게 해결하려고 하기', example: '"내가 너무 상처 줬구나. 정말 미안해. 천천히 풀어가자"' } },
  { mbti: 'INFJ', male: { signal: '실망한 표정, 깊은 침묵', want: '진심과 이유를 이해하려는 노력', avoid: '피상적인 사과', example: '"내가 왜 그랬는지 설명할게. 정말 미안하고, 너의 마음을 이해하려고 노력할게"' }, female: { signal: '마음의 문을 닫고 거리를 둠', want: '깊은 대화와 진심어린 사과', avoid: '가볍게 넘어가려는 시도', example: '"이야기 좀 하자. 내가 많이 상처줬지? 정말 미안해"' } },
  { mbti: 'INTJ', male: { signal: '논리적으로 따지기 시작하고 냉정해짐', want: '논리적인 설명과 개선 의지', avoid: '감정에만 호소하기', example: '"내 판단이 잘못됐어. 다음부터는 이렇게 개선하겠어"' }, female: { signal: '무표정해지고 거리를 둠', want: '합리적인 사과와 재발 방지 약속', avoid: '과도한 감정 표현', example: '"미안해. 이런 점이 문제였고, 앞으로는 ○○하겠어"' } },
  { mbti: 'ISTP', male: { signal: '혼자만의 시간을 가지려 함', want: '간단명료한 사과 후 시간 주기', avoid: '장황한 설명', example: '"미안. 내가 잘못했어" (간단하게)' }, female: { signal: '무뚝뚝해지고 대화를 회피', want: '직접적인 사과와 공간', avoid: '계속 쫓아다니며 사과', example: '"잘못했어. 시간 좀 줘"' } },
  { mbti: 'ISFP', male: { signal: '조용히 상처받은 모습', want: '부드러운 사과와 스킨십', avoid: '강압적인 태도', example: '"정말 미안해. 내가 많이 상처줬지?" (손 잡으며)' }, female: { signal: '눈물을 참거나 슬퍼보임', want: '따뜻한 위로와 진심', avoid: '무시하거나 대충 넘어가기', example: '"내가 잘못했어. 마음 많이 아프지?" (안아주며)' } },
  { mbti: 'INFP', male: { signal: '깊이 상처받고 혼자 있으려 함', want: '진심어린 사과와 이해', avoid: '형식적인 사과', example: '"정말 미안해. 네 마음을 충분히 이해해. 나도 많이 반성했어"' }, female: { signal: '마음의 상처가 깊고 표현을 잘 안 함', want: '깊은 공감과 진심', avoid: '가볍게 넘기려는 시도', example: '"너의 마음이 얼마나 아팠을지 알아. 정말 미안해. 용서해줄 수 있어?"' } },
  { mbti: 'INTP', male: { signal: '논리적으로 분석하며 거리를 둠', want: '논리적인 사과와 설명', avoid: '감정적으로만 호소', example: '"내 행동이 ○○한 점에서 문제였어. 미안해"' }, female: { signal: '이성적으로 대하며 감정을 숨김', want: '합리적인 해명과 사과', avoid: '과장된 감정 표현', example: '"이 부분이 잘못됐다는 걸 알아. 미안해"' } },
  { mbti: 'ESTP', male: { signal: '화가 나면 직설적으로 표현', want: '솔직한 인정과 빠른 해결', avoid: '변명하거나 책임 회피', example: '"내 잘못이야. 미안. 어떻게 하면 될까?"' }, female: { signal: '직설적으로 불만 표출', want: '즉각적인 사과와 행동', avoid: '말만 하고 행동 없기', example: '"미안해. 바로 ○○할게"' } },
  { mbti: 'ESFP', male: { signal: '평소와 달리 조용하고 풀이 죽음', want: '밝은 분위기로 달래주기', avoid: '무겁게 만들기', example: '"미안해! 내가 맛있는 거 사줄게. 화풀어줘~"' }, female: { signal: '티를 팍팍 내며 삐짐', want: '재미있게 달래주기', avoid: '진지하게만 사과', example: '"미안해~ 삐졌어? 오늘 네가 하고 싶은 거 다 해줄게!"' } },
  { mbti: 'ENFP', male: { signal: '평소와 다르게 조용하고 에너지 다운', want: '진심어린 사과와 재미있게 풀기', avoid: '무겁고 진지하기만 한 분위기', example: '"정말 미안해. 내가 ○○로 보상할게! 다시 웃어줘?"' }, female: { signal: '삐지고 토라짐, 표정이 확 바뀜', want: '재미있으면서도 진심인 사과', avoid: '대충 넘어가려는 태도', example: '"미안해! 내가 정말 잘못했어. 어떻게 하면 용서해줄래?"' } },
  { mbti: 'ENTP', male: { signal: '논쟁을 걸거나 말이 많아짐', want: '논리적인 사과와 유머', avoid: '감정적으로만 대응', example: '"내 논리가 틀렸네. 인정할게. 미안"' }, female: { signal: '말로 공격하거나 따지기 시작', want: '인정하고 재치있게 사과', avoid: '방어적인 태도', example: '"내가 졌다. 네 말이 맞아. 미안해"' } },
  { mbti: 'ESTJ', male: { signal: '직설적으로 문제점 지적', want: '명확한 사과와 해결책', avoid: '두루뭉술하게 사과', example: '"내가 ○○를 잘못했어. 미안. 다음부터는 ○○하겠어"' }, female: { signal: '확실하게 화났다는 것을 표현', want: '정확하고 빠른 사과', avoid: '변명하기', example: '"잘못했어. 미안해. 바로 고칠게"' } },
  { mbti: 'ESFJ', male: { signal: '서운함을 표현하며 거리를 둠', want: '따뜻하고 정성스러운 사과', avoid: '쿨한 척 하기', example: '"정말 미안해. 많이 서운했지? 다시는 안 그럴게"' }, female: { signal: '주변에 말하며 서운함 표출', want: '정성스러운 사과와 관심', avoid: '대충 사과하기', example: '"미안해. 내가 정말 신경 못 썼구나. 앞으로 잘할게"' } },
  { mbti: 'ENFJ', male: { signal: '실망한 표정, 관계에 대한 걱정', want: '진심어린 대화와 사과', avoid: '피상적인 사과', example: '"우리 관계가 소중해. 내가 잘못했어. 이야기 좀 하자"' }, female: { signal: '깊은 실망감 표현', want: '깊이 있는 대화와 진심', avoid: '가볍게 넘어가기', example: '"정말 실망했어. 우리 진지하게 얘기 좀 해야 할 것 같아"' } },
  { mbti: 'ENTJ', male: { signal: '냉정하게 문제점 분석', want: '효율적이고 명확한 사과', avoid: '감정적으로만 호소', example: '"내 판단 미스야. 미안. 이렇게 개선하겠어"' }, female: { signal: '차갑고 단호해짐', want: '명확한 사과와 개선안', avoid: '우물쭈물하기', example: '"잘못했어. 다음부터는 ○○하겠어. 확실히"' } }
];
export function getApologyData(mbti: MBTIType): ApologyData | undefined {
  return apologyData.find(data => data.mbti === mbti);
}
