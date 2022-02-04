import P5 from "p5";

export class Sketch {
  private analyzer: AnalyserNode;
  private data: Uint8Array;
  constructor(analyzer: AnalyserNode, data: Uint8Array) {
    this.analyzer = analyzer;
    this.data = data;
  }

  public sketch = (p: P5) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noStroke();
    };

    p.draw = () => {
      p.background(100, 230, 200);

      this.analyzer.getByteTimeDomainData(this.data);
    
      [...Array(this.data.length).keys()].forEach((count) => {
        const value = this.data[count] / 128;
        p.fill("#ffff00");
        p.textSize(value * 32);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("Sound Visualization", p.width * 0.5, p.height * 0.5);
      });
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };
}

/*
export const sketch = (p: P5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  };

  p.draw = () => {
    p.background(0, 0, 0);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};*/
