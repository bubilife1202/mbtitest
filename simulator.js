// 갈등 상황 시뮬레이터 데이터
const simulatorScenarios = {
    "late": {
        title: "⏰ 데이트 약속에 30분 늦었어요",
        emoji: "😰",
        description: "연인과의 약속 시간에 30분이나 늦게 도착했습니다. 상대방이 기다리고 있습니다.",
        stages: [
            {
                stageNum: 1,
                situation: "약속 장소에 도착하니 상대방이 의자에 앉아 핸드폰을 보고 있습니다.",
                choices: [
                    {
                        id: "a1",
                        text: "A. \"미안! 길이 막혀서...\" (즉시 사과 + 변명)",
                        points: 1,
                        reaction: {
                            ISTJ: { emotion: "😐", text: "\"다음부턴 일찍 출발해.\"", analysis: "논리적 해결책을 원함" },
                            ISFJ: { emotion: "😊", text: "\"괜찮아, 무사히 와서 다행이야.\"", analysis: "배려심 많고 이해심 많음" },
                            INFJ: { emotion: "🤔", text: "\"왜 미리 연락 안 했어?\"", analysis: "속마음을 더 알고 싶어함" },
                            INTJ: { emotion: "😑", text: "\"다음엔 교통 상황 확인하고.\"", analysis: "효율성을 중시함" },
                            ISTP: { emotion: "😶", text: "\"어, 왔네. 가자.\"", analysis: "별로 신경 안 씀" },
                            ISFP: { emotion: "😔", text: "\"...괜찮아. (속으론 서운함)\"", analysis: "감정을 숨기는 타입" },
                            INFP: { emotion: "💭", text: "\"나한테 관심이 없나봐...\"", analysis: "깊게 생각하고 상처받음" },
                            INTP: { emotion: "🤷", text: "\"그럴 수 있지.\"", analysis: "논리적으로 이해함" },
                            ESTP: { emotion: "😄", text: "\"ㅋㅋ 괜찮아~ 빨리 가자!\"", analysis: "낙천적이고 쿨함" },
                            ESFP: { emotion: "😊", text: "\"왔으니 됐어! 재밌게 놀자!\"", analysis: "현재에 집중함" },
                            ENFP: { emotion: "😆", text: "\"너 왔네! 나 심심했잖아~\"", analysis: "긍정적으로 받아들임" },
                            ENTP: { emotion: "😏", text: "\"30분? 내 최고 기록은 1시간인데?\"", analysis: "유머로 넘김" },
                            ESTJ: { emotion: "😠", text: "\"30분이나 늦었는데 변명부터야?\"", analysis: "시간 약속 중요시" },
                            ESFJ: { emotion: "😢", text: "\"많이 기다렸어... 배고파...\"", analysis: "감정 솔직하게 표현" },
                            ENFJ: { emotion: "😌", text: "\"괜찮아, 힘들었지? 이제 가자~\"", analysis: "상대 배려하며 넘김" },
                            ENTJ: { emotion: "😤", text: "\"다음엔 30분 일찍 출발해.\"", analysis: "명확한 해결책 제시" }
                        }
                    },
                    {
                        id: "a2",
                        text: "B. \"정말 미안해... 기다렸지?\" (진심 사과 + 공감)",
                        points: 3,
                        reaction: {
                            ISTJ: { emotion: "😌", text: "\"어, 이제 왔으니 가자.\"", analysis: "진심 사과에 마음 풀림" },
                            ISFJ: { emotion: "🥰", text: "\"미안해하지 마, 네가 무사해서 다행이야.\"", analysis: "사과를 고맙게 받아들임" },
                            INFJ: { emotion: "😊", text: "\"네 마음 알아. 이제 가자.\"", analysis: "진심을 알아챔" },
                            INTJ: { emotion: "😐", text: "\"알았어, 다음엔 미리 말해줘.\"", analysis: "사과는 받지만 개선 요청" },
                            ISTP: { emotion: "😊", text: "\"ㅇㅇ 가자.\"", analysis: "쿨하게 넘김" },
                            ISFP: { emotion: "☺️", text: "\"괜찮아~ 나도 좀 늦었어.\"", analysis: "배려심 발동" },
                            INFP: { emotion: "🥺", text: "\"진심으로 미안해하는구나... 괜찮아.\"", analysis: "진심에 감동" },
                            INTP: { emotion: "🙂", text: "\"응, 이제 가자.\"", analysis: "합리적으로 수용" },
                            ESTP: { emotion: "😎", text: "\"ㅋㅋ 괜춘~ 우리 놀러 가자!\"", analysis: "빠르게 전환" },
                            ESFP: { emotion: "🤗", text: "\"어머 괜찮아~ 이제 재밌게 놀면 돼!\"", analysis: "긍정적 마인드" },
                            ENFP: { emotion: "😘", text: "\"에이~ 괜찮아! 보고 싶었어!\"", analysis: "사랑이 넘침" },
                            ENTP: { emotion: "😄", text: "\"오케이~ 빨리 가서 맛있는 거 먹자!\"", analysis: "다음 행동에 집중" },
                            ESTJ: { emotion: "😐", text: "\"진심이라면 다음엔 조심해.\"", analysis: "진심 사과 인정" },
                            ESFJ: { emotion: "😊", text: "\"알았어, 사과 받았어~ 이제 가자!\"", analysis: "사과에 만족" },
                            ENFJ: { emotion: "🥰", text: "\"진심이 느껴져. 괜찮아~\"", analysis: "감정 읽고 이해" },
                            ENTJ: { emotion: "😌", text: "\"좋아, 이제 시간 낭비 말고 가자.\"", analysis: "효율적으로 마무리" }
                        }
                    },
                    {
                        id: "a3",
                        text: "C. \"너도 이제 왔어?\" (상황 회피)",
                        points: -2,
                        reaction: {
                            ISTJ: { emotion: "😠", text: "\"나 30분 전부터 있었는데?\"", analysis: "거짓말에 화남" },
                            ISFJ: { emotion: "😔", text: "\"아니... 난 정각에 왔어...\"", analysis: "상처받고 서운함" },
                            INFJ: { emotion: "😤", text: "\"뭐? 나 여기 30분 째 있었는데?\"", analysis: "진실 왜곡에 실망" },
                            INTJ: { emotion: "😑", text: "\"거짓말하지 마. 내가 먼저 왔어.\"", analysis: "논리적으로 반박" },
                            ISTP: { emotion: "😐", text: "\"...뭐야, 그냥 가자.\"", analysis: "귀찮아함" },
                            ISFP: { emotion: "🥺", text: "\"...난 일찍 왔는데...\"", analysis: "마음 다침" },
                            INFP: { emotion: "💔", text: "\"나한테 왜 이래... 서운해...\"", analysis: "깊은 상처" },
                            INTP: { emotion: "🤨", text: "\"아니, 내가 확실히 먼저 왔는데?\"", analysis: "사실 확인" },
                            ESTP: { emotion: "😒", text: "\"야, 나 30분 전에 왔다고!\"", analysis: "직설적 반응" },
                            ESFP: { emotion: "😠", text: "\"에이~ 나 먼저 왔는데 왜 그래!\"", analysis: "감정 즉각 표현" },
                            ENFP: { emotion: "😕", text: "\"어? 나 먼저 왔는데... 왜 그래?\"", analysis: "의아해함" },
                            ENTP: { emotion: "🤔", text: "\"어? 내가 착각한 건가? 아니야, 내가 먼저야.\"", analysis: "논리적 반박" },
                            ESTJ: { emotion: "😡", text: "\"무슨 소리야? 나 30분 전부터 있었어!\"", analysis: "강력히 항의" },
                            ESFJ: { emotion: "😢", text: "\"나 오래 기다렸는데... 왜 그렇게 말해...\"", analysis: "서운함 표현" },
                            ENFJ: { emotion: "😞", text: "\"그런 식으로 나오면 나 속상해...\"", analysis: "감정 솔직히 전달" },
                            ENTJ: { emotion: "😠", text: "\"책임 회피하지 마. 인정해.\"", analysis: "명확한 지적" }
                        }
                    }
                ]
            },
            {
                stageNum: 2,
                situation: "상대방의 반응을 듣고 나서, 데이트를 시작합니다. 분위기가 약간 어색합니다.",
                choices: [
                    {
                        id: "b1",
                        text: "A. \"오늘 맛있는 거 사줄게!\" (보상 제시)",
                        points: 2,
                        reaction: {
                            ISTJ: { emotion: "😊", text: "\"그럼 여기 가자.\"", analysis: "실질적 보상 좋아함" },
                            ISFJ: { emotion: "☺️", text: "\"그럴 필요 없는데... 고마워!\"", analysis: "마음이 따뜻해짐" },
                            INFJ: { emotion: "😌", text: "\"네 마음이 중요한 거야.\"", analysis: "진심을 알아봄" },
                            INTJ: { emotion: "🙂", text: "\"좋아, 그럼 여기 가자.\"", analysis: "효율적 해결 수용" },
                            ISTP: { emotion: "😎", text: "\"오 좋은데?\"", analysis: "쿨하게 받아들임" },
                            ISFP: { emotion: "🥰", text: "\"헤헤, 좋아~\"", analysis: "순수하게 좋아함" },
                            INFP: { emotion: "😊", text: "\"마음만으로도 고마워~\"", analysis: "마음이 풀림" },
                            INTP: { emotion: "🙂", text: "\"응, 괜찮아.\"", analysis: "합리적 보상" },
                            ESTP: { emotion: "🤩", text: "\"오케이! 고기 먹으러 가자!\"", analysis: "즉각 행동" },
                            ESFP: { emotion: "😍", text: "\"와~ 좋아좋아! 뭐 먹을까?\"", analysis: "신나함" },
                            ENFP: { emotion: "🥳", text: "\"우와~ 완전 좋아! 어디 갈까?\"", analysis: "기대감 상승" },
                            ENTP: { emotion: "😏", text: "\"그래야지~ 당연하지!\"", analysis: "유쾌하게 수용" },
                            ESTJ: { emotion: "😌", text: "\"좋아, 그럼 약속한 거다.\"", analysis: "약속 확정" },
                            ESFJ: { emotion: "😊", text: "\"오~ 좋아! 기분 풀렸어!\"", analysis: "기분 전환" },
                            ENFJ: { emotion: "🥰", text: "\"그런 마음이 고마워~\"", analysis: "감동" },
                            ENTJ: { emotion: "😎", text: "\"오케이, 갑시다.\"", analysis: "효과적 해결" }
                        }
                    },
                    {
                        id: "b2",
                        text: "B. 아무 말 없이 손 잡기 (행동으로 표현)",
                        points: 3,
                        reaction: {
                            ISTJ: { emotion: "😳", text: "\"...응.\" (손 꽉 잡음)", analysis: "조용히 화해" },
                            ISFJ: { emotion: "🥰", text: "\"(미소)\" 손을 꽉 잡음", analysis: "사랑 느낌" },
                            INFJ: { emotion: "😊", text: "\"(빙그레 웃음)\" 손가락 끼움", analysis: "비언어 소통 좋아함" },
                            INTJ: { emotion: "😌", text: "\"...가자.\" (손 잡고 걸음)", analysis: "행동으로 수용" },
                            ISTP: { emotion: "😊", text: "\"(조용히 미소)\"", analysis: "말보다 행동 선호" },
                            ISFP: { emotion: "☺️", text: "\"(수줍게 웃음)\" 손 꽉 잡음", analysis: "로맨틱함에 감동" },
                            INFP: { emotion: "🥺", text: "\"(눈물 그렁)\" 손 꽉 잡음", analysis: "감성 자극" },
                            INTP: { emotion: "😊", text: "\"...응.\"", analysis: "편안함" },
                            ESTP: { emotion: "😎", text: "\"ㅋㅋ 귀엽네~\" 손 잡고 걸음", analysis: "자연스러움" },
                            ESFP: { emotion: "🤗", text: "\"우리 화해! 가자~\"", analysis: "신체 접촉 좋아함" },
                            ENFP: { emotion: "😍", text: "\"헤헤~ 로맨틱해~\"", analysis: "분위기 좋아함" },
                            ENTP: { emotion: "😏", text: "\"오~ 작전 좋은데?\"", analysis: "유머로 받아들임" },
                            ESTJ: { emotion: "😊", text: "\"좋아, 가자.\"", analysis: "행동 인정" },
                            ESFJ: { emotion: "🥰", text: "\"어머~ 완전 좋아!\"", analysis: "스킨십 좋아함" },
                            ENFJ: { emotion: "😘", text: "\"이런 거 좋아~ 사랑해!\"", analysis: "로맨틱 표현 환영" },
                            ENTJ: { emotion: "🙂", text: "\"좋아. 출발.\"", analysis: "효율적 화해" }
                        }
                    },
                    {
                        id: "b3",
                        text: "C. \"왜 기분 나빠해?\" (상대 탓)",
                        points: -3,
                        reaction: {
                            ISTJ: { emotion: "😡", text: "\"네가 늦어놓고 그게 무슨 소리야?\"", analysis: "논리적 반박" },
                            ISFJ: { emotion: "😢", text: "\"네가 늦었잖아... 내가 왜...\"", analysis: "억울함" },
                            INFJ: { emotion: "💢", text: "\"진짜 이해가 안 되네.\"", analysis: "공감 능력 의심" },
                            INTJ: { emotion: "😑", text: "\"논리가 없네. 대화 안 해.\"", analysis: "대화 거부" },
                            ISTP: { emotion: "😒", text: "\"...그냥 집 갈래.\"", analysis: "관계 정리 생각" },
                            ISFP: { emotion: "😭", text: "\"나만 나쁜 사람 만들어...\"", analysis: "깊은 상처" },
                            INFP: { emotion: "💔", text: "\"너무해... 나 집 갈래...\"", analysis: "이별 고민" },
                            INTP: { emotion: "🤨", text: "\"인과관계가 이상한데?\"", analysis: "논리 오류 지적" },
                            ESTP: { emotion: "😠", text: "\"야, 네가 늦었는데 뭔 소리야!\"", analysis: "직접적 반박" },
                            ESFP: { emotion: "😤", text: "\"나 진짜 화났어! 집 갈래!\"", analysis: "감정 폭발" },
                            ENFP: { emotion: "😞", text: "\"왜 이렇게 나와... 서운해...\"", analysis: "실망" },
                            ENTP: { emotion: "😏", text: "\"논리적으로 이상한데? 네가 늦었잖아.\"", analysis: "논리로 반박" },
                            ESTJ: { emotion: "😡", text: "\"네가 먼저 잘못했는데 뭔 소리야!\"", analysis: "강력 항의" },
                            ESFJ: { emotion: "😭", text: "\"나만 나쁜 사람이야? 너무해...\"", analysis: "감정 상함" },
                            ENFJ: { emotion: "😔", text: "\"이렇게 나오면 나 너무 속상해...\"", analysis: "관계 걱정" },
                            ENTJ: { emotion: "😤", text: "\"책임 전가하지 마. 집 가.\"", analysis: "관계 종료 고려" }
                        }
                    }
                ]
            },
            {
                stageNum: 3,
                situation: "데이트를 마치고 헤어지기 전, 마지막 한마디를 합니다.",
                choices: [
                    {
                        id: "c1",
                        text: "A. \"오늘 미안했어. 다음엔 일찍 올게!\"",
                        points: 3,
                        reaction: {
                            ISTJ: { emotion: "😊", text: "\"응, 그래. 조심히 들어가.\"", analysis: "만족스러운 마무리" },
                            ISFJ: { emotion: "🥰", text: "\"괜찮아~ 조심히 가!\"", analysis: "따뜻한 마무리" },
                            INFJ: { emotion: "😌", text: "\"알았어, 오늘 좋았어!\"", analysis: "좋은 기억 남음" },
                            INTJ: { emotion: "🙂", text: "\"그래, 다음엔 그렇게 해.\"", analysis: "합리적 마무리" },
                            ISTP: { emotion: "😎", text: "\"ㅇㅇ 들어가~\"", analysis: "쿨한 마무리" },
                            ISFP: { emotion: "☺️", text: "\"응응~ 안녕!\"", analysis: "행복한 마무리" },
                            INFP: { emotion: "🥰", text: "\"오늘 행복했어~ 안녕!\"", analysis: "감동적 마무리" },
                            INTP: { emotion: "😊", text: "\"응, 들어가.\"", analysis: "편안한 마무리" },
                            ESTP: { emotion: "😄", text: "\"ㅇㅋㅇㅋ! 또 보자!\"", analysis: "가벼운 마무리" },
                            ESFP: { emotion: "🤗", text: "\"완전 재밌었어! 빠이~\"", analysis: "즐거운 마무리" },
                            ENFP: { emotion: "😘", text: "\"오늘 최고였어! 사랑해!\"", analysis: "애정 넘치는 마무리" },
                            ENTP: { emotion: "😎", text: "\"굿! 다음엔 내가 늦을게~\"", analysis: "유머러스한 마무리" },
                            ESTJ: { emotion: "😌", text: "\"좋아, 약속 지켜.\"", analysis: "확실한 마무리" },
                            ESFJ: { emotion: "😊", text: "\"오늘 좋았어! 또 보자~\"", analysis: "긍정적 마무리" },
                            ENFJ: { emotion: "🥰", text: "\"오늘 행복했어~ 사랑해!\"", analysis: "사랑 가득 마무리" },
                            ENTJ: { emotion: "😎", text: "\"오케이, 다음에 보자.\"", analysis: "효율적 마무리" }
                        }
                    },
                    {
                        id: "c2",
                        text: "B. \"사랑해~ 오늘 고마워!\"",
                        points: 2,
                        reaction: {
                            ISTJ: { emotion: "😳", text: "\"...응, 나도.\"", analysis: "쑥스러워함" },
                            ISFJ: { emotion: "🥰", text: "\"나도 사랑해~ 조심히!\"", analysis: "행복해함" },
                            INFJ: { emotion: "😍", text: "\"나도 사랑해! 꿈 꿔~\"", analysis: "감동" },
                            INTJ: { emotion: "😌", text: "\"...응. 들어가.\"", analysis: "감정 표현 서툴지만 좋아함" },
                            ISTP: { emotion: "😊", text: "\"ㅇㅇ 나도~\"", analysis: "간단히 화답" },
                            ISFP: { emotion: "☺️", text: "\"나도 사랑해~\"", analysis: "따뜻한 화답" },
                            INFP: { emotion: "🥺", text: "\"나도 너무 사랑해...\"", analysis: "감동의 눈물" },
                            INTP: { emotion: "🙂", text: "\"응, 나도.\"", analysis: "담백한 화답" },
                            ESTP: { emotion: "😎", text: "\"나도~ 빠이!\"", analysis: "자연스러운 화답" },
                            ESFP: { emotion: "🤗", text: "\"나도 사랑해! 보고 싶을 거야~\"", analysis: "애정 표현 적극적" },
                            ENFP: { emotion: "😍", text: "\"나도 사랑해! 완전 좋아!\"", analysis: "애정 폭발" },
                            ENTP: { emotion: "😏", text: "\"나도~ 근데 늦지 마!\"", analysis: "사랑+농담" },
                            ESTJ: { emotion: "😊", text: "\"나도 사랑해. 조심히 가.\"", analysis: "진중한 화답" },
                            ESFJ: { emotion: "🥰", text: "\"나도 엄청 사랑해! 빠이~\"", analysis: "적극적 화답" },
                            ENFJ: { emotion: "😘", text: "\"나도 너무너무 사랑해!\"", analysis: "감정 충만" },
                            ENTJ: { emotion: "😌", text: "\"나도. 조심히 가.\"", analysis: "효율적이지만 따뜻함" }
                        }
                    },
                    {
                        id: "c3",
                        text: "C. \"빠이~\" (아무 말 없이)",
                        points: 0,
                        reaction: {
                            ISTJ: { emotion: "😐", text: "\"...응.\"", analysis: "담담함" },
                            ISFJ: { emotion: "😔", text: "\"어... 빠이...\"", analysis: "약간 서운함" },
                            INFJ: { emotion: "🤔", text: "\"...빠이.\"", analysis: "뭔가 아쉬움" },
                            INTJ: { emotion: "😑", text: "\"응.\"", analysis: "무덤덤" },
                            ISTP: { emotion: "😶", text: "\"ㅇㅇ\"", analysis: "쿨함" },
                            ISFP: { emotion: "😕", text: "\"...응.\"", analysis: "살짝 서운함" },
                            INFP: { emotion: "😞", text: "\"...빠이.\"", analysis: "마음속 상처" },
                            INTP: { emotion: "😐", text: "\"응.\"", analysis: "담담함" },
                            ESTP: { emotion: "😎", text: "\"ㅇㅋ~\"", analysis: "쿨함" },
                            ESFP: { emotion: "😕", text: "\"어... 빠이...\"", analysis: "약간 아쉬움" },
                            ENFP: { emotion: "😔", text: "\"...빠이.\"", analysis: "서운함" },
                            ENTP: { emotion: "🤔", text: "\"ㅇㅋ.\"", analysis: "약간 의아함" },
                            ESTJ: { emotion: "😐", text: "\"응.\"", analysis: "무덤덤" },
                            ESFJ: { emotion: "😢", text: "\"...빠이...\"", analysis: "서운함" },
                            ENFJ: { emotion: "😔", text: "\"...응, 빠이.\"", analysis: "아쉬움" },
                            ENTJ: { emotion: "😑", text: "\"응.\"", analysis: "쿨함" }
                        }
                    }
                ]
            }
        ]
    }
};

