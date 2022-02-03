type StartWindow = {
  startWindow: HTMLDivElement;
  startButton: HTMLButtonElement;
};

export const createStartWindow = (gameBody: HTMLElement): StartWindow => {
  const startWindow = document.createElement("div");
  startWindow.className = "startWindow";

  const gameTitle = document.createElement("h1");
  gameTitle.textContent = "節分と豆";

  const gameDescription = document.createElement("p");
  gameDescription.textContent = "豆が落ちないようにただマウスをクリックするだけです。落ちるとGame Overになります。";

  const startButton = document.createElement("button");
  startButton.textContent = "Game Start!!";
  startButton.className = "startButton";

  gameBody.appendChild(startWindow);
  startWindow.appendChild(gameTitle);
  startWindow.appendChild(gameDescription);
  startWindow.appendChild(startButton);

  const start: StartWindow = {
    startWindow: startWindow,
    startButton: startButton,
  };

  return start;
};