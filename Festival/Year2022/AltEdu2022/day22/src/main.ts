import "sanitize.css";
import "./style.css";
import { sketch } from "./sketch/sketch";
import { createFullScreen } from "./window/window";
const gameBody = document.body;
createFullScreen(gameBody);
window.addEventListener("DOMContentLoaded", () => {
  sketch();
});
