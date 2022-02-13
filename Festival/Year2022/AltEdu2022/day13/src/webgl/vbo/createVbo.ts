export const createVbo = (
  gl: WebGL2RenderingContext,
  array: Float32Array,
  usage: number
) => {
  const vbo = gl.createBuffer();
  if (!vbo) {
    throw new Error("Error");
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, array, usage);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return vbo;
};
