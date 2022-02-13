import P5 from "p5";
import FrequencyVertexShader from "../shader/frequency/frequency.vert?raw";
import FrequencyFragmentShader from "../shader/frequency/frequency.frag?raw";
import NoiseImage from "../assets/noise.png";
export const sketch = (analyzer: AnalyserNode, frequencyData: Uint8Array) => {
  const canvas = (p: P5) => {
    let mainShader: P5.Shader;
    let textureImage: P5.Image;
    p.preload = () => {
      textureImage = p.loadImage(NoiseImage);
    };
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

      analyzer.getByteTimeDomainData(frequencyData);


      const uFrameCount = p.frameCount * 0.05;
      const uTime = uFrameCount * 0.5;

      const min = 0;
      const max = frequencyData.length;
      const choice = p.floor(p.random(min, max));
      const uFrequencyData = frequencyData[choice] / 128; 
      p.push();
      p.translate(0, 0, 0);
      p.rotateX(uFrameCount * 0.05);
      p.rotateY(uFrameCount * 0.05);
      p.shader(mainShader);
      mainShader.setUniform("uFrameCount", uFrameCount);
      mainShader.setUniform("uFrequencyData", uFrequencyData)
      mainShader.setUniform("uResolution", [p.width, p.height]);
      mainShader.setUniform("uTime", uTime);
      mainShader.setUniform("uTexture", textureImage);
      p.sphere(uFrequencyData * p.width * 0.2, 100, 100);
      p.resetShader();
      p.pop();
    
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  new P5(canvas);
};
