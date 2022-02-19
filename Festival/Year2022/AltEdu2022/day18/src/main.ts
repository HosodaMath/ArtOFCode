import { createFullScreen, createStartWindow } from "./window/window";
import { loadSVG } from "./load/loadSVG";
import KeyboradData from "./assets/keyboardPlane.svg";
import "sanitize.css";
import "./style.css";
const gameBody = document.body;
const startButton = createStartWindow(gameBody);
createFullScreen(gameBody);
startButton.startButton.addEventListener("click", () => {
  gameBody.removeChild(startButton.startWindow);
  
  // シンセサイザー・キーボードのデーターを読み込み
  loadSVG(KeyboradData).then((svgCode) => {
    const keyBorad = document.querySelector(".keyBoard");
    if (!(keyBorad instanceof HTMLElement)) {
      throw new Error("Error");
    }
    
    //  keyBoradイラストを挿入する
    keyBorad.innerHTML = svgCode;
    
    // HTMLCanvasElementとWebGL2RenderingContextは事前に作成
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
  
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      throw new Error("Error!! Does not support WebGL2");
    }

    // ここで動的importしないと例外処理でエラーになる
    // ここが作る上での最大の難所とも言える場所
    import("./sound/audio").then((audio) => {
      let clickedkey: number;

      const oscType: OscillatorType[] = [
        "triangle",
        "sine",
        "sawtooth",
        "square",
      ];
      [...Array(audio.keyData.length).keys()].forEach((count) => {
        audio.keyData[count].element.addEventListener("mousedown", () => {
          audio.KeyboradOscillator.playKey(count, oscType[2], canvas, gl);
          clickedkey = count;
        });
      });

      document.addEventListener("mouseup", () => {
        audio.KeyboradOscillator.stopKey(clickedkey);
      });
    });
  });
});
