export type MBTIType =
  | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ'
  | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
  | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP'
  | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

export type Gender = '남자' | '여자';

export type RelationType = '연인' | '동료' | '친구' | '가족';

export type Phrase =
  | '괜찮아'
  | '나 화 안 났어'
  | '네 맘대로 해'
  | '아무거나 좋아'
  | '별로 안 바빠'
  | '나중에 얘기하자'
  | '알아서 해'
  | '생각 좀 해볼게';

export interface PhraseData {
  meaning: string;
  solution: {
    do: string[];
    dont: string[];
  };
}

export interface GiftData {
  recommended: string[];
  avoid: string[];
}

export interface DateCourse {
  title: string;
  steps: string[];
}

export interface DateData {
  courses: DateCourse[];
  tips: {
    do: string[];
    dont: string[];
  };
}

export interface QuizQuestion {
  question: string;
  answers: {
    text: string;
    scores: Partial<Record<string, number>>;
  }[];
}

export interface SimulatorStage {
  situation: string;
  choices: {
    text: string;
    reaction: {
      emotion: string;
      text: string;
      analysis: string;
      score: number;
    };
  }[];
}

export interface CompatibilityResult {
  score: number;
  grade: string;
  rating: number;
  description: string;
  pros: string[];
  cons: string[];
  tips: string[];
}
