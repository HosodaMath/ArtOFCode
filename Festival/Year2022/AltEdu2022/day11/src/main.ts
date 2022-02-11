import P5 from "p5";
import { sketch1 } from "./sketch/sketch1";
import { createFullScreen, createStartWindow } from "./window/window";

import "sanitize.css";
import "./style.css";

const gameBody = document.body;
const startSystem = createStartWindow(gameBody);
createFullScreen(gameBody);
startSystem.startButton.addEventListener("click", () => {
  gameBody.removeChild(startSystem.startWindow);
  new P5(sketch1);
});
