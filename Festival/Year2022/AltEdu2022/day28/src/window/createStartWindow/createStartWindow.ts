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

  const sphereTitle = document.createElement("h1");
  sphereTitle.textContent = "3D Application";

  const sphereDescription = document.createElement("p");
  sphereDescription.textContent = "100年後これが発掘されたら今の技術とどう違うんだろうか？";

  const startButton = document.createElement("button");
  startButton.textContent = "Start!!";
  startButton.className = "startButton";

  gameBody.appendChild(startWindow);
  startWindow.appendChild(sphereTitle);
  startWindow.appendChild(sphereDescription);
  startWindow.appendChild(startButton);

  const start: StartWindow = {
    startWindow: startWindow,
    startButton: startButton,
  };

  return start;
};
