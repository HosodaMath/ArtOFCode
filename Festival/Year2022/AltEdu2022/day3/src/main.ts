/**
 * AltEdu2022
 * Day3
 * 節分と豆
 */
import P5 from "p5";
import { createBackgroundPicture } from "./stage/backgroundPicture";
import { Stage } from "./stage/Stage";
import { createGameOverWindow } from "./window/gameOverWindow";
import { createStartWindow } from "./window/startWindow";
import { createFullScreen } from "./window/fullScreen";

import "sanitize.css";
import "./style.css";

const gameBody = document.body;

const startSystem = createStartWindow(gameBody);

createFullScreen(gameBody);

startSystem.startButton.addEventListener("click", () => {
  gameBody.removeChild(startSystem.startWindow);

  let backgroundPicture: P5.Graphics;
  let stage: Stage;
  const sketch = (p: P5) => {
    const init = () => {
      stage = new Stage(p);
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noStroke();

      init();

      backgroundPicture = createBackgroundPicture(p, p.width, p.height);
    };

    p.draw = () => {
      p.background(0, 0, 0);
      p.push();
      p.translate(0, 0, 0);
      p.image(backgroundPicture, 0, 0);
      p.pop();

      stage.stageUpdate();
      stage.stageRender();

      if (stage.gameState === "gameOver") {
        createGameOverWindow(gameBody);
        p.noLoop();
      } 

      console.log(stage.gameState);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      backgroundPicture = createBackgroundPicture(p, p.width, p.height);
    };

    p.mousePressed = () => {
      switch (stage.gameState) {
        case "play":
          stage.characterControl1();
          break;
        case "gameOver":
          // Game Over Windowを削除
          const gameOver = document.querySelector(".gameOverWindow");
          if(!(gameOver instanceof HTMLDivElement)){
            throw new Error("Error");
          }
          gameBody.removeChild(gameOver);
          init();
          p.loop();
          break;
      }
    };
  };

  new P5(sketch);
});
