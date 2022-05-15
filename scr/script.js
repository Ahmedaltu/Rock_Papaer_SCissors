const game = () => {
  let pScore = 0;
  let cScore = 0;
  
  const introScreen = document.querySelector('.intro');
  const gameScreen = document.querySelector('.match');
  const endScreen = document.querySelector('.ending');
  const winner = document.querySelector('.winner');
  const playerHand = document.querySelector('.player-hand');
  const computerHand = document.querySelector('.computer-hand');
  const playerScore = document.querySelector('.player-score p');
  const computerScore = document.querySelector('.computer-score p');

   const gameStart = () => {
     const clickToPlay = document.querySelector('.intro button');
  
     clickToPlay.addEventListener("click", () => {
       introScreen.classList.add("fadeOut");
       gameScreen.classList.add("fadeIn");
     })
   }

   const playMatch = () => {
     const playerOption = document.querySelectorAll('.options button');
     const hands = document.querySelectorAll('.hands img')

     
     for (const hand of hands) {
       hand.addEventListener("animationend", () => {
         hand.style.animation = '';
         document.getElementById('ppr').disabled = false;
         document.getElementById('sisr').disabled = false;
         document.getElementById('rok').disabled = false;
       });
     };

     const computerOptions = ['Paper', 'Scissors', 'Rock'];

     for (const option of playerOption) {
       option.addEventListener("click", () => {

         playerHand.src = 'Rock.png';
         computerHand.src = 'Rock.png';

         document.getElementById('ppr').disabled = true;
         document.getElementById('sisr').disabled = true;
         document.getElementById('rok').disabled = true;

         const computerNumber = Math.floor(Math.random() * 3);
         const computerChoice = computerOptions[computerNumber];
         console.log('computer choice is ', computerChoice);

         setTimeout ( () => {
           compareHands(option.textContent, computerChoice);
           playerHand.src = option.textContent + '.png';
           computerHand.src = `${computerChoice}.png`;
         }, 2000);

         playerHand.style.animation = "shakePlayer 2s ease";
         computerHand.style.animation = "shakeComputer 2s ease";

       });
       option.addEventListener("mouseup", () => {
         setTimeout ( () => {
           console.log(pScore, cScore);
           checkScore();
         }, 2100);
       });
     };
   }

   const compareHands = (player, computer) => {
     console.log(player, computer);
     if (player === computer) {
       winner.textContent = 'It is a tie';
       return;
     }
     if (player === 'Rock') {
       if (computer === 'Scissors') {
          winner.textContent = 'Player wins';
          pScore++;
          updateScore();
          return;
       } else {
         winner.textContent = 'Computer wins';
         cScore++;
         updateScore();
         return;
       }
     }
     if (player === 'Paper') {
       if (computer === 'Rock') {
          winner.textContent = 'Player wins';
          pScore++;
          updateScore();
          return;
       } else {
         winner.textContent = 'Computer wins';
         cScore++;
         updateScore();
         return;
       }
     }
     if (player === 'Scissors') {
       if (computer === 'Paper') {
          winner.textContent = 'Player wins';
          pScore++;
          updateScore();
          return;
       } else {
         winner.textContent = 'Computer wins';
         cScore++;
         updateScore();
         return;
       }
     }
   }

   const updateScore = () => {
     playerScore.textContent = pScore;
     computerScore.textContent = cScore;
   }

   const checkScore = () => {
     const endText = document.querySelector('.ending h2');

     if (pScore >= 10) {
       gameScreen.classList.remove("fadeIn");
       endScreen.classList.add("fadeIn");
       endText.textContent = 'You won the game with 10 points';
       return;
     }
     if (cScore >= 10) {
       gameScreen.classList.remove("fadeIn");
       endScreen.classList.add("fadeIn");
       endText.textContent = 'Computer won the game with 10 points';
       return;
     }
    }

   const rematch = () => {
     const rematchButton = document.querySelector('.ending button');
     rematchButton.addEventListener("click", () => {
       resetScore();
       console.log(pScore, cScore);
       playerHand.src = 'Rock.png';
       computerHand.src = 'Rock.png';
       winner.textContent = "Let's go!";
       gameScreen.classList.add("fadeIn");
       endScreen.classList.remove("fadeIn");
     });
   }

   const resetScore = () => {
     pScore = 0;
     cScore = 0;
     playerScore.textContent = pScore;
     computerScore.textContent = cScore;
   }

   gameStart();
   playMatch();
   rematch();
}
game();