// 시뮬레이터 상태
let currentScenario = null;
let currentStage = 0;
let totalScore = 0;
let choiceHistory = [];

// 시뮬레이터 시작
function startSimulator(scenarioId) {
    currentScenario = simulatorScenarios[scenarioId];
    currentStage = 0;
    totalScore = 0;
    choiceHistory = [];

    $("#selected-person-sim").text(personLabel);
    $("#selected-mbti-sim").text(mbti);
    $("#selected-person-reaction").text(personLabel);

    $(".phrase-selector").hide();
    $(".simulator-screen").show();
    showSimulatorStage();
    window.scrollTo(0, 0);
}

// 시뮬레이터 단계 표시
function showSimulatorStage() {
    const stage = currentScenario.stages[currentStage];

    // 제목 및 진행 상황
    $("#simulator-title").text(currentScenario.title);
    $("#simulator-emoji").text(currentScenario.emoji);
    $("#simulator-progress").text(`${currentStage + 1} / ${currentScenario.stages.length}`);

    // 상황 설명
    $("#simulator-situation").text(stage.situation);

    // 선택지 생성
    const choicesHTML = stage.choices.map(choice =>
        `<button class="simulator-choice-btn" onclick="selectSimulatorChoice('${choice.id}', ${choice.points})">${choice.text}</button>`
    ).join('');

    $("#simulator-choices").html(choicesHTML);

    // 반응 영역 숨김
    $("#simulator-reaction").hide();
}

