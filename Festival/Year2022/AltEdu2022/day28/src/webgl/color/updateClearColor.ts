export const updateClearColor = (
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext,
  color: number[]
) => {
  gl.clearColor(color[0], color[1], color[2], 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, canvas.width, canvas.height);
};
