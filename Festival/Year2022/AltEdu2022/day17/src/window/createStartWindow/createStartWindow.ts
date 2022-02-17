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

  const sketchTitle = document.createElement("h1");
  sketchTitle.textContent = "Three Sketch";

  const sketchDescription = document.createElement("p");
  sketchDescription.textContent =
    "異なるスケッチが3つありロードするたびにランダム生成されます。";

  const startButton = document.createElement("button");
  startButton.textContent = "Start!!";
  startButton.className = "startButton";

  gameBody.appendChild(startWindow);
  startWindow.appendChild(sketchTitle);
  startWindow.appendChild(sketchDescription);
  startWindow.appendChild(startButton);

  const start: StartWindow = {
    startWindow: startWindow,
    startButton: startButton,
  };

  return start;
};
