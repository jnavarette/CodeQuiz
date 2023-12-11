// Define your quiz questions and choices here
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  // Add more questions here
];

// Other global variables
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

const timerEl = document.getElementById("timer");
const questionTextEl = document.getElementById("question-text");
const choicesEl = document.getElementById("choices");
const endSectionEl = document.getElementById("end-section");
const finalScoreEl = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitScoreBtn = document.getElementById("submit-score");

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  timeLeft = 60;
  document.getElementById("start-button").style.display = "none";
  document.getElementById("question-section").style.display = "block";
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion();
}

// Function to show a question
function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionTextEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach((choice) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => checkAnswer(choice));
    li.appendChild(button);
    choicesEl.appendChild(li);
  });
}

// Function to check the selected answer
function checkAnswer(selectedChoice) {
  const currentQuestion = questions[currentQuestionIndex];
  const resultEl = document.createElement("p");

  if (selectedChoice === currentQuestion.correctAnswer) {
    resultEl.textContent = "Correct!";
  } else {
    resultEl.textContent = "Incorrect!";
    timeLeft -= 10;
    if (timeLeft < 0) timeLeft = 0;
  }

  choicesEl.appendChild(resultEl);
  disableOptions();

  currentQuestionIndex++;
  setTimeout(() => {
    choicesEl.removeChild(resultEl);
    showQuestion();
  }, 1000); // Show the result for 1 second before moving to the next question
}

// Function to disable the option buttons after selecting an answer
function disableOptions() {
  const optionButtons = choicesEl.querySelectorAll("button");
  optionButtons.forEach((button) => {
    button.disabled = true;
  });
}

// Function to update the timer
function updateTimer() {
  timeLeft--;
  timerEl.textContent = "Time: " + timeLeft;

  if (timeLeft <= 0) {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  questionTextEl.textContent = "All done!";
  choicesEl.innerHTML = "";
  endSectionEl.style.display = "block";
  finalScoreEl.textContent = timeLeft;
}

// Function to save the score
function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    const scoreData = {
      initials: initials,
      score: timeLeft
    };

    // Get the existing high scores from localStorage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Add the new score data to the high scores array
    highScores.push(scoreData);

    // Sort the high scores array based on scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Save the updated high scores array back to localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Redirect to the high scores page or display a message
    // Replace "highscores.html" with the URL of the high scores page
    // window.location.href = "highscores.html" ONLY IF YOU WANT A HIGHSCORES TABLE....IF YOU WANT TELL TO ME...I WILL DO IT. Diego

    // For now, let's display a simple message
    alert("Score saved successfully!");
  }
}

// Event listener to start the quiz
document.getElementById("start-button").addEventListener("click", startQuiz);

// Event listener to submit the score
submitScoreBtn.addEventListener("click", saveScore);