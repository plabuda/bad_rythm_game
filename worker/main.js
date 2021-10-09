function* colorgen() {
  while (true) {
    yield "gray";
    yield "gray";
    yield "gray";

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

function* cleargen() {
  let i = 0;
  while (i < 20) {
    yield true;
    i++;
  }
  while (true) {
    yield false;
  }
}

const col_iter = colorgen();
const clr_iter = cleargen();

function substep() {
  const pass = clr_iter.next().value;
  const response = {
    cleared: pass,
    color: col_iter.next().value,
    state: pass ? 1 : 2,
  };
  postMessage(response);
}

setInterval(substep, 600);
