/**
 * @description fullscreenの機能を追加
 * @param gameBody
 */
export const createFullScreen = (gameBody: HTMLElement) => {
  const button = document.createElement("button");
  button.className = "fullScreenButton";
  button.textContent = "fullScreen";
  gameBody.appendChild(button);

  button.addEventListener("click", () => {
    gameBody.requestFullscreen();
  });
};
