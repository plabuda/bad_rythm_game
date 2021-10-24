let worker_colors = [];
let player_color = "gray";
let worker_game_state = 1;
let score = 0;

function* colorgen() {
  while (true) {
    yield "red";
    yield "red";
    yield "gray";

    yield "green";
    yield "red";
    yield "blue";

    yield "green";
    yield "green";
    yield "gray";
  }
}

let color_push_props = {
  table: ["gray", "gray", "gray", "gray", "gray", "gray"],
  counter: 1 - 1,
};

function color_push(color) {
  const response = color_push_props.table[color_push_props.counter];
  color_push_props.table[color_push_props.counter] = color;
  color_push_props.counter += 1;
  color_push_props.counter %= 6;
  return response;
}

const col_iter = colorgen();

function step_game() {
  const new_color = col_iter.next().value;
  const current_color = color_push(new_color);
  console.log("New Color is " + new_color);
  console.log("Current Color is " + current_color);
  console.log("Player Color is " + player_color);
  const pass =
    worker_game_state == 1 &&
    (current_color == "gray" || current_color == player_color);
  if (pass && current_color != "gray") {
    score += 1;
  }
  worker_game_state = pass ? 1 : 2;
  let response = {
    cleared: pass,
    color: new_color,
    state: worker_game_state,
  };
  if (!pass) {
    response["score"] = score;
  }
  return response;
}

function substep() {
  postMessage(step_game());
}

self.onmessage = (e) => {
  if (worker_game_state == 1) {
    player_color = e.data;
  }
};

setInterval(substep, 600);
