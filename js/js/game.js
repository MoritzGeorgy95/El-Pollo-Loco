// El pollo loco 

/**
 * Script variables 
 */
//container in which game is rendered
let gameContainer = document.getElementById("gameContainer");

//canvas element on which game objects are drawn 
let canvas = document.getElementById("canvas");

// keyboard object to detect keydown/-up events 
let keyboard = new Keyboard();

//pre-game & in game audios
let gameAudio = new Audio();
gameAudio.src = "audio/gameloop.mp3";
gameAudio.loop = true;
let soundOn = false;
let knock = new Audio();
knock.src = "audio/knock.mp3";

//world object containing all game objects(character, enemies etc.)
world = new World(canvas, keyboard);

/**
 * Game framework: Pregame functions & eventlisteners. 
 */

//start game when user clicks on start game button
function startGame() {
  knock.play();
  document.getElementsByClassName("startscreen-container")[0].style.display =
    "none";
  document.getElementsByClassName("bi-controller")[0].style.visibility =
    "hidden";
  addMobileControlPanel();
  world.enemies.forEach(enemy => {
    enemy.incrementX();
  });
}

//render Endscreen when gameover
function renderEndscreen() {
  gameContainer.innerHTML = endScreenTemplate();
}

//inject mobile control panel into DOM for mobile gaming
function addMobileControlPanel() {
  gameContainer.append(addMobileControlPanelTemplate());
  addEventListenersToPanel();
}

//render game manual onclick & handle state
function renderGameManual() {
  knock.play();
  document.getElementsByClassName("manual-overlay")[0].style.display = "flex";
  document.getElementById("closeOverlay").style.display = "inline";
}

function closeGameManual() {
  knock.play();
  document.getElementsByClassName("manual-overlay")[0].style.display = "none";
  document.getElementById("closeOverlay").style.display = "none";
}

//HTML templates
function addMobileControlPanelTemplate() {
  let panel = document.createElement("div");
  panel.classList.add("mobile-control-panel");
  panel.innerHTML = /*html*/ `
        <div>
          <i class="bi bi-arrow-left-square" id="left"></i>
          <i class="bi bi-arrow-right-square" id="right"></i>
        </div>
        <div>
          <i class="bi bi-arrow-bar-up" id="jump"></i>
          <i class="bi bi-fire" id="throw"></i>
        </div>
  `;
  return panel
}

function endScreenTemplate() {
  return /*html*/ `
  <div class="endscreen-container">
    <img src="img/9_intro_outro_screens/game_over/game over!.png">
    <button onclick="window.location.reload();">New Game</button>
  </div>
  `;
}


//play game sound on click and change icon
function playGameSound() {
  let icon = document.getElementsByTagName("i")[0];
  if (soundOn) {
    icon.classList.remove("bi-volume-up-fill");
    icon.classList.add("bi-volume-mute");
    gameAudio.pause();
    soundOn = false;
  } else {
    icon.classList.remove("bi-volume-mute");
    icon.classList.add("bi-volume-up-fill");
    gameAudio.play();
    soundOn = true;
  }
}

//make browserwindwo fullscreen
function enterFullScreen() {
  if (!fullscreen) {
    document.documentElement.requestFullscreen();
    fullscreen = true;
  } else {
    document.exitFullscreen();
    fullscreen = false;
  }
}

let fullscreen = false;

// in game event listeners (keyboard)
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (event.code === "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (event.code === "Space") {
    keyboard.SPACE = true;
  }

  if (event.code === "KeyE") {
    keyboard.E = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (event.code === "ArrowLeft") {
    keyboard.LEFT = false;
  }
});

 
//event listeners for touch panel on mobile device
function addEventListenersToPanel() {
  const throW = document.getElementById("throw");
  const jump = document.getElementById("jump");
  const left = document.getElementById("left");
  const right = document.getElementById("right");

  left.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  left.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  right.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  right.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  jump.addEventListener("touchstart", () => {
    keyboard.SPACE = true;
  });


  throW.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.E = true;
  }); 


}


