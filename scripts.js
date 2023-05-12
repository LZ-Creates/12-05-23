const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
  {
    question: "What is the capital of Germany?",
    answers: {
      A: "Munich",
      B: "Berlin",
      C: "Hamburg"
    },
    correctAnswer: "B"
  },
  {
    question: "What sport does Tom Brady play?",
    answers: {
      A: "American Football",
      B: "Hockey",
      C: "Basketball"
    },
    correctAnswer: "A"
  },
  {
    question: "Who wrote The Lord of the Rings?",
    answers: {
      A: "J. D. Salinger",
      B: "Harper Lee",
      C: "J. R. R. Tolkien"
    },
    correctAnswer: "C"
  }
];

function buildQuiz() {
  const output = [];

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];

    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
           <input type="radio" name="question${questionNumber}" value="${letter}">
           ${letter} : ${currentQuestion.answers[letter]}
         </label>`
      );
    }

    output.push(
      `<div class="question">${currentQuestion.question}</div>
       <div class="answers">${answers.join('')}</div>`
    );
  });

  quizContainer.innerHTML = output.join('');
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answers');

  let numCorrect = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainers[questionNumber].style.color = 'green';
    } else {
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

buildQuiz();

submitButton.addEventListener('click', showResults);
function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answers');
  let numCorrect = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainers[questionNumber].style.color = 'green';
    } else {
      answerContainers[questionNumber].style.color = 'red';
    }

    // save the user's answer to localStorage
    localStorage.setItem(`question${questionNumber}`, userAnswer);
  });

  // save the number of correct answers to localStorage
  localStorage.setItem('numCorrect', numCorrect);

  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;



  // Previous code for showing results

  // Replace the original button with the styled button
  const viewProgressButton = document.createElement('button');
  viewProgressButton.id = 'view-progress';
  viewProgressButton.innerHTML = 'View Progress';
  viewProgressButton.addEventListener('click', navigateToProgress);

  resultsContainer.innerHTML = ''; // Clear the results container
  resultsContainer.appendChild(viewProgressButton);
}


function navigateToProgress() {
  window.location.href = 'progress.html';
}

