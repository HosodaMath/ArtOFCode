/**
 *
 * @param gl
 * @param type
 * @param source
 * @returns
 */
export const createShader = (
  gl: WebGL2RenderingContext,
  type: "VERTEX_SHADER" | "FRAGMENT_SHADER",
  source: string
) => {
  const shader = gl.createShader(gl[type]);
  if (!shader) {
    throw new Error("WebGLShaderの作成中エラーが起きました。強制終了します。");
  }

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`${gl.getShaderInfoLog(shader)} ${source}`);
  }

  return shader;
};
