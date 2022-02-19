/**
 * 
 * @param gl 
 * @param program 
 * @param names 
 * @returns 
 */
export const getUniformLocation = (
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  names: string[]
) => {
  const uniformLocationData: WebGLUniformLocation[] = [];
  [...Array(names.length).keys()].forEach((count) => {
    const uniformLocaiton = gl.getUniformLocation(program, names[count]);
    if (!uniformLocaiton) {
      throw new Error("Error!! uniformLocaitonの作成に失敗しました。");
    }
    uniformLocationData.push(uniformLocaiton);
  });

  return uniformLocationData;
};
