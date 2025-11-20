import { MBTIType, Phrase } from '../types';

export interface TranslationData {
  phrase: Phrase;
  mbti: MBTIType;
  male: string;
  female: string;
}

// 속마음 번역 데이터
export const translationData: TranslationData[] = [
  // "괜찮아"
  { phrase: '괜찮아', mbti: 'ISTJ', male: '괜찮지 않은데 굳이 말 안 하는 거임. 알아서 해결할게.', female: '괜찮다고 했는데 왜 자꾸 물어봐. 혼자 생각 좀 하고 싶어.' },
  { phrase: '괜찮아', mbti: 'ISFJ', male: '괜찮지 않지만 네가 걱정할까봐 괜찮은 척 하는 중...', female: '전혀 괜찮지 않은데 티 내면 분위기 안 좋아질 것 같아서 참는 중이야 ㅠㅠ' },
  { phrase: '괜찮아', mbti: 'INFJ', male: '괜찮지 않아. 근데 내 마음을 네가 이해 못할 것 같아서 말 안 하는 거야.', female: '속으로 엄청 상처받았는데 말해봤자 이해 못 할 것 같아서 그냥 괜찮다고 하는 거...' },
  { phrase: '괜찮아', mbti: 'INTJ', male: '괜찮지 않지만 감정 표현 귀찮아서 안 하는 거임.', female: '괜찮지 않은데 설명하기 귀찮아. 혼자 해결할게.' },
  { phrase: '괜찮아', mbti: 'ISTP', male: '진짜 괜찮음. 문제 생기면 알아서 처리할게.', female: '별로 안 괜찮은데 뭐 어쩔 수 없지. 나 혼자 해결함.' },
  { phrase: '괜찮아', mbti: 'ISFP', male: '괜찮지 않은데 말하면 분위기 망칠까봐 참는 중...', female: '완전 안 괜찮은데 ㅠㅠ 그냥 혼자 삭이는 게 나을 것 같아...' },
  { phrase: '괜찮아', mbti: 'INFP', male: '괜찮지 않아. 근데 내 감정 설명하기 너무 복잡해서 그냥 괜찮다고 하는 거야...', female: '속으로 완전 상처받았는데 말로 표현하면 오글거려서 그냥 괜찮다고 함 ㅠ' },
  { phrase: '괜찮아', mbti: 'INTP', male: '괜찮지 않지만 논리적으로 설명하기 귀찮아서 안 하는 거임.', female: '괜찮다는 게 아니고 감정 설명이 비효율적이라 생략한 거야.' },
  { phrase: '괜찮아', mbti: 'ESTP', male: '진짜 괜찮음. 큰일도 아니고 ㅋㅋ', female: '괜찮아~ 그런 거로 스트레스 안 받아 ㅎㅎ' },
  { phrase: '괜찮아', mbti: 'ESFP', male: '괜찮지 않은데 분위기 안 좋아질까봐 웃으면서 넘기는 중 ㅋㅋ', female: '안 괜찮은데 ㅠㅠ 티 내면 다들 걱정할까봐 밝은 척~' },
  { phrase: '괜찮아', mbti: 'ENFP', male: '괜찮지 않지만 네가 미안해할까봐 괜찮은 척! 근데 눈치 좀 채줘...', female: '완전 안 괜찮은데 ㅜㅜ 근데 티 내면 네가 부담스러워할 것 같아서...' },
  { phrase: '괜찮아', mbti: 'ENTP', male: '괜찮지 않지만 논쟁하기 귀찮아서 일단 넘어가는 거임.', female: '전혀 안 괜찮은데 지금 따지기 귀찮아서 나중에 할게 ㅎ' },
  { phrase: '괜찮아', mbti: 'ESTJ', male: '괜찮지 않지만 지적해봤자 안 고칠 것 같아서 그냥 넘어가는 거임.', female: '괜찮다고 했으니까 이제 이 주제 그만하고 다음 거 하자.' },
  { phrase: '괜찮아', mbti: 'ESFJ', male: '괜찮지 않은데 네 기분 상할까봐 괜찮다고 하는 거야...', female: '완전 안 괜찮은데 ㅠㅠ 네가 미안해할까봐 괜찮은 척!' },
  { phrase: '괜찮아', mbti: 'ENFJ', male: '괜찮지 않지만 네가 걱정할까봐, 그리고 관계가 나빠질까봐 괜찮다고 하는 거야.', female: '전혀 안 괜찮은데 ㅜㅜ 우리 사이 안 좋아질까봐 참는 중...' },
  { phrase: '괜찮아', mbti: 'ENTJ', male: '괜찮지 않지만 감정 얘기해봤자 시간 낭비라서 빨리 넘어가는 거임.', female: '괜찮지 않은데 이 얘기로 시간 쓰기 싫어서 그냥 넘어가는 거야.' },

  // "나 화 안 났어"
  { phrase: '나 화 안 났어', mbti: 'ISTJ', male: '완전 화났는데 표현 안 하는 거임. 네가 뭘 잘못했는지 생각해봐.', female: '엄청 화났어. 근데 감정적으로 말하기 싫어서 참는 중.' },
  { phrase: '나 화 안 났어', mbti: 'ISFJ', male: '화났지만 네가 미안해할까봐 안 났다고 하는 거야...', female: '완전 화났는데 ㅠㅠ 분위기 안 좋아질까봐 참고 있어...' },
  { phrase: '나 화 안 났어', mbti: 'INFJ', male: '엄청 화났어. 근데 말로 표현하면 관계 틀어질까봐 안 한다고 하는 거지.', female: '속으로 진짜 열받았는데 말해봤자 네가 이해 못 할 것 같아서 안 났다고 함...' },
  { phrase: '나 화 안 났어', mbti: 'INTJ', male: '화났는데 감정 표현할 가치가 없어서 안 한다고 하는 거임.', female: '진짜 화났지만 논리적으로 따지기 귀찮아서 그냥 넘어가는 거야.' },
  { phrase: '나 화 안 났어', mbti: 'ISTP', male: '화났는데 굳이 말 안 함. 알아서 정리할게.', female: '좀 짜증나긴 하는데 뭐 별로 안 중요함.' },
  { phrase: '나 화 안 났어', mbti: 'ISFP', male: '화났지만 티 내기 싫어서 안 났다고 하는 거야...', female: '완전 화났는데 ㅜㅜ 말하면 분위기 안 좋아질 것 같아서...' },
  { phrase: '나 화 안 났어', mbti: 'INFP', male: '엄청 화났어. 근데 내 감정 설명하면 유치해 보일까봐 안 했다고 하는 거지...', female: '속으로 완전 열받았는데 ㅠ 감정 표현하면 오글거려서 안 났다고 함...' },
  { phrase: '나 화 안 났어', mbti: 'INTP', male: '화났는데 왜 화났는지 논리적으로 설명하기 귀찮아서 안 했다고 함.', female: '화났지만 감정 분석해서 말하기 귀찮아. 알아서 파악해.' },
  { phrase: '나 화 안 났어', mbti: 'ESTP', male: '좀 짜증났는데 대충 넘어갈게 ㅋㅋ', female: '화났다가 금방 풀림 ㅎㅎ 별로 안 중요해~' },
  { phrase: '나 화 안 났어', mbti: 'ESFP', male: '화났지만 분위기 안 좋아지는 거 싫어서 안 났다고 함 ㅋㅋ', female: '좀 화났는데 ㅠㅠ 티 내면 다들 불편할까봐 괜찮은 척!' },
  { phrase: '나 화 안 났어', mbti: 'ENFP', male: '완전 화났는데 네가 미안해할까봐 안 났다고 하는 거야! 근데 눈치 좀 채줘...', female: '진짜 화났는데 ㅜㅜ 말하면 네가 상처받을까봐 안 났다고 함...' },
  { phrase: '나 화 안 났어', mbti: 'ENTP', male: '화났지만 논쟁하기 귀찮아서 일단 안 났다고 하는 거임.', female: '엄청 화났는데 지금 따지면 시끄러워서 나중에 복수할게 ㅎ' },
  { phrase: '나 화 안 났어', mbti: 'ESTJ', male: '완전 화났어. 근데 말해봤자 안 바뀔 것 같아서 그냥 넘어가는 거임.', female: '화났지만 지금 얘기하면 감정적이 될까봐 참는 중이야.' },
  { phrase: '나 화 안 났어', mbti: 'ESFJ', male: '화났는데 ㅠㅠ 네 기분 상할까봐 안 났다고 하는 거야...', female: '완전 화났는데 네가 미안해할까봐 괜찮은 척 하는 중 ㅜㅜ' },
  { phrase: '나 화 안 났어', mbti: 'ENFJ', male: '엄청 화났지만 관계 나빠질까봐, 그리고 네가 상처받을까봐 안 났다고 하는 거야.', female: '진짜 화났는데 ㅠㅠ 우리 사이 안 좋아질까봐 참고 있어...' },
  { phrase: '나 화 안 났어', mbti: 'ENTJ', male: '화났지만 감정적으로 따지기 싫어서 논리적으로 넘어가는 거임.', female: '완전 화났는데 이 얘기로 시간 낭비하기 싫어서 그냥 넘어감.' },
];

export function getTranslation(phrase: Phrase, mbti: MBTIType, gender: 'male' | 'female'): string {
  const data = translationData.find(d => d.phrase === phrase && d.mbti === mbti);
  return data ? data[gender] : '번역 데이터를 찾을 수 없습니다.';
}

export const availablePhrases: Phrase[] = [
  '괜찮아',
  '나 화 안 났어',
  '네 맘대로 해',
  '아무거나 좋아',
  '별로 안 바빠',
  '나중에 얘기하자',
  '알아서 해',
  '생각 좀 해볼게'
];
