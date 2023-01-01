document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName('button');

  for (let button of buttons) {
    button.addEventListener('click', function () {
      if (this.getAttribute('data-type') === 'submit') {
        checkAnswer();
      } else {
        let gameType = this.getAttribute('data-type');
        runGame(gameType);
      }
    })
  }

  document.getElementById('answer-box').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  });

  runGame('addition');
})

/**
 * The main game loop, called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

  document.getElementById('answer-box').value = '';
  document.getElementById('answer-box').focus();

  // creates 2 random numbers between 1-25
  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;
  switch(gameType) {
    case 'addition':
      displayAdditionQuestion(num1, num2);
      break;
    case 'subtract':
      if (num1 < num2) {[num1, num2] = [num2, num1]}
      displaySubtractQuestion(num1, num2);
      break;
    case 'multiply':
      displayMultiplyQuestion(num1, num2);
      break;
    case 'divide':
      num1 = num1 * num2
      if (num1 < num2) {[num1, num2] = [num2, num1]}
      displayDivideQuestion(num1, num2);
      break;
      default:
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`
  }
}

/**
 * Checks the answer agaist the first  element in
 * the returned calculateCorrectAnswer
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById('answer-box').value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
    alert('You got it right!');
    incrementScore();
  } else {
    incrementWrongAnswer();
    alert(`${userAnswer} is wrong. The correct answer was ${calculatedAnswer[0]}!`)
  }
  runGame(calculatedAnswer[1])
}

/**
 * Gets the operands and the operator
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {
  let num1 = parseInt(document.getElementById('operand1').innerText);
  let num2 = parseInt(document.getElementById('operand2').innerText);
  let operator = document.getElementById('operator').innerText;

  switch(operator) {
    case '+':
      return [num1 + num2, 'addition']
    case '-':
      return [num1 - num2, 'subtract']
    case 'x':
      return [num1 * num2, 'multiply']
    case '/':
      return [num1 / num2, 'divide']
    default:
      alert(`Unimplemented operator ${operator}`);
      throw `Unimplemented operator ${operator}. Aborting!`;
  }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
  let scoreEl = document.getElementById('score');
  let oldScore = parseInt(scoreEl.innerText)
  scoreEl.innerHTML = ++oldScore
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
  let scoreEl = document.getElementById('incorrect');
  let oldScore = parseInt(scoreEl.innerText)
  scoreEl.innerHTML = ++oldScore
}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById('operator').textContent = '+'
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;

}
function displaySubtractQuestion(operand1, operand2) {
  document.getElementById('operator').textContent = '-'
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
}
function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById('operator').textContent = 'x'
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
}
function displayDivideQuestion(operand1, operand2) {
  document.getElementById('operator').textContent = '/'
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
}