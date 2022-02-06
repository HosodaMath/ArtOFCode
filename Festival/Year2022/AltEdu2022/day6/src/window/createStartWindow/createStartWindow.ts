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

  const changeTitle = document.createElement("h1");
  changeTitle.textContent = "noise Sound Visualization";

  const changeDescription1 = document.createElement("p");
  changeDescription1.textContent = "誰かのコードを参照しそれを別のものに書き換えてみてください。";

  const changeDescription2 = document.createElement("p");
  changeDescription2.textContent = "@senbakuさんのnoise wavesを改良して作成しました。";

  const changeLink = document.createElement("a");
  changeLink.className = "navigationLink";
  changeLink.textContent = "オリジナルコードはここです。";
  changeLink.href = "https://openprocessing.org/sketch/1469218";

  const licence = document.createElement("strong");
  licence.textContent = "コードのライセンスはCC BY-NC-SA 3.0です。";
  licence.className = "licence";

  const startButton = document.createElement("button");
  startButton.textContent = "Start!!";
  startButton.className = "startButton";

  gameBody.appendChild(startWindow);
  startWindow.appendChild(changeTitle);
  startWindow.appendChild(changeDescription1);
  startWindow.appendChild(changeDescription2);
  startWindow.appendChild(changeLink);
  startWindow.appendChild(licence);
  startWindow.appendChild(startButton);

  const start: StartWindow = {
    startWindow: startWindow,
    startButton: startButton,
  };

  return start;
};

