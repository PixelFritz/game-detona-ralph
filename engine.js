const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        gameVelocity: 800,
        hitPosition: 0,
        result: 0,
        currentTime: 60
    },
    actions: {
        timerId: setInterval(randomSquare, 800),
        countdownTimerId: setInterval(countdown, 1000),
    }
};

function countdown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countdownTimerId);
        alert("Game Over! O seu resultado final foi: " + state.values.result);
    }
}

function playSound() {
    let audio = new Audio("/src/audios/hit.m4a");
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() {
    state.view.square.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;
};

function addListenerHitBox() {
    state.view.square.forEach((square) => {
        square.addEventListener("click", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    })
};

function init() {
    addListenerHitBox();
};

init();