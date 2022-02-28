export type vaoParameter = {
  attributeLocationIndex: number[];
  attributeSize: number[];
  verticesData: number[][];
  indicesData: number[];
};

type VAO = {
  vao: WebGLVertexArrayObject;
  ibo: WebGLBuffer;
};

/**
 *
 * @param gl
 * @param vaoData
 */
export const createVAO = (
  gl: WebGL2RenderingContext,
  vaoData: vaoParameter
) => {
  // VertexArrayObjectの作成
  const vertexArrayObject = gl.createVertexArray();
  if (!vertexArrayObject) {
    throw new Error("VertexArrayObjectの作成に失敗しました。");
  }
  gl.bindVertexArray(vertexArrayObject);

  const loopMax = vaoData.verticesData.length;
  // vbo相当？ 型付浮動小数点
  [...Array(loopMax).keys()].forEach((count) => {
    const vaoBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vaoBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vaoData.verticesData[count]),
      gl.STATIC_DRAW
    );

    const index = vaoData.attributeLocationIndex[count];
    const size = vaoData.attributeSize[count];
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    // console.log(index, size);
    gl.enableVertexAttribArray(index);
    gl.vertexAttribPointer(index, size, type, normalize, stride, offset);
  });

  // IBOに相当？ 型付整数
  // Index Bufferの作成
  const indexBufferObject = gl.createBuffer();
  if (!indexBufferObject) {
    throw new Error("Error!! IndexBufferの作成に失敗しました。");
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(vaoData.indicesData),
    gl.STATIC_DRAW
  );

  // メモリの開放
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  const data: VAO = { vao: vertexArrayObject, ibo: indexBufferObject };

  return data;
};
