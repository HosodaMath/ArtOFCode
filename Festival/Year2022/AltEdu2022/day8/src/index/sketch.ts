import { createFullScreen } from "../window/window";
import { createMessage } from "./message";
import { createSketchShelf } from "./sketchShelf";
import "sanitize.css";
import "../main.css";

const gameBody = document.body;
window.addEventListener("load", () => {
  createFullScreen(gameBody);
  const main = () => {
    const sketch = document.querySelector(".sketch");
    if (!(sketch instanceof HTMLElement)) {
      throw new Error("Error");
    }

    createMessage(sketch);
    createSketchShelf(sketch);
  };

  main();
});
