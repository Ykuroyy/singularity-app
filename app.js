const sections = document.querySelectorAll('.content-section');
const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSection = button.dataset.section;
        
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetSection) {
                section.classList.add('active');
                
                if (targetSection === 'quiz') {
                    initQuiz();
                }
            }
        });
    });
});

const quizData = [
    {
        question: "シンギュラリティとは何を指す言葉でしょう？",
        options: [
            "AIが感情を持つ瞬間",
            "AIが人間の知能を超えて自己進化を始める瞬間",
            "ロボットが人間と見分けがつかなくなる瞬間",
            "コンピュータの処理速度が2倍になる瞬間"
        ],
        correct: 1,
        explanation: "シンギュラリティは、AIが人間のあらゆる知的能力を超え、自分で自分を改良できるようになる技術的特異点のことです。"
    },
    {
        question: "元々シンギュラリティはいつ頃に起こると予測されていましたか？",
        options: [
            "2030年",
            "2035年",
            "2045年",
            "2050年"
        ],
        correct: 2,
        explanation: "レイ・カーツワイルなどの未来学者は、シンギュラリティを2045年頃と予測していました。しかし、最近のAIの急速な進化により、その時期が早まる可能性が指摘されています。"
    },
    {
        question: "2022年に登場し、世界に衝撃を与えたAIサービスは？",
        options: [
            "Alexa",
            "ChatGPT",
            "Siri",
            "Google Assistant"
        ],
        correct: 1,
        explanation: "ChatGPTは2022年11月に公開され、人間のような自然な会話ができるAIとして、わずか2ヶ月で1億人のユーザーを獲得し、AI革命の火付け役となりました。"
    },
    {
        question: "AGIとは何の略称でしょう？",
        options: [
            "Advanced Gaming Intelligence",
            "Artificial General Intelligence（汎用人工知能）",
            "Automated Global Interface",
            "Augmented Graphic Intelligence"
        ],
        correct: 1,
        explanation: "AGI（汎用人工知能）は、人間のようにあらゆる知的タスクをこなせるAIのことで、シンギュラリティへの重要なステップとされています。"
    },
    {
        question: "シンギュラリティが起きた後、私たちが準備しておくべき最も重要なことは？",
        options: [
            "AIに仕事を奪われないよう競争する",
            "AIから逃れて生活する",
            "AIと共存し、人間らしさを保ちながら協働する方法を学ぶ",
            "すべてをAIに任せて何もしない"
        ],
        correct: 2,
        explanation: "シンギュラリティ後の世界では、AIと競争するのではなく、AIを味方として活用し、創造性や感性など人間特有の能力を活かしながら共存することが重要です。"
    }
];

let currentQuestion = 0;
let score = 0;
let quizActive = false;

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    quizActive = true;
    
    document.getElementById('quiz-question').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-complete').classList.add('hidden');
    
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentQuestion];
    const questionNumber = document.getElementById('question-number');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const progressFill = document.getElementById('quiz-progress-fill');
    
    questionNumber.textContent = `問題 ${currentQuestion + 1} / ${quizData.length}`;
    questionText.textContent = question.question;
    
    progressFill.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    
    answerOptions.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'answer-option';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        answerOptions.appendChild(button);
    });
    
    document.getElementById('quiz-result').classList.add('hidden');
}

function selectAnswer(selectedIndex) {
    if (!quizActive) return;
    
    quizActive = false;
    const question = quizData[currentQuestion];
    const answerOptions = document.querySelectorAll('.answer-option');
    
    answerOptions[selectedIndex].classList.add('selected');
    
    setTimeout(() => {
        if (selectedIndex === question.correct) {
            answerOptions[selectedIndex].classList.add('correct');
            score++;
            showResult(true, question.explanation);
        } else {
            answerOptions[selectedIndex].classList.add('incorrect');
            answerOptions[question.correct].classList.add('correct');
            showResult(false, question.explanation);
        }
    }, 500);
}

function showResult(isCorrect, explanation) {
    const resultDiv = document.getElementById('quiz-result');
    const resultMessage = document.getElementById('result-message');
    const explanationDiv = document.getElementById('explanation');
    
    resultMessage.textContent = isCorrect ? '🎉 正解です！' : '😅 惜しい！';
    resultMessage.style.color = isCorrect ? '#4caf50' : '#f44336';
    explanationDiv.textContent = explanation;
    
    resultDiv.classList.remove('hidden');
}

function showQuizComplete() {
    document.getElementById('quiz-question').classList.add('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-complete').classList.remove('hidden');
    
    const finalScore = document.getElementById('final-score');
    const scoreMessage = document.getElementById('score-message');
    
    finalScore.textContent = `${score} / ${quizData.length}`;
    
    let message = '';
    const percentage = (score / quizData.length) * 100;
    
    if (percentage === 100) {
        message = '🏆 完璧です！シンギュラリティマスターの称号を授けます！';
    } else if (percentage >= 80) {
        message = '🌟 素晴らしい！シンギュラリティについてよく理解されています！';
    } else if (percentage >= 60) {
        message = '👍 良いですね！もう少しでシンギュラリティエキスパートです！';
    } else if (percentage >= 40) {
        message = '💪 頑張りました！もう一度復習してみましょう！';
    } else {
        message = '📚 シンギュラリティは奥が深いですね。もう一度チャレンジしてみましょう！';
    }
    
    scoreMessage.textContent = message;
}

document.getElementById('next-question').addEventListener('click', () => {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        quizActive = true;
        loadQuestion();
    } else {
        showQuizComplete();
    }
});

document.getElementById('restart-quiz').addEventListener('click', () => {
    initQuiz();
});

const progressBars = document.querySelectorAll('.progress-fill');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const targetWidth = progressBar.style.width;
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.width = targetWidth;
            }, 100);
        }
    });
});

progressBars.forEach(bar => observer.observe(bar));