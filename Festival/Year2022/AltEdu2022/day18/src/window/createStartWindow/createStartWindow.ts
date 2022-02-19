type StartWindow = {
  startWindow: HTMLDivElement;
  startButton: HTMLButtonElement;
};

/**
 * スタート画面の作成
 * @param gameBody
 * @returns
 */
export const createStartWindow = (
  gameBody: HTMLElement | HTMLDivElement
): StartWindow => {
  const startWindow = document.createElement("div");
  startWindow.className = "startWindow";

  const synthTitle = document.createElement("h1");
  synthTitle.textContent = "シンセサイザー・キーボード";

  const synthDescription1 = document.createElement("p");
  synthDescription1.textContent = `今回はSVGでかんたんなシンセサイザー・キーボードとWeb Audio APIを用いて音の出力そしてWebGL2を使い波形表示を行います。`;

  const synthDescription2 = document.createElement("p");

  synthDescription2.textContent = `波形表示を行うには白鍵盤もしくは黒鍵盤のどちらかを押してください。`;

  const startButton = document.createElement("button");
  startButton.textContent = "Start!!";
  startButton.className = "startButton";

  gameBody.appendChild(startWindow);
  startWindow.appendChild(synthTitle);
  startWindow.appendChild(synthDescription1);
  startWindow.appendChild(synthDescription2);
  startWindow.appendChild(startButton);

  const start: StartWindow = {
    startWindow: startWindow,
    startButton: startButton,
  };

  return start;
};
