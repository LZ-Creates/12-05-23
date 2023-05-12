function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
  
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerContainers[questionNumber].style.color = 'teal';
      } else {
        answerContainers[questionNumber].style.color = 'red';
      }
  
      // save the user's answer to localStorage
      localStorage.setItem(`question${questionNumber}`, userAnswer);
    });
  
    // save the number of correct answers to localStorage
    localStorage.setItem('numCorrect', numCorrect);
  
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }
  const progressTable = document.getElementById('progressTable');

myQuestions.forEach((currentQuestion, questionNumber) => {
  const row = progressTable.insertRow();
  const questionCell = row.insertCell();
  const userAnswerCell = row.insertCell();
  const correctAnswerCell = row.insertCell();

  questionCell.innerHTML = currentQuestion.question;
  userAnswerCell.innerHTML = localStorage.getItem(`question${questionNumber}`) || '-';
  correctAnswerCell.innerHTML = currentQuestion.answers[currentQuestion.correctAnswer];

  if (userAnswerCell.innerHTML === correctAnswerCell.innerHTML) {
    userAnswerCell.style.color = 'black';
  } else {
    userAnswerCell.style.color = 'black';
  }
});

const numCorrect = localStorage.getItem('numCorrect');
progressTable.insertRow().insertCell().innerHTML = `You got ${numCorrect} out of ${myQuestions.length} correct.`;
