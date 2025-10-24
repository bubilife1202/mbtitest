// MBTI 궁합 계산 및 분석

// 내 MBTI
let myMBTI = '';

// 궁합 테스트 시작
function startCompatibilityTest() {
    $(".phrase-selector").hide();
    $(".compatibility-selector").show();
    $("#compat-partner-label").text(personLabel);
    $("#compat-partner-mbti").text(mbti);
    window.scrollTo(0, 0);
}

// 내 MBTI 선택
function selectMyMBTI(selectedMBTI) {
    myMBTI = selectedMBTI;
    showCompatibilityResult();
}

// 궁합 점수 계산
function calculateCompatibility(mbti1, mbti2) {
    let score = 0;
    const tips = [];
    const pros = [];
    const cons = [];

    // E/I 분석
    if (mbti1[0] !== mbti2[0]) {
        score += 1.5;
        pros.push("외향-내향 균형으로 서로 보완 가능");
        tips.push("상대방의 에너지 충전 방식을 존중하세요");
    } else if (mbti1[0] === 'E' && mbti2[0] === 'E') {
        pros.push("함께 활동적으로 즐기는 시간");
        cons.push("둘 다 말하려고 해서 충돌 가능");
        tips.push("서로 말할 기회를 골고루 주세요");
    } else {
        pros.push("조용히 함께하는 편안한 시간");
        cons.push("둘 다 조용해서 대화가 적을 수 있음");
        tips.push("먼저 대화를 시작하는 노력이 필요해요");
    }

    // S/N 분석
    if (mbti1[1] === mbti2[1]) {
        score += 1.5;
        if (mbti1[1] === 'S') {
            pros.push("현실적이고 실용적인 문제 해결");
            tips.push("가끔은 상상력을 발휘해 로맨틱하게");
        } else {
            pros.push("창의적이고 깊이 있는 대화");
            tips.push("때로는 현실적인 계획도 함께 세우세요");
        }
    } else {
        cons.push("S형은 현실적, N형은 이상적이라 시각차");
        tips.push("서로의 관점을 이해하려는 노력 필요");
    }

    // T/F 분석
    if (mbti1[2] !== mbti2[2]) {
        score += 1.5;
        pros.push("논리와 감정의 균형");
        tips.push("T형은 감정 표현을, F형은 논리적 대화를");
    } else if (mbti1[2] === 'T' && mbti2[2] === 'T') {
        pros.push("합리적이고 효율적인 문제 해결");
        cons.push("감정 표현이 부족할 수 있음");
        tips.push("가끔은 감정을 솔직하게 나누세요");
    } else {
        pros.push("서로의 감정을 잘 이해하고 공감");
        cons.push("결정할 때 감정에 치우칠 수 있음");
        tips.push("중요한 결정은 논리적으로도 검토하세요");
    }

    // J/P 분석
    if (mbti1[3] !== mbti2[3]) {
        score += 1.5;
        pros.push("계획적 성향과 유연함의 조화");
        tips.push("J형은 융통성을, P형은 계획성을 배우세요");
    } else if (mbti1[3] === 'J' && mbti2[3] === 'J') {
        pros.push("체계적이고 안정적인 관계");
        cons.push("둘 다 고집이 세서 충돌 가능");
        tips.push("때로는 즉흥적인 재미도 즐겨보세요");
    } else {
        pros.push("자유롭고 유연한 관계");
        cons.push("계획 없이 흘러가기 쉬움");
        tips.push("중요한 일정은 미리 계획하세요");
    }

    // 기본 pros/cons 추가
    if (cons.length === 0) {
        cons.push("완벽한 궁합이라 도전이 부족할 수 있음");
        cons.push("너무 비슷해서 새로운 자극이 적을 수 있음");
    }

    return {
        score: score,
        pros: pros.slice(0, 4),
        cons: cons.slice(0, 3),
        tips: tips.slice(0, 3)
    };
}

// 점수에 따른 평가
function getGradeFromScore(score) {
    if (score >= 5.5) {
        return {
            grade: "💯 완벽한 궁합!",
            emoji: "🥇",
            rating: 5.0,
            description: "서로를 완벽하게 보완하는 환상의 커플이에요!"
        };
    } else if (score >= 4) {
        return {
            grade: "💕 최고의 궁합!",
            emoji: "🏆",
            rating: 4.5,
            description: "서로 다른 점이 매력이 되는 최고의 조합!"
        };
    } else if (score >= 3) {
        return {
            grade: "😊 좋은 궁합!",
            emoji: "👍",
            rating: 4.0,
            description: "서로를 이해하고 노력하면 행복한 관계!"
        };
    } else if (score >= 1.5) {
        return {
            grade: "🤝 무난한 궁합",
            emoji: "🙂",
            rating: 3.0,
            description: "이해와 배려로 충분히 좋은 관계를 만들 수 있어요."
        };
    } else {
        return {
            grade: "💪 노력이 필요한 궁합",
            emoji: "🔥",
            rating: 2.5,
            description: "많이 다르지만, 그만큼 배울 점도 많아요!"
        };
    }
}

// 궁합 결과 표시
function showCompatibilityResult() {
    const result = calculateCompatibility(myMBTI, mbti);
    const gradeInfo = getGradeFromScore(result.score);

    $("#compat-my-mbti").text(myMBTI);
    $("#compat-partner-mbti-result").text(mbti);
    $("#compat-partner-name").text(personLabel);

    $("#compat-emoji").text(gradeInfo.emoji);
    $("#compat-grade").text(gradeInfo.grade);
    $("#compat-rating").text(`⭐ ${gradeInfo.rating} / 5.0`);
    $("#compat-description").text(gradeInfo.description);

    // 장점
    const prosHTML = result.pros.map(pro => `<li>💚 ${pro}</li>`).join('');
    $("#compat-pros").html(prosHTML);

    // 주의점
    const consHTML = result.cons.map(con => `<li>⚠️ ${con}</li>`).join('');
    $("#compat-cons").html(consHTML);

    // 꿀팁
    const tipsHTML = result.tips.map(tip => `<li>💡 ${tip}</li>`).join('');
    $("#compat-tips").html(tipsHTML);

    $(".compatibility-selector").hide();
    $(".compatibility-result").show();
    window.scrollTo(0, 0);
}

// 뒤로 가기
function backToPhrasesFromCompat() {
    $(".compatibility-result").hide();
    $(".phrase-selector").show();
    window.scrollTo(0, 0);
}

// 처음으로
function restartFromCompat() {
    $(".compatibility-result").hide();
    $(".start").show();
    window.scrollTo(0, 0);
}
