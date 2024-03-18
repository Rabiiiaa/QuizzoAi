const API_URL = 'https://the-trivia-api.com/v2/questions';

let currentQuestionIndex = 0;
let questions = [];
let score = 0;

const questionContainer = document.getElementById('question-container');
const answerButtonsContainer = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreDisplay = document.getElementById('score-display');

async function startQuiz() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        questions = data.results;
        showQuestion(questions[currentQuestionIndex]);
    } catch (error) {
        console.error('Error fetching quiz data:', error);
    }
}

function showQuestion(question) {
    questionContainer.innerHTML = question.question;
    answerButtonsContainer.innerHTML = '';
    question.incorrect_answers.forEach(answer => {
        answerButtonsContainer.innerHTML += `<button class="btn" onclick="checkAnswer('${answer}')">${answer}</button>`;
    });
    answerButtonsContainer.innerHTML += `<button class="btn" onclick="checkAnswer('${question.correct_answer}')">${question.correct_answer}</button>`;
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
        // Handle correct answer
        console.log('Correct!');
        score++;
    } else {
        // Handle incorrect answer
        console.log('Incorrect!');
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        // Quiz completed
        displayScore();
    }
}

function displayScore() {
    scoreDisplay.innerHTML = `Your Score: ${score} / ${questions.length}`;
    nextButton.style.display = 'none'; // Hide the "Next" button at the end
}

function getNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        // Quiz completed
        displayScore();
    }
}

async function startQuiz() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
        if (!data || !data.results || data.results.length === 0) {
            throw new Error('Invalid quiz data format');
        }
        questions = data.results;
        showQuestion(questions[currentQuestionIndex]);
    } catch (error) {
        console.error('Error fetching quiz data:', error);
    }
}


// Start the quiz when the page loads
startQuiz();
