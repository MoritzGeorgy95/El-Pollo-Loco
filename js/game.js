let gameContainer = document.getElementById("gameContainer");

let canvas = document.getElementById("canvas");
let keyboard = new Keyboard();
let gameAudio = new Audio();
world = new World(canvas, keyboard);
gameAudio.src = "audio/gameloop.mp3";
gameAudio.loop = true;
let soundOn = false;
let knock = new Audio();
knock.src = "audio/knock.mp3";

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

function renderEndscreen() {
  gameContainer.innerHTML = endScreenTemplate();
}

function addMobileControlPanel() {
  gameContainer.append(addMobileControlPanelTemplate());
  addEventListenersToPanel();
}

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
  document.getElementsByClassName("manual-overlay")[0].style.display = "flex";
  document.getElementById("closeOverlay").style.display = "inline";
}

function closeGameManual() {
  knock.play();
  document.getElementsByClassName("manual-overlay")[0].style.display = "none";
  document.getElementById("closeOverlay").style.display = "none";
}

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

function addEventListenersToPanel() {
  const throW = document.getElementById("throw");
  const jump = document.getElementById("jump");
  const left = document.getElementById("left");
  const right = document.getElementById("right");

  left.addEventListener("mousedown", (event) => {
    keyboard.LEFT = true;
  });

  left.addEventListener("mouseup", (event) => {
    keyboard.LEFT = false;
  });

  right.addEventListener("mousedown", (event) => {
    keyboard.RIGHT = true;
  });

  right.addEventListener("mouseup", (event) => {
    keyboard.RIGHT = false;
  });

  jump.addEventListener("mousedown", (event) => {
    keyboard.SPACE = true;
  });

  jump.addEventListener("mouseup", (event) => {
    keyboard.SPACE = false;
  });

  throW.addEventListener("mousedown", (event) => {
    keyboard.E = true;
  });

  throW.addEventListener("mouseup", (event) => {
    keyboard.E = false;
  });
}
