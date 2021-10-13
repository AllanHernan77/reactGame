import './App.css';
function App() {
// when using JSX, we can use vanilla JS, but calling it in react is different
// here, outside the return function we are using vanilla JS, so everything is 
// imported from the orginal game to here. Same functionality and code.



//nested functions to access variables within thier scopes so that we do not need to declare global variables
  function playGame(replay){
    var LETTERS = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];
    var animations = {
      a: [],
      b: [],
      c: [],
      d: [],
      e: [],
      f: [],
      g: [],
      h: [],
      i: [],
      j: [],
      k: [],
      l: [],
      m: [],
      n: [],
      o: [],
      p: [],
      q: [],
      r: [],
      s: [],
      t: [],
      u: [],
      v: [],
      w: [],
      x: [],
      y: [],
      z: []
    };

    var gameOn = true;
    var timeOffset = 2000; //interval between letters starting, will be faster over time
    var main = document.getElementById("main");
    var scoreElement = document.getElementById("score");
    var lifeElement = document.getElementById("misses");
    var lives = 5;
    var score = 0;
    
    
    function create() {

      var idx = Math.floor(Math.random() * LETTERS.length); // retrive a random index from the word array
      var x = Math.random() * 80 + "vw"; // value that expands from the entire width of the screen with a vw value 
      var container = document.createElement("div");
      var letter = document.createElement("span");
      var letterText = document.createElement("p");
      letterText.textContent = LETTERS[idx];
      letter.appendChild(letterText);
      container.appendChild(letter);
      main.appendChild(container);
    
  
  

    var animation = container.animate( //div animation now has an animate interface
      [                   
        { transform: "translate3d(" + x + ",-2.5vh , 0)" }, //x y and z 
        { transform: "translate3d(" + x + ",82.5vh, 0)" } // points at which it is going to stop
      ],
      {
        duration: 2000,
        easing: "linear",
        fill: "both"
      }
    );

    animations[LETTERS[idx]].splice(0, 0, {
      animation: animation,
      element: container
    });


    //If an animation finishes, we will consider that as a miss, so we will remove it from the active animations array and increment our miss count
    animation.onfinish = function (e) {
      var target = container;
      var char = target.textContent;

      animations[char].pop();
      handleMisses();
    };




    }

   //When a miss is registered, check if we have reached the max number of misses
    function handleMisses() {
      lives--;
      lifeElement.textContent = "Lives " + lives;
  
      if (lives === 0){
        gameOver();
      }
  
    }
   //End game and show screen
    function gameOver() {
      gameOn = false;
   
      document.getElementById("game-over").classList.add("endScreen");
    }
  //start the falling letters... create the element+animation, and setup timeout for next letter to start
    function setupNextLetter() {
      if (gameOn) {
        create();
        setTimeout(function () {
          setupNextLetter();
        }, timeOffset);
      }
    }
    setupNextLetter();

    //key press function forked from above 
    function onPress(e) {
      var char = e.key;
      if (char.length === 1) {
        char = char.toLowerCase();
        if (animations[char] && animations[char].length) {
          var popped = animations[char].pop();
          popped.animation.pause();
          var target = popped.element.querySelector("p");
          target.animate(
            [
              {
                opacity: 1
              },
              {
                opacity: 0
              }
            ],
            {
              easing: "ease-out",
              fill: "both"
            }
          );
          addScore();
        }
      }
    }
    
    //increments score 
  function addScore() {
    score++;
    scoreElement.textContent = "Score "+ score;
  }
  document.body.addEventListener("keypress", onPress);


  }

  function loadGame() {

    var button = document.getElementsByTagName("button")[0];
    button.textContent = "Start Game";
    button.addEventListener("click", function beginGame(e) {
    button.remove(); // remove the start button
    playGame()
  });

}
  
  return (
    // returning a main tag to the root, which is also a main tag
    <main>
        <main>
            <button id="button">Start Game</button>
        </main>      

    <div id="theNav">
        <nav>
          <div id="misses">Lives 5</div>
          <div id="score">Score 0</div>
        </nav>
      </div>

      <div id="game-over">
        <p>Game Over</p>
      </div>
    
     { window.onload= loadGame} {/* A JSX call for load game,we have to wait for the contens to load first aswell */}  
      </main>
  );
}

export default App;
