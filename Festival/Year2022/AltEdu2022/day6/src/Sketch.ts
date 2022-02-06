import P5 from "p5";

export class Sketch {
  private analyzer: AnalyserNode;
  private data: Uint8Array;
  constructor(analyzer: AnalyserNode, data: Uint8Array) {
    this.analyzer = analyzer;
    this.data = data;
  }

  public sketch = (p: P5) => {
    let t = 0.0;
    let value = 0.005;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.pixelDensity(1);
      p.noStroke();
      p.smooth();
      p.background(p.color("#000000"));
    };

    p.draw = () => {
      p.randomSeed(1);
      p.push();
      p.translate(p.width * 0.5, p.height * 0.5);
      let posY = p.height * 0.5 + p.random(0, 10);
      
      this.analyzer.getByteTimeDomainData(this.data);
      p.beginShape();
      const loopStart = 0;
      const loopMax = this.data.length;
      for (let posX = loopStart; posX < loopMax; posX += 2) {
        const value = this.data[posX] / 128;
        const r = value * 100;
        const g = 200;
        const b = 230;
        const noise = 100 * p.noise(posX * 0.001, posY * 0.001, t);
        const size =  2;
        p.fill(r, g, b);
        p.ellipse(posX, posY, size, size);

        while (p.frameCount < 250) {
          posX += p.cos(noise) * 3;
          posY += p.sin(noise) * 5;
          break;
        }
      }
      p.endShape();
      t += value;
      p.pop();
    };

    
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };
}
