/**
 * @description fullscreenの機能を追加
 * @param element 
 */
export const fullScreen = (element: HTMLElement) => {
  const button = document.createElement("button");
  button.className = "fullScreenButton";
  element.appendChild(button);

  button.addEventListener("click", () => {
    element.requestFullscreen();
  })
}