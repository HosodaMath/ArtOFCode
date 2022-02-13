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

  const patternTitle = document.createElement("h1");
  patternTitle.textContent = "Color";

  const patternDescription = document.createElement("p");
  patternDescription.textContent =
    "";

  const startButton = document.createElement("button");
  startButton.textContent = "Start!!";
  startButton.className = "startButton";

  gameBody.appendChild(startWindow);
  startWindow.appendChild(patternTitle);
  startWindow.appendChild(patternDescription);
  startWindow.appendChild(startButton);

  const start: StartWindow = {
    startWindow: startWindow,
    startButton: startButton,
  };

  return start;
};
