/**
 * オーディオコントローラーの作成
 * @param gameBody 
 */
export const createAudioController = (gameBody: HTMLElement) => {
  const audioController = document.createElement("div");
  audioController.className = "audioController";

  const audioControllerTitle = document.createElement("h3");
  audioControllerTitle.textContent = "Audio Controller";

  const audioPlayButton = document.createElement("button");
  audioPlayButton.textContent = "Play";
  audioPlayButton.className = "audioPlayButton";

  const audioStopButton = document.createElement("button");
  audioStopButton.textContent = "Stop";
  audioStopButton.className = "audioStopButton";

  const audioGainPlusButton = document.createElement("button");
  audioGainPlusButton.textContent = "+";
  audioGainPlusButton.className = "audioGainPlusButton";

  const audioGainMinusButton = document.createElement("button");
  audioGainMinusButton.textContent = "-";
  audioGainMinusButton.className = "audioGainMinusButton";

  gameBody.appendChild(audioController);
  audioController.appendChild(audioControllerTitle);
  audioController.appendChild(audioPlayButton);
  audioController.appendChild(audioStopButton);
  audioController.appendChild(audioGainPlusButton);
  audioController.appendChild(audioGainMinusButton);
};
