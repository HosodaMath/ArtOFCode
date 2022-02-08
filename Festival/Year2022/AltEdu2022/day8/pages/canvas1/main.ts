import P5 from "p5";
import { sketch } from "../../src/sketch/sketch1";
import { createFullScreen } from "../../src/window/window";

const gameBody = document.body;
createFullScreen(gameBody);
window.addEventListener("load", () => {

  new P5(sketch);
});
