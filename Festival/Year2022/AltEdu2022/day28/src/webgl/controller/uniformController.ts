import { InputRangeType, getInputValue } from "../../controller/controller";

/**
 * @description WebGL専用カスタマイズコントローラー
 * @param gl
 */
export const getUniformValue = (
  gl: WebGL2RenderingContext,
  uniformLocationData: WebGLUniformLocation[]
) => {
  const uFrequencyInputRangeValue: InputRangeType = {
    type: "range",
    min: "0",
    max: "20",
    defaultValue: "0",
    step: "0.01",
  };

  const uAmplitudeInputRangeValue: InputRangeType = {
    type: "range",
    min: "0",
    max: "0.1",
    defaultValue: "0.0",
    step: "0.01",
  };

  const uFrequency = getInputValue(
    uFrequencyInputRangeValue,
    "form .uFrequency"
  );
  const uAmplitude = getInputValue(
    uAmplitudeInputRangeValue,
    "form .uAmplitude"
  );

  const uFrequencyValue = document.querySelector(".uFrequencyValue");
  if(!(uFrequencyValue instanceof HTMLDivElement)){
    throw new Error("Error!! Not HTMLDivElement");
  }

  uFrequencyValue.textContent = `${uFrequency.value}`;

  uFrequency.addEventListener("change", () => {
    gl.uniform1f(uniformLocationData[7], Number(uFrequency.value));
    uFrequencyValue.textContent = `${uFrequency.value}`;
  });

  const uAmplitudeValue = document.querySelector(".uAmplitudeValue");
  if(!(uAmplitudeValue instanceof HTMLDivElement)){
    throw new Error("Error!! Not HTMLDivElement");
  }

  uAmplitudeValue.textContent = `${uAmplitude.value}`;

  uAmplitude.addEventListener("change", () => {
    gl.uniform1f(uniformLocationData[8], Number(uAmplitude.value));
    uAmplitudeValue.textContent = `${uAmplitude.value}`;
  });
};
