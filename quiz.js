// MBTI 퀴즈 데이터
const quizData = [
    // E/I 차원 (외향/내향)
    {
        question: "주말에 친구들이 놀자고 연락했을 때",
        dimension: "EI",
        answers: [
            { text: "A. 좋아! 바로 나가고 싶다 😊", value: "E" },
            { text: "B. 집에서 쉬고 싶은데... 🏠", value: "I" }
        ]
    },
    {
        question: "처음 만난 사람들과 있을 때",
        dimension: "EI",
        answers: [
            { text: "A. 먼저 말 걸고 친해지려고 노력한다", value: "E" },
            { text: "B. 조용히 관찰하고 천천히 적응한다", value: "I" }
        ]
    },

    // S/N 차원 (감각/직관)
    {
        question: "친구가 고민 상담을 할 때",
        dimension: "SN",
        answers: [
            { text: "A. 구체적인 해결책을 제시한다 💡", value: "S" },
            { text: "B. 왜 그런지 근본 원인을 탐구한다 🤔", value: "N" }
        ]
    },
    {
        question: "새로운 프로젝트를 시작할 때",
        dimension: "SN",
        answers: [
            { text: "A. 현실적으로 할 수 있는 것부터 계획", value: "S" },
            { text: "B. 미래의 가능성과 비전을 먼저 생각", value: "N" }
        ]
    },

    // T/F 차원 (사고/감정)
    {
        question: "친구가 실수로 약속을 잊었을 때",
        dimension: "TF",
        answers: [
            { text: "A. 왜 잊었는지 이유를 묻는다", value: "T" },
            { text: "B. 괜찮다고 위로하며 이해한다", value: "F" }
        ]
    },
    {
        question: "의사결정을 할 때 더 중요한 것은?",
        dimension: "TF",
        answers: [
            { text: "A. 논리적으로 옳은지 ⚖️", value: "T" },
            { text: "B. 사람들의 감정과 관계 ❤️", value: "F" }
        ]
    },

    // J/P 차원 (판단/인식)
    {
        question: "여행 계획을 세울 때",
        dimension: "JP",
        answers: [
            { text: "A. 일정표를 미리 상세하게 짠다 📋", value: "J" },
            { text: "B. 대략 정하고 현지에서 즉흥적으로 ✈️", value: "P" }
        ]
    },
    {
        question: "과제나 일을 할 때",
        dimension: "JP",
        answers: [
            { text: "A. 마감 전에 미리미리 끝낸다", value: "J" },
            { text: "B. 마감 직전에 집중해서 한다", value: "P" }
        ]
    }
];

// 퀴즈 상태
let quizAnswers = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
};
let currentQuizQuestion = 0;

// 퀴즈 시작
function startQuiz() {
    quizAnswers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    currentQuizQuestion = 0;
    $("#selected-person-quiz").text(personLabel);
    $(".mbti-selector").hide();
    $(".quiz-screen").show();
    showQuizQuestion();
    window.scrollTo(0, 0);
}

// 퀴즈 질문 표시
function showQuizQuestion() {
    const q = quizData[currentQuizQuestion];
    const progress = Math.round(((currentQuizQuestion + 1) / quizData.length) * 100);

    $("#quiz-progress-bar").css("width", progress + "%");
    $("#quiz-progress-text").text(`${currentQuizQuestion + 1} / ${quizData.length}`);
    $("#quiz-question").html(`<strong>Q${currentQuizQuestion + 1}.</strong> ${q.question}`);

    const answersHTML = q.answers.map((answer, idx) =>
        `<button class="quiz-answer-btn" onclick="selectQuizAnswer('${answer.value}')">${answer.text}</button>`
    ).join('');

    $("#quiz-answers").html(answersHTML);
}

// 퀴즈 답변 선택
function selectQuizAnswer(value) {
    quizAnswers[value]++;
    currentQuizQuestion++;

    if (currentQuizQuestion < quizData.length) {
        showQuizQuestion();
    } else {
        finishQuiz();
    }
}

// 퀴즈 완료 및 MBTI 계산
function finishQuiz() {
    const mbtiResult =
        (quizAnswers.E >= quizAnswers.I ? 'E' : 'I') +
        (quizAnswers.S >= quizAnswers.N ? 'S' : 'N') +
        (quizAnswers.T >= quizAnswers.F ? 'T' : 'F') +
        (quizAnswers.J >= quizAnswers.P ? 'J' : 'P');

    // MBTI 자동 선택
    selectMBTI(mbtiResult);

    // 퀴즈 화면 숨기고 문구 선택으로
    $(".quiz-screen").hide();
    $(".phrase-selector").show();
    window.scrollTo(0, 0);
}

// 퀴즈에서 뒤로가기
function goBackToMBTIFromQuiz() {
    $(".quiz-screen").hide();
    $(".mbti-selector").show();
    window.scrollTo(0, 0);
}
