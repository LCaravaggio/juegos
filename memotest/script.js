const animals = [
  'lion', 'tiger', 'elephant', 'giraffe', 'monkey',
  'zebra', 'hippo', 'rhino', 'panda', 'kangaroo',
  'bear', 'wolf', 'fox', 'deer', 'koala'
];

let gameBoard = document.getElementById('game-board');
let statusDisplay = document.getElementById('status');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// Duplicar los animales y barajar
let cardsArray = [...animals, ...animals];
shuffle(cardsArray);

// Crear las fichas del juego
cardsArray.forEach(animal => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.animal = animal;
  card.innerHTML = `<img src="images/${animal}.png" alt="${animal}">`;
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  lockBoard = true;
  const isMatch = firstCard.dataset.animal === secondCard.dataset.animal;

  if (isMatch) {
    disableCards();
    matches += 1;
    if (matches === animals.length) {
      statusDisplay.textContent = '¡Has ganado! Todos los pares encontrados.';
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
