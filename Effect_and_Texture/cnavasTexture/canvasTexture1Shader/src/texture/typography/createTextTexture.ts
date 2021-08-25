import P5 from "p5";
/**
 *
 */
export class createTextTexture {
  private p: P5;
  private canvasTexture: P5.Graphics;
  private drawingTextFont: P5.Font;
  private message: string;
  /**
   *
   * @param canvasTexture
   * @param drawingTextFont
   * @param message
   */
  constructor(
    p: P5,
    canvasTexture: P5.Graphics,
    drawingTextFont: P5.Font,
    message: string
  ) {
    this.p = p;
    this.canvasTexture = canvasTexture;
    this.drawingTextFont = drawingTextFont;
    this.message = message;
  }

  createTextTexture1 = (): void => {
    this.canvasTexture.noStroke();
    this.canvasTexture.background(200, 200, 100);
    this.canvasTexture.textFont(this.drawingTextFont);
    this.canvasTexture.textSize(this.canvasTexture.width * 0.5);
    this.canvasTexture.textAlign(
      this.canvasTexture.CENTER,
      this.canvasTexture.CENTER
    );
    this.canvasTexture.push();
    this.canvasTexture.translate(0, 0, 0);
    this.canvasTexture.scale(0.25);
    this.canvasTexture.fill(100, 200, 100);
    this.canvasTexture.text(this.message, 0, 0);
    this.canvasTexture.pop();
  };

  createTextTexture2 = (frameCount: number): void => {
    this.p.push();
    this.canvasTexture.noStroke();
    this.canvasTexture.background("rgba(200, 200, 100, 1.0)");
    this.canvasTexture.textFont(this.drawingTextFont);
    this.canvasTexture.textSize(this.canvasTexture.width * 0.5);
    this.canvasTexture.textAlign(
      this.canvasTexture.CENTER,
      this.canvasTexture.CENTER
    );
    this.canvasTexture.push();
    this.canvasTexture.translate(0, 0, 0);
    this.canvasTexture.scale(0.25);
    this.canvasTexture.fill(100, 200, 100);
    [...Array(this.message.length).keys()].forEach((count) => {
      this.canvasTexture.push();
      this.canvasTexture.translate(
        -this.canvasTexture.width / 2.0 + count * 150,
        this.canvasTexture.sin(count + frameCount * 0.05) * 50,
        100
      );
      this.canvasTexture.text(this.message[count], 0, 0);
      this.canvasTexture.pop();
    });
    this.canvasTexture.pop();
    this.p.pop();

    this.p.push();
    this.p.translate(0, 0, 200);
    this.p.image(this.canvasTexture, 0, 0);
    this.p.pop();
  };
}
