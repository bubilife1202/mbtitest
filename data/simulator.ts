import { MBTIType } from '../types';

export interface SimulatorScenario {
  id: number;
  situation: string;
  optionA: {
    text: string;
    isGood: boolean;
    response: string;
    emotionChange: number; // +1 좋아짐, 0 변화없음, -1 나빠짐
  };
  optionB: {
    text: string;
    isGood: boolean;
    response: string;
    emotionChange: number;
  };
}

export interface MBTIScenarios {
  mbti: MBTIType;
  scenarios: SimulatorScenario[];
}

export const simulatorData: MBTIScenarios[] = [
  {
    mbti: 'ISTJ',
    scenarios: [
      {
        id: 1,
        situation: '약속 시간에 30분 늦었어요. ISTJ가 차갑게 대하고 있어요.',
        optionA: {
          text: '진심으로 사과하고 다음부턴 꼭 지키겠다고 약속한다',
          isGood: true,
          response: '알았어. 다음엔 꼭 지켜. (조금 풀림)',
          emotionChange: 1
        },
        optionB: {
          text: '교통이 막혀서 어쩔 수 없었다고 변명한다',
          isGood: false,
          response: '그럼 미리 출발하지 그랬어? (더 화남)',
          emotionChange: -1
        }
      },
      {
        id: 2,
        situation: 'ISTJ가 계획한 일정을 당신이 갑자기 바꿨어요.',
        optionA: {
          text: '미안하다며 다음엔 미리 상의하겠다고 한다',
          isGood: true,
          response: '응, 그래줘. 계획 틀어지면 불편하거든. (이해함)',
          emotionChange: 1
        },
        optionB: {
          text: '좀 융통성 있게 살자고 말한다',
          isGood: false,
          response: '...말이 안 통하네. (완전 차단 모드)',
          emotionChange: -1
        }
      },
      {
        id: 3,
        situation: 'ISTJ가 당신의 비효율적인 행동에 대해 지적했어요.',
        optionA: {
          text: '고맙다며 다음엔 그렇게 하겠다고 한다',
          isGood: true,
          response: '응. 이렇게 하는 게 더 나아. (만족)',
          emotionChange: 1
        },
        optionB: {
          text: '그냥 내 방식대로 할게라고 말한다',
          isGood: false,
          response: '알아서 해. (관심 꺼짐)',
          emotionChange: -1
        }
      }
    ]
  },
  {
    mbti: 'INFP',
    scenarios: [
      {
        id: 1,
        situation: 'INFP가 당신에게 속마음을 털어놨는데 당신이 무심하게 넘겼어요.',
        optionA: {
          text: '진심으로 공감하며 이야기를 들어준다',
          isGood: true,
          response: '고마워... 네가 들어줘서 위로가 돼. (마음 열림)',
          emotionChange: 1
        },
        optionB: {
          text: '논리적으로 해결책을 제시한다',
          isGood: false,
          response: '...내 마음을 몰라주네. (상처받음)',
          emotionChange: -1
        }
      },
      {
        id: 2,
        situation: 'INFP가 조용히 있어요. 뭔가 기분이 안 좋아 보여요.',
        optionA: {
          text: '부드럽게 괜찮냐고 물어보며 안아준다',
          isGood: true,
          response: '...고마워. 네가 있어줘서 좋아. (위로받음)',
          emotionChange: 1
        },
        optionB: {
          text: '뭐가 문제냐고 따지듯 물어본다',
          isGood: false,
          response: '...아무것도 아니야. (더 마음 닫음)',
          emotionChange: -1
        }
      },
      {
        id: 3,
        situation: 'INFP가 꿈이나 이상에 대해 얘기하는데 당신이 반응이 없었어요.',
        optionA: {
          text: '진심으로 응원하고 함께 상상해본다',
          isGood: true,
          response: '정말? 너무 좋다... 같이 이루자! (행복해함)',
          emotionChange: 1
        },
        optionB: {
          text: '현실적으로 불가능하다고 말한다',
          isGood: false,
          response: '...그렇구나. (실망하고 거리를 둠)',
          emotionChange: -1
        }
      }
    ]
  },
  {
    mbti: 'ENTP',
    scenarios: [
      {
        id: 1,
        situation: 'ENTP가 논쟁을 걸었는데 당신이 감정적으로 반응했어요.',
        optionA: {
          text: '논리적으로 반박하며 재치있게 대응한다',
          isGood: true,
          response: 'ㅋㅋㅋ 오 괜찮은데? 재밌네! (흥미로워함)',
          emotionChange: 1
        },
        optionB: {
          text: '왜 꼭 따지냐며 화를 낸다',
          isGood: false,
          response: '아 재미없네. 말이 안 통하잖아. (흥미 잃음)',
          emotionChange: -1
        }
      },
      {
        id: 2,
        situation: 'ENTP가 당신의 모순을 지적했어요.',
        optionA: {
          text: '인정하고 다음엔 더 신중하게 생각하겠다고 한다',
          isGood: true,
          response: '오케이~ 이제 알았지? ㅎㅎ (만족)',
          emotionChange: 1
        },
        optionB: {
          text: '억지 부리지 말라며 방어적으로 반응한다',
          isGood: false,
          response: '아 진짜 고집 세네 ㅋㅋ (짜증남)',
          emotionChange: -1
        }
      },
      {
        id: 3,
        situation: 'ENTP가 새로운 아이디어를 제안했는데 당신이 반응이 시큰둥해요.',
        optionA: {
          text: '함께 발전시키며 더 재미있는 방향을 제시한다',
          isGood: true,
          response: '오 대박! 그거 좋은데?! (신남)',
          emotionChange: 1
        },
        optionB: {
          text: '현실성 없다며 무시한다',
          isGood: false,
          response: '아 재미없는 사람이네... (시들해짐)',
          emotionChange: -1
        }
      }
    ]
  },
  {
    mbti: 'ESFJ',
    scenarios: [
      {
        id: 1,
        situation: 'ESFJ가 당신을 위해 준비한 걸 당신이 별로 신경 안 쓰는 것 같아요.',
        optionA: {
          text: '진심으로 감사하며 얼마나 고마운지 표현한다',
          isGood: true,
          response: '정말? 너무 좋다! 네가 좋아해줘서 기뻐! (행복해함)',
          emotionChange: 1
        },
        optionB: {
          text: '고맙긴 한데 별로 내 스타일은 아니라고 한다',
          isGood: false,
          response: '...그래. (상처받고 서운해함)',
          emotionChange: -1
        }
      },
      {
        id: 2,
        situation: 'ESFJ가 친구들과의 모임에 당신도 오라고 했는데 거절했어요.',
        optionA: {
          text: '미안하다며 다음엔 꼭 가겠다고 약속한다',
          isGood: true,
          response: '그래! 다음엔 꼭 와~ (이해함)',
          emotionChange: 1
        },
        optionB: {
          text: '왜 매번 다 같이 다녀야 하냐고 말한다',
          isGood: false,
          response: '...나는 너랑 친구들이랑 어울리는 게 좋은데. (섭섭함)',
          emotionChange: -1
        }
      },
      {
        id: 3,
        situation: 'ESFJ가 당신에게 관심과 챙김을 주는데 당신이 쿨하게 대했어요.',
        optionA: {
          text: '고맙다며 당신도 상대를 챙긴다',
          isGood: true,
          response: '우리 서로 챙기자~ 좋아! (만족)',
          emotionChange: 1
        },
        optionB: {
          text: '혼자 있고 싶다고 거리를 둔다',
          isGood: false,
          response: '...내가 너무 오버했나? (불안해하고 서운함)',
          emotionChange: -1
        }
      }
    ]
  }
];

