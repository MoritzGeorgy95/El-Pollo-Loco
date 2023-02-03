let gameContainer = document.getElementById("gameContainer");

let canvas;
let world;
let keyboard = new Keyboard();
let gameAudio = new Audio();
gameAudio.src = "audio/gameloop.mp3";
gameAudio.loop = true;
let soundOn = false;
let knock= new Audio;
knock.src= "audio/knock.mp3";

function renderStartscreen() {
  gameContainer.innerHTML = startScreenTemplate();
}

function renderGame() {
  knock.play();
  gameContainer.innerHTML = gameTemplate();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function renderEndscreen() {
  gameContainer.innerHTML = endScreenTemplate();

}

function startScreenTemplate() {
  return /*html*/ `
  <div class="startscreen-container">
    <button onclick="renderGame();">Start</button>
    <div class="icon-container">
      <i class="bi bi-volume-mute" onclick="playGameSound();"></i>
      <i class="bi bi-arrows-fullscreen" onclick="enterFullScreen();"></i>
      <i class="bi bi-controller" onclick="renderGameManual();"></i>    
    </div>
    <div class="manual-overlay">
      <h1>Game manual</h1>
      <div>
        <i class="bi bi-arrow-left-square"></i>
        <p>Move left</p>
      </div> 
      <div>
        <i class="bi bi-arrow-right-square"></i>
        <p>Move right</p>
      </div>
      <div>
        <i class="bi bi-distribute-vertical"></i>
        <p>Jump (Spacebar)</p>
      </div>
      <div>
        <p style="padding-left: 7px; font-weight: bold;">E</p>
        <p>Throw Bottle</p>
      </div>
    </div>
    <p id="closeOverlay" onclick="closeGameManual();">X</p>
  </div>
  `;
}

function gameTemplate() {
  return /*html*/ `<canvas width="720" height= "480" id="canvas"></canvas>`;
}


function endScreenTemplate() {
  return /*html*/ `
  <div class="endscreen-container">
    <img src="img/9_intro_outro_screens/game_over/game over!.png">
    <button onclick="renderGame();">New Game</button>
  </div>
  `
}

function init() {
  renderStartscreen();
 
}

function playGameSound() {
  let icon = document.getElementsByTagName("i")[0];
  if (soundOn) {
    gameAudio.pause();
    icon.classList.remove("bi-volume-up-fill");
    icon.classList.add("bi-volume-mute");
    soundOn = false;
  } else {
    icon.classList.remove("bi-volume-mute");
    icon.classList.add("bi-volume-up-fill");
    gameAudio.play();
    soundOn = true;
  }
}

function renderGameManual() {
  knock.play();
  document.getElementsByClassName('manual-overlay')[0].style.display= 'flex';
  document.getElementById('closeOverlay').style.display= 'inline';
}


function closeGameManual() {
  knock.play();
  document.getElementsByClassName('manual-overlay')[0].style.display= 'none';
  document.getElementById('closeOverlay').style.display= 'none';

}

function enterFullScreen() {
  if (!fullscreen) {
    document.documentElement.requestFullscreen();
    fullscreen= true;
  }
  else {
    document.exitFullscreen();
    fullscreen= false;
  }
}

let fullscreen= false;


// in game event listener
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
