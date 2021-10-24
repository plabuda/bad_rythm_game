const colors = ["red", "green", "blue"];

let game_state = 1; // 0 connected, 1 - playing , 2- game over

const buttons = colors.map((color) => {
  return document.getElementById(color);
});

let touch_counts = buttons.map(() => 0);

const player = document.getElementById("player");

function light_player(index) {
  if (game_state == 1) {
    player.style.backgroundColor = colors[index];
    worker.postMessage(colors[index]);
  }
}

function darken_player(index) {
  if (game_state == 1 && player.style.backgroundColor == colors[index]) {
    player.style.backgroundColor = `dark${colors[index]}`;
  }
}

function add_count(index) {
  touch_counts[index] += 1;
  if (touch_counts[index] > 0) {
    buttons[index].style.backgroundColor = colors[index];
    light_player(index);
  }
}

function sub_count(index) {
  touch_counts[index] -= 1;
  if (touch_counts[index] <= 0) {
    buttons[index].style.backgroundColor = `dark${colors[index]}`;
    darken_player(index);
  }
}

let index = 0;
for (const button of buttons) {
  button.addEventListener("touchstart", () => {
    add_count(index);
  });
  button.addEventListener("touchend", () => {
    sub_count(index);
  });
  index++;
}

var dark = false;

function get_div(color) {
  let element = document.createElement("div");
  element.classList.add("box");
  element.style.animationName = "growing";
  element.style.backgroundColor = color;
  return element;
}

function shrink_div(div) {
  div.style.animationName = "shrinking";
}

function blink_player() {
  let player = document.getElementById("player");
  let color = player.style.backgroundColor;
  player.style.animationName = `${color}-blink`;
}

function blink_div(div) {
  let currentAnim = div.style.animationName;
  let color = div.style.backgroundColor;
  div.style.animationName = `${currentAnim}, ${color}-blink`;
}

function add(color) {
  let backgroundColor = dark ? `dark${color}` : color;
  let div = get_div(backgroundColor);
  dark = !dark;
  let container = document.getElementById("cont");
  container.appendChild(div);
}

function remove() {
  let container = document.getElementById("cont");
  let len = container.childNodes.length;
  if (len > 1) {
    let shrinking = container.childNodes[1];
    shrink_div(shrinking);
    container.removeChild(container.childNodes[0]);
    return shrinking;
  }
}

function clear_next() {
  blink_div(remove());
}

for (let i = 0; i < 7; i++) {
  add("gray");
}

function handle_state_switch(state) {
  game_state = state;
}

function handle_responnse(response) {
  if (response.cleared) {
    clear_next();
  } else {
    remove();
    blink_player();
  }

  if ("color" in response) {
    add(response.color);
  }

  if ("state" in response) {
    handle_state_switch(response.state);
  }

  if ("score" in response) {
    player.innerText = `${response.score}`;
  }
}

function step() {
  const response = {
    cleared: true,
    color: "red",
    state: 1,
  };
  handle_responnse(response);
}

const worker = new Worker("worker.js");
worker.onmessage = (event) => {
  console.log(event.data);
  handle_responnse(event.data);
};
