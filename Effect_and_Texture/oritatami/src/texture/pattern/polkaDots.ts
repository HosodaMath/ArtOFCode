import P5 from "p5";
export class PolkaDots {
  private polkaDotsTexture: P5.Graphics;
  constructor(polkaDotsTexture: P5.Graphics) {
    this.polkaDotsTexture = polkaDotsTexture;
  }

  /**
   *
   * @param fillColor
   * @param strokeColor
   * @param strokeWidth
   */
  drawPolkaDotsColor = (fillColor: P5.Color) => {
    this.polkaDotsTexture.background(
      this.polkaDotsTexture.color("rgba(200, 200, 100, 1.0)")
    );
    this.polkaDotsTexture.noStroke();
    this.polkaDotsTexture.push();
    this.polkaDotsTexture.fill(fillColor);
    [...Array(15).keys()].forEach((countX) => {
      [...Array(15).keys()].forEach((countY) => {
        this.polkaDotsTexture.push();
        this.polkaDotsTexture.translate(countX * 100, countY * 100);
        this.polkaDotsTexture.circle(0, 0, 100);
        this.polkaDotsTexture.pop();
      });
    });
    this.polkaDotsTexture.pop();
  };
}
