var dark = false;

function get_div(is_dark) {
  let element = document.createElement("div");
  element.classList.add("box");
  element.classList.add("grow-box");
  element.style.backgroundColor = is_dark ? "darkmagenta" : "darkorchid";
  return element;
}

function add() {
  let div = get_div(dark);
  dark = !dark;
  let container = document.getElementById("cont");
  container.appendChild(div);
}

function remove() {
  let container = document.getElementById("cont");
  let len = container.childNodes.length;
  if (len > 1) {
    let shrinking = container.childNodes[1];
    shrinking.classList.remove("grow-box");
    shrinking.classList.add("shrink-box");
    container.removeChild(container.childNodes[0]);
  }
}

function step() {
  add();
  remove();
}
