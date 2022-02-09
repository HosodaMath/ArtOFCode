/**
 * オーディオが止まっているときに呼び出す画面
 * @param gameBody 
 */
export const createAudioStopWindow = (gameBody: HTMLElement) => {
  const audioStop = document.createElement("div");
  audioStop.className = "audioStop";

  const audioStopTitle = document.createElement("h3");
  audioStopTitle.textContent = "Audio Stop";

  const audioStopDescription1 = document.createElement("p");
  audioStopDescription1.textContent = "オーディオは再生していません";

  const audioStopDescription2 = document.createElement("p");
  audioStopDescription2.textContent =
    "オーディオを再生するには右上のplayボタンを押してください";

  gameBody.appendChild(audioStop);
  audioStop.appendChild(audioStopTitle);
  audioStop.appendChild(audioStopDescription1);
  audioStop.appendChild(audioStopDescription2);
};
