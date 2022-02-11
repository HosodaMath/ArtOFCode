/**
 *
 * @param gameBody
 */
export const createAudioPlayWindow = (gameBody: HTMLElement) => {
  const audioPlay = document.createElement("div");
  audioPlay.className = "audioPlay";

  const audioPlayTitle = document.createElement("h3");
  audioPlayTitle.textContent = "Audio Play";

  const audioPlayDescription = document.createElement("p");
  audioPlayDescription.textContent = "再生中です。";

  gameBody.appendChild(audioPlay);
  audioPlay.appendChild(audioPlayTitle);
  audioPlay.appendChild(audioPlayDescription);

};
