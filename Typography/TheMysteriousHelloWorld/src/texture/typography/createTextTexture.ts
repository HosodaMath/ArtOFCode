import P5 from "p5";
/**
 *
 */
export class CreateTextTexture {
  private canvasTexture: P5.Graphics;
  private message: string;
  /**
   *
   * @param canvasTexture
   * @param drawingTextFont
   * @param message
   */
  constructor(canvasTexture: P5.Graphics, message: string) {
    this.canvasTexture = canvasTexture;
    this.message = message;
  }

  createTextTexture = (frameCount: number): void => {
    this.canvasTexture.noStroke();
    this.canvasTexture.background("rgba(200, 200, 100, 1.0)");
    this.canvasTexture.push();
    this.canvasTexture.translate(0, 0, 0);
    this.canvasTexture.scale(0.25);
    this.canvasTexture.fill(200, 240, 240);
    [...Array(this.message.length).keys()].forEach((count) => {
      this.canvasTexture.push();
      this.canvasTexture.translate(
        -this.canvasTexture.width / 1.0 + count * 180,
        this.canvasTexture.sin(count + frameCount * 0.05) * 50,
        100
      );
      this.canvasTexture.text(this.message[count], 0, 0);
      this.canvasTexture.pop();
    });
    this.canvasTexture.pop();
  };
}
