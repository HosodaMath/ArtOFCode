import P5 from "p5";
import { Movers } from "./Movers"
import { createStartWindow, createFullScreen } from "./window/window"
import "sanitize.css";
import "./style.css";

// gameBodyは一貫して変えない
const gameBody = document.body;
const startSystem = createStartWindow(gameBody);
createFullScreen(gameBody);

startSystem.startButton.addEventListener("click", () => {
  gameBody.removeChild(startSystem.startWindow);  

  const sketch = (p: P5) => {
    let movers: Movers;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.noStroke();
      p.pixelDensity(1);

      movers = new Movers(p);
    };

    p.draw = () => {
      p.background(0, 0, 0);

      movers.update();
      movers.draw();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  new P5(sketch);
});
