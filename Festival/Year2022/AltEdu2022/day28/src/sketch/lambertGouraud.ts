import {
  createVAO,
  vaoParameter,
  createProgram,
  createShader,
  getUniformLocation,
  updateClearColor,
  Sphere,
} from "../webgl/webgl";
import { getUniformValue } from "../webgl/controller/uniformController";
import { Matrix4, Vector3, Vector4, Calculator } from "../math/mathematics";
import LambertGouraudVertexShader from "../shader/lighting/lambert_gouraud_frequency.vert";
import LambertGouraudFragmentShader from "../shader/lighting/lambert_gouraud_frequency.frag";
export const lambertGouraudSketch = (
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext
) => {
  // WebGLShaderの作成
  const vertexShader = createShader(
    gl,
    "VERTEX_SHADER",
    LambertGouraudVertexShader
  );
  const fragmentShader = createShader(
    gl,
    "FRAGMENT_SHADER",
    LambertGouraudFragmentShader
  );

  // WebGLProgramの作成
  const program = createProgram(gl, vertexShader, fragmentShader);

  const attributeLocationIndex = [
    gl.getAttribLocation(program, "aPosition"),
    gl.getAttribLocation(program, "aNormal"),
    gl.getAttribLocation(program, "aTexCoord"),
  ];

  const sphereData = Sphere.sphereColor(128, 128, 0.5);
  const attributeSize = [3, 3, 2];
  // const sphereColor = sphereData.color;
  const sphereVertices = sphereData.vertices;
  const sphereNormal = sphereData.normal;
  const spehreTextureCoord = sphereData.textureCoord;
  const sphereIndices = sphereData.indices;

  // vao作成に必要なオブジェクト
  const vaoData: vaoParameter = {
    attributeLocationIndex: attributeLocationIndex,
    attributeSize: attributeSize,
    verticesData: [sphereVertices, sphereNormal, spehreTextureCoord],
    indicesData: sphereIndices,
  };

  const initVao = createVAO(gl, vaoData);
  const sphereVao = initVao.vao;
  const sphereIbo = initVao.ibo;

  const uniformLocationData = getUniformLocation(gl, program, [
    "uModelViewMatrix",
    "uProjectionMatrix",
    "uNormalMartix",
    "uLightDirection",
    "uLightDiffuse",
    "uMaterialDiffuse",
    "uFrameCount",
    "uFrequency",
    "uAmplitude",
  ]);

  const uModelViewMatrix = Matrix4.identity(Matrix4.init());
  const uProjectionMatrix = Matrix4.identity(Matrix4.init());
  const uNormalMartix = Matrix4.identity(Matrix4.init());

  const uLightDirection = Vector3.set(0.2, -0.7, -1.0);
  const uLightDiffuse = Vector3.set(1.0, 1.0, 1.0);
  const uMaterialDiffuse = Vector3.set(0.2, 0.8, 0.8);

  /**
   * ライティングとマテリアルの設定
   */
  const setLightMaterial = () => {
    gl.uniform3fv(uniformLocationData[3], uLightDirection);
    gl.uniform3fv(uniformLocationData[4], uLightDiffuse);
    gl.uniform3fv(uniformLocationData[5], uMaterialDiffuse);
  };

  const setControls = () => {
    getUniformValue(gl, uniformLocationData);
  };

  let startTime = Date.now();
  const draw = () => {
    updateClearColor(canvas, gl, [0.0, 0.0, 0.0]);

    // 一応これがカメラ？
    // 射影行列に透視投影変換を行う
    // requestAnimationFrameの中に書かないと比がおかしくなる
    const fieldOfView = 90.0;
    const aspect = canvas.width / canvas.height;
    const near = 0.1;
    const far = 100;
    Matrix4.perspective(fieldOfView, aspect, near, far, uProjectionMatrix);

    Matrix4.identity(uModelViewMatrix);

    const uTime = (Date.now() - startTime) * 0.025;
    const radian = Calculator.radians(uTime);
    const position = Vector3.set(0, 0, -1.5);
    Matrix4.translate(uModelViewMatrix, position, uModelViewMatrix);

    /*
    const axis = Vector3.set(0.0, 1.0, 0.0);
    Matrix4.rotate(uModelViewMatrix, radian, axis, uModelViewMatrix);
    */

    Matrix4.copy(uModelViewMatrix, uNormalMartix);
    // 逆行列
    Matrix4.invert(uNormalMartix, uNormalMartix);
    Matrix4.transpose(uNormalMartix, uNormalMartix);

    gl.uniformMatrix4fv(uniformLocationData[0], false, uModelViewMatrix);
    gl.uniformMatrix4fv(uniformLocationData[1], false, uProjectionMatrix);
    gl.uniformMatrix4fv(uniformLocationData[2], false, uNormalMartix);

    // sphereをぐにゃぐにゃする
    const uFrameCount = uTime;
    gl.uniform1f(uniformLocationData[6], uFrameCount);
    
    // uniformControllerに移動しました
    /*
    gl.uniform1f(uniformLocationData[7], uFrequency);
    gl.uniform1f(uniformLocationData[8], uAmplitude);
    */
  
    gl.bindVertexArray(sphereVao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIbo);
    // const sphereMode = gl.LINE_LOOP;
    const sphereMode = gl.TRIANGLES;
    const sphereCount = sphereIndices.length;
    const sphereType = gl.UNSIGNED_SHORT;
    const sphereOffset = 0;
    gl.drawElements(sphereMode, sphereCount, sphereType, sphereOffset);

    // バインドの解除 -> 使ったあとはお片付け
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(draw);
  });

  setControls();
  setLightMaterial();
  requestAnimationFrame(draw);
};
