import { createFullScreen } from "./window/window";
import "sanitize.css";
import "./main.css";

const gameBody = document.body;

window.addEventListener("load", () => {
  createFullScreen(gameBody);
  console.log("Hello World");
});
