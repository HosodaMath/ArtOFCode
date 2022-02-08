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

  const animationTitle = document.createElement("h1");
  animationTitle.textContent = "Animation";

  const animationDescription1 = document.createElement("p");
  animationDescription1.textContent =
    "全画面でアニメーションするコードを書いてみてください。完成したらしばらく表示してみてください。";

  const licence = document.createElement("strong");
  licence.textContent = "コードのライセンスはCC BY-NC-SA 3.0です。";
  licence.className = "licence";

  const startButton = document.createElement("button");
  startButton.textContent = "Start!!";
  startButton.className = "startButton";

  gameBody.appendChild(startWindow);
  startWindow.appendChild(animationTitle);
  startWindow.appendChild(animationDescription1);
  startWindow.appendChild(licence);
  startWindow.appendChild(startButton);

  const start: StartWindow = {
    startWindow: startWindow,
    startButton: startButton,
  };

  return start;
};
