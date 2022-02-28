/*
const createVbo = (gl: WebGL2RenderingContext) => {
  const squareVBO = gl.createBuffer();
  if (!squareVBO) {
    throw new Error("VBOの作成に失敗しました。");
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVBO);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(verticesData),
    gl.STATIC_DRAW
  );

  const squareIBO = gl.createBuffer();
  if (!squareIBO) {
    throw new Error("IBOの作成に失敗しました。");
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIBO);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indicesData),
    gl.STATIC_DRAW
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  gl.bindBuffer(gl.ARRAY_BUFFER, squareVBO);
  const index = attributeLocationIndex[0];
  const size = attributeSize[0];
  const type = gl.FLOAT;
  const normalized = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
  gl.enableVertexAttribArray(index);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIBO);

  const drawMode = gl.TRIANGLES;
  const drawCount = indicesData.length;
  const drawType = gl.UNSIGNED_SHORT;
  const drawOffset = 0;
  gl.drawElements(drawMode, drawCount, drawType, drawOffset);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};*/