export function getScenarios(mbti: MBTIType): SimulatorScenario[] {
  const data = simulatorData.find(d => d.mbti === mbti);
  if (data) return data.scenarios;

  // 기본 시나리오 (MBTI 데이터 없을 때)
  return [
    {
      id: 1,
      situation: '상대방이 당신의 행동에 불만을 표현했어요.',
      optionA: {
        text: '진심으로 사과하고 개선하겠다고 한다',
        isGood: true,
        response: '알았어. 고마워. (조금 풀림)',
        emotionChange: 1
      },
      optionB: {
        text: '변명하거나 상대방을 탓한다',
        isGood: false,
        response: '...대화가 안 되네. (더 화남)',
        emotionChange: -1
      }
    }
  ];
}

export interface SimulatorEnding {
  type: 'good' | 'neutral' | 'bad';
  title: string;
  message: string;
  badge?: string;
}

export function getEnding(emotionScore: number): SimulatorEnding {
  if (emotionScore >= 2) {
    return {
      type: 'good',
      title: '💕 관계 회복 성공!',
      message: '잘 대처해서 관계가 더 좋아졌어요! 서로를 이해하는 멋진 커플이에요!'
    };
  } else if (emotionScore >= 0) {
    return {
      type: 'neutral',
      title: '😐 애매한 상태...',
      message: '관계가 나빠지진 않았지만 좋아지지도 않았어요. 더 노력이 필요해요!'
    };
  } else if (emotionScore >= -2) {
    return {
      type: 'bad',
      title: '👻 잠수 엔딩',
      message: '상대방이 연락을 안 받기 시작했어요. 관계 회복이 어려워 보여요...',
      badge: '👻 잠수 엔딩'
    };
  } else if (emotionScore >= -4) {
    return {
      type: 'bad',
      title: '💔 이별 통보 엔딩',
      message: '"우리 그만 만나자." 상대방이 이별을 통보했어요...',
      badge: '💔 이별 통보 엔딩'
    };
  } else {
    return {
      type: 'bad',
      title: '🚫 차단 엔딩',
      message: '모든 연락처가 차단되었습니다. 관계가 완전히 끝났어요...',
      badge: '🚫 차단 엔딩'
    };
  }
}
