type StartWindow = {
  startWindow: HTMLDivElement;
  startButton: HTMLButtonElement;
};

/**
 * スタート画面の作成
 * @param gameBody
 * @returns
 */
export const createStartWindow = (gameBody: HTMLElement): StartWindow => {
  const startWindow = document.createElement("div");
  startWindow.className = "startWindow";

  const audioTitle = document.createElement("h1");
  audioTitle.textContent = "Sound Visualization";

  const audioDescription1 = document.createElement("p");
  audioDescription1.textContent = "サウンドビジュアライゼーションです。";

  const audioDescription2 = document.createElement("p");
  audioDescription2.textContent =
    "Audio ControllerのPlayで再生 Stopで停止します。";

  const startButton = document.createElement("button");
  startButton.textContent = "Start!!";
  startButton.className = "startButton";

  gameBody.appendChild(startWindow);
  startWindow.appendChild(audioTitle);
  startWindow.appendChild(audioDescription1);
  startWindow.appendChild(audioDescription2);
  startWindow.appendChild(startButton);

  const start: StartWindow = {
    startWindow: startWindow,
    startButton: startButton,
  };

  return start;
};
