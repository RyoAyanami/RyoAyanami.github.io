document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const mainScreen = document.getElementById("main-screen");
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result-container");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const backgroundElement = document.getElementById("background");
    const backButton = document.getElementById("back-button");
    const restartButton = document.getElementById("restart-button");
    const resultTitle = document.getElementById("result-title");
    const resultText = document.getElementById("result-text");

    // 调试计数器
    const counterAsuka = document.getElementById("counter-asuka");
    const counterRei = document.getElementById("counter-rei");
    const counterShinji = document.getElementById("counter-shinji");
    const counterKaworu = document.getElementById("counter-kaworu");
    const counterMari = document.getElementById("counter-mari");

    // 角色计数器
    let scores = JSON.parse(localStorage.getItem("scores")) || {
        "明日香": 0, "绫波丽": 0, "碇真嗣": 0, "渚薰": 0, "真希波": 0
    };

    let personalityDescriptions = {
        "明日香": "不愿向任何人示弱",
        "绫波丽": "总是以使命为先",
        "渚薰": "追求生命中的美感与哲学",
        "真希波": "以独特的视角看待世界",
        "碇真嗣": "在孤独与痛苦中挣扎"
    };

    let questions = [
        { text: "你最喜欢的机体是？", options: ["二号机", "零号机", "初号机", "Mark.06", "八号机"], characters: ["明日香", "绫波丽", "碇真嗣", "渚薰", "真希波"], bg: "1.jpg" },
        { text: "你如何看待“与他人建立关系”？", options: ["麻烦但不得不做", "毫无意义，只是命令", "害怕被伤害，所以逃避", "有趣且值得尝试", "是生命中最美的部分"], characters: ["明日香", "绫波丽", "碇真嗣", "真希波", "渚薰"], bg: "2.jpg" },
        { text: "你印象最深刻的名场面是？", options: ["初号机暴走", "明日香的坚持", "零号机自爆", "Mark.06 降临", "天台降落伞"], characters: ["碇真嗣", "明日香", "绫波丽", "渚薰", "真希波"], bg: "3.jpg" },
        { text: "你最喜欢的名台词是？", options: ["微笑就可以了", "如果你不能完完全全成为我的的话，那我宁肯什么也不要", "早安晚安谢谢再见", "保重啊公主殿下", "也许我就是为了与你相遇才出生的"], characters: ["碇真嗣", "明日香", "绫波丽", "真希波", "渚薰"], bg: "4.jpg" },
        { text: "你如何看待“孤独”？", options: ["弱者的借口", "常态无需改变", "痛苦但无法摆脱", "创作灵感来源", "理解他人的起点"], characters: ["明日香", "绫波丽", "碇真嗣", "真希波", "渚薰"], bg: "5.jpg" },
        { text: "如果和使徒作战，你会选择？", options: ["高速突进", "冷静分析", "被动防御", "灵活游击", "优雅舞动"], characters: ["明日香", "绫波丽", "碇真嗣", "真希波", "渚薰"], bg: "6.jpg" },
        { text: "你最喜欢的场景色调？", options: ["红色激情", "蓝色冷静", "紫色神秘", "粉色活泼", "白色纯净"], characters: ["明日香", "绫波丽", "碇真嗣", "真希波", "渚薰"], bg: "7.jpg" }
    ];

    let selectedQuestions = [];
    let currentQuestionIndex = 0;
    let questionHistory = [];

    startButton.addEventListener("click", () => {
        // 计数器归零
        scores = {
            "明日香": 0, "绫波丽": 0, "碇真嗣": 0, "渚薰": 0, "真希波": 0
        };
        localStorage.setItem("scores", JSON.stringify(scores)); // 清空存储
        mainScreen.classList.add("hidden");
        quizContainer.classList.remove("hidden");

        selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 6);
        currentQuestionIndex = 0; // 确保问题索引归零
        questionHistory = []; // 归零历史记录

        displayQuestion();
    });

    function displayQuestion() {
        let q = selectedQuestions[currentQuestionIndex];
        questionElement.textContent = q.text;
        backgroundElement.src = q.bg;
        optionsElement.innerHTML = "";

        q.options.forEach((option, i) => {
            let btn = document.createElement("button");
            btn.textContent = option;
            btn.onclick = () => selectOption(q.characters[i]);
            optionsElement.appendChild(btn);
        });

        backButton.classList.toggle("hidden", currentQuestionIndex === 0);
        updateDebugScores();
    }

    function selectOption(character) {
        scores[character]++;
        questionHistory.push(character);

        if (currentQuestionIndex < selectedQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            checkForTie();
        }

        localStorage.setItem("scores", JSON.stringify(scores));
        updateDebugScores();
    }

    function checkForTie() {
        let highest = Math.max(...Object.values(scores));
        let topCharacters = Object.keys(scores).filter(key => scores[key] === highest);

        if (topCharacters.length === 1) {
            displayResult(topCharacters[0]);
        } else {
            addExtraQuestion(topCharacters);
        }
    }

    function addExtraQuestion(tiedCharacters) {
        let extraQuestion = {
            text: "在以下选项中，你更倾向哪种个性？",
            options: tiedCharacters.map(c => personalityDescriptions[c]),
            characters: tiedCharacters,
            bg: "extra.jpg"
        };

        selectedQuestions.push(extraQuestion);
        currentQuestionIndex++;
        displayQuestion();
    }

    function displayResult(character) {
        quizContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");

        resultTitle.textContent = character;
        let descriptions = {
            "明日香": "你像明日香一样，充满力量与骄傲，不愿向任何人示弱。你的自信是你的铠甲，但偶尔也会成为你的负担。真正的强大不仅是战胜敌人，更是直面自己的脆弱。",
            "绫波丽": "你像绫波丽一样，冷静而专注，总是以使命为先。你的孤独是你选择的道路，但在内心深处，你是否也渴望与他人建立真正的联系？",
            "渚薰": "你像渚薰一样，优雅而自由，追求生命中的美感与哲学。而你的选择，或许正是为了与某人相遇。幸福不在于永恒，而在于瞬间的感动。",
            "真希波": "你像真希波一样，活泼而乐观，总是以独特的视角看待世界。你的笑容是战场上的光芒，而你的选择，或许正是为了守护这份美好。快乐不仅是权利，更是责任。",
            "碇真嗣": "你像碇真嗣一样，在孤独与痛苦中挣扎，常常选择逃避。逃避并不可耻，重要的是是否愿意在跌倒后重新站起来。你的成长，正是人类补完计划的核心。"
        };
        resultText.textContent = descriptions[character];
    }

    backButton.addEventListener("click", () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            let lastCharacter = questionHistory.pop();
            scores[lastCharacter]--;
            displayQuestion();
            localStorage.setItem("scores", JSON.stringify(scores));
            updateDebugScores();
        }
    });

    restartButton.addEventListener("click", () => {
        localStorage.removeItem("scores");
        location.reload();
    });

    function updateDebugScores() {
        counterAsuka.textContent = scores["明日香"];
        counterRei.textContent = scores["绫波丽"];
        counterShinji.textContent = scores["碇真嗣"];
        counterKaworu.textContent = scores["渚薰"];
        counterMari.textContent = scores["真希波"];
    }
});





