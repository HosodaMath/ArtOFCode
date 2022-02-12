import P5 from "p5";
import FrequencyVertexShader from "../shader/frequency/frequency.vert?raw";
import FrequencyFragmentShader from "../shader/frequency/frequency.frag?raw";
export const sketch = (
  analyzer: AnalyserNode,
  timeDomainArray: Float32Array,
  frequencyArray: Float32Array
) => {
  const canvas = (p: P5) => {
    let mainShader: P5.Shader;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.noStroke();
      p.pixelDensity(1);

      mainShader = p.createShader(
        FrequencyVertexShader,
        FrequencyFragmentShader
      );
    };

    p.draw = () => {
      p.background(0, 0, 0);
      
      analyzer.getFloatTimeDomainData(timeDomainArray);
      // console.log(timeDomainArray.length);

      analyzer.getFloatFrequencyData(frequencyArray);
      // console.log(frequencyArray.length);
      // console.log(analyzer.minDecibels);
      // console.log(analyzer.maxDecibels);

      const uFrameCount = p.frameCount * 0.05;
      const uTime = uFrameCount * 0.5;
      p.push();
      p.translate(0, 0, 0);
      p.rotateX(uFrameCount * 0.05);
      p.rotateY(uFrameCount * 0.05);
      p.shader(mainShader);
      mainShader.setUniform("uFrameCount", uFrameCount);
      mainShader.setUniform("uResolution", [p.width, p.height]);
      mainShader.setUniform("uTime", uTime);
      p.sphere(p.width * 0.1, 200, 200);
      p.resetShader();
      p.pop();
    
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  new P5(canvas);
};
