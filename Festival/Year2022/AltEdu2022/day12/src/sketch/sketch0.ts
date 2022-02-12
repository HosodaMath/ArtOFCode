/**
 * マイク入力でのビジュアライゼーション
 */
import {
  createShader,
  createProgram,
  getUniformLocation,
  createVbo,
} from "../webgl/webgl";
import LineVertexShader from "../shader/sample/sample.vert?raw";
import LineFragmentShader from "../shader/sample/sample.frag?raw";
export const sketch0 = async () => {
  const audioContext = new AudioContext();
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const input = audioContext.createMediaStreamSource(stream);
  const analyzer = audioContext.createAnalyser();
  input.connect(analyzer);

  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const gl = canvas.getContext("webgl2");
  if (!gl) {
    throw new Error("WebGL2はサポートしていません。");
  }

  const vertexShader = createShader(gl, "VERTEX_SHADER", LineVertexShader);
  const fragmentShader = createShader(
    gl,
    "FRAGMENT_SHADER",
    LineFragmentShader
  );

  const program = createProgram(gl, vertexShader, fragmentShader);

  const uniformLocationData = getUniformLocation(gl, program, [
    "u_length",
    "u_minValue",
    "u_maxValue",
    "u_color",
  ]);

  const timeDomainArray = new Float32Array(analyzer.fftSize);
  const frequencyArray = new Float32Array(analyzer.frequencyBinCount);
  const timeDomainVbo = createVbo(gl, timeDomainArray, gl.DYNAMIC_DRAW);
  const frequencyVbo = createVbo(gl, frequencyArray, gl.DYNAMIC_DRAW);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  const draw = () => {
    gl.clear(gl.COLOR_BUFFER_BIT);

    analyzer.getFloatTimeDomainData(timeDomainArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, timeDomainVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, timeDomainArray);

    // gl.useProgram(program);
    gl.uniform1f(uniformLocationData[0], timeDomainArray.length);
    gl.uniform1f(uniformLocationData[1], -1.0);
    gl.uniform1f(uniformLocationData[2], 1.0);
    gl.uniform3f(uniformLocationData[4], 1.0, 0.0, 0.0);
    gl.bindBuffer(gl.ARRAY_BUFFER, timeDomainVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.LINE_STRIP, 0, timeDomainArray.length);

    analyzer.getFloatFrequencyData(frequencyArray)
    gl.bindBuffer(gl.ARRAY_BUFFER, frequencyVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, frequencyArray);
    gl.uniform1f(uniformLocationData[0], frequencyArray.length);
    gl.uniform1f(uniformLocationData[1], analyzer.minDecibels);
    gl.uniform1f(uniformLocationData[2], analyzer.maxDecibels);
    gl.uniform3f(uniformLocationData[4], 0.0, 0.0, 1.0);
    gl.bindBuffer(gl.ARRAY_BUFFER, frequencyVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.LINE_STRIP, 0, frequencyArray.length);
    
    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(draw);
  });

  requestAnimationFrame(draw);
};
