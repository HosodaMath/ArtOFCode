/**
 * 読み込むたびに異なるスケッチブックを表示する。
 */
import { sketch0 } from "./sketch/sketch0";
import { sketch1 } from "./sketch/sketch1";
import { sketch2 } from "./sketch/sketch2";
import { random } from "./mathematics/mathematics";
import { createFullScreen, createStartWindow } from "./window/window";
import "sanitize.css";
import "./style.css";

const gameBody = document.body;
createFullScreen(gameBody);
const startWindow = createStartWindow(gameBody);
startWindow.startButton.addEventListener("click", () => {
  gameBody.removeChild(startWindow.startWindow);
  const sketchData = [0, 1, 2];
  const choice = Math.floor(random(0, sketchData.length));
  if (choice === 0) {
    sketch0();
  } else if (choice === 1) {
    sketch1();
  } else if (choice === 2) {
    sketch2();
  }
});
