/**
 * @description 画面のリサイズ
 * @param canvas 
 * @param width 
 * @param height 
 */
export const resize = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
};
