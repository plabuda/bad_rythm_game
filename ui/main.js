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
    blink_div(shrinking);
    container.removeChild(container.childNodes[0]);
  }
}

function step() {
  add("red");
  remove();
}
