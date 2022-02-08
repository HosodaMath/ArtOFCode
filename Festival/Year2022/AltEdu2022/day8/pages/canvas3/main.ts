import P5 from "p5";
import { sketch } from "../../src/sketch/sketch2";
import {
  createFullScreen,
  createAudioController,
} from "../../src/window/window";
import { sketch3 } from "../../src/sketch/sketch3";
const gameBody = document.body;
window.addEventListener("load", () => {
  // createFullScreen(gameBody);
  createAudioController(gameBody);

  new P5(sketch);

  sketch3(gameBody);
});
