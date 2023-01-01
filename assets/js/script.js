document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName('button');

  for (let button of buttons) {
    button.addEventListener('click', function () {
      let gameType = this.getAttribute('data-type');

      if (gameType === 'submit') {
        console.log('submit');
      } else {
        console.log(gameType);
      }
    })
  }
})

function runGame() {

}
function checkAnswer() {

}
function calculateCorrectAnswer() {

}
function incrementScore() {

}
function incrementWrongAnswer() {

}
function displayAdditionQuestion() {

}
function displaySubtractQuestion() {

}
function displayMultiplyQuestion() {

}
function displayQuestion() {

}