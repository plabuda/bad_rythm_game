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

const iterator = colorgen();

function substep() {
  postMessage(iterator.next().value);
}

setInterval(substep, 600);