// 선택지 선택
function selectSimulatorChoice(choiceId, points) {
    const stage = currentScenario.stages[currentStage];
    const choice = stage.choices.find(c => c.id === choiceId);

    // 점수 추가
    totalScore += points;
    choiceHistory.push({ stage: currentStage + 1, choice: choiceId, points: points });

    // MBTI별 반응 표시
    const reaction = choice.reaction[mbti];

    $("#reaction-emotion").text(reaction.emotion);
    $("#reaction-text").text(`"${reaction.text}"`);
    $("#reaction-analysis").text(`💭 ${reaction.analysis}`);

    // 선택지 숨기고 반응 표시
    $("#simulator-choices").hide();
    $("#simulator-reaction").show();

    // 다음 버튼 표시
    if (currentStage < currentScenario.stages.length - 1) {
        $("#next-stage-btn").show();
        $("#finish-simulator-btn").hide();
    } else {
        $("#next-stage-btn").hide();
        $("#finish-simulator-btn").show();
    }
}

// 다음 단계로
function nextSimulatorStage() {
    currentStage++;
    showSimulatorStage();
    $("#simulator-reaction").hide();
    $("#simulator-choices").show();
    window.scrollTo(0, 0);
}

// 시뮬레이터 완료
function finishSimulator() {
    $(".simulator-screen").hide();
    $(".simulator-result").show();

    // 점수 평가
    let grade, feedback, emoji;
    if (totalScore >= 7) {
        grade = "완벽한 대처! 🏆";
        emoji = "🥇";
        feedback = `${mbti} 상대방이 완전히 만족했어요! 관계가 더욱 깊어졌습니다.`;
    } else if (totalScore >= 4) {
        grade = "좋은 대처! 👍";
        emoji = "😊";
        feedback = `${mbti} 상대방이 이해해줬어요. 다음엔 더 좋을 거예요!`;
    } else if (totalScore >= 0) {
        grade = "무난한 대처 😐";
        emoji = "🤔";
        feedback = `${mbti} 상대방이 약간 아쉬워해요. 조금 더 신경 쓰면 좋겠어요.`;
    } else {
        grade = "위험한 대처! ⚠️";
        emoji = "😰";
        feedback = `${mbti} 상대방이 많이 상처받았어요... 진심 어린 사과가 필요합니다.`;
    }

    $("#result-grade").text(grade);
    $("#result-emoji").text(emoji);
    $("#result-score").text(`점수: ${totalScore}점`);
    $("#result-feedback").text(feedback);
    $("#result-person").text(personLabel);
    $("#result-mbti-type").text(mbti);

    window.scrollTo(0, 0);
}

// 시뮬레이터에서 처음으로
function restartFromSimulator() {
    $(".simulator-result").hide();
    $(".start").show();
    window.scrollTo(0, 0);
}

// 시뮬레이터 다시 하기
function retrySimulator() {
    $(".simulator-result").hide();
    startSimulator("late");
}
