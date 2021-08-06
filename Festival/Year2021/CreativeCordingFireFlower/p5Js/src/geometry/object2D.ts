import * as P5 from "p5";
export class Object2D {
  /**
   * @description 円の描画
   * @param p p5Instance
   * @param radius 半径
   * @param segment　分割数 デフォルト360
   */
  static circle = (p: P5, radius: number, segment: number = 360): void => {
    p.beginShape();
    [...Array(segment).keys()].forEach((theta) => {
      p.vertex(
        radius * Math.cos(p.radians(theta)),
        radius * Math.sin(p.radians(theta))
      );
    });
    p.endShape(p.CLOSE);
  };

  /**
   * @description 三角形の描画
   * @param p p5Instance
   * @param size 大きさ
   * @param segment 分割数 デフォルト3
   */
  static triangle = (p: P5, size: number, segment = 3): void => {
    p.beginShape();
    [...Array(segment).keys()].forEach((theta) => {
      p.vertex(
        size * p.cos(p.radians((360 * theta) / 3)),
        size * p.sin(p.radians((360 * theta) / 3))
      );
    });
    p.endShape(p.CLOSE);
  };

  /**
   * @description ひし形の描画
   * @param p p5Instance
   * @param radius 半径
   * @param segment 分割数 デフォルト4
   */
  static diamond = (p: P5, radius: number, segment = 4): void => {
    p.beginShape();
    [...Array(segment).keys()].forEach((theta) => {
      const size = theta % 2 === 0 ? radius / 2 : radius;
      p.vertex(
        size * p.cos(p.radians(90 * theta)),
        size * p.sin(p.radians(90 * theta))
      );
    });
    p.endShape(p.CLOSE);
  };

  /**
   * @description 多角形の描画
   * @param p p5Instance
   * @param radius 半径
   * @param vertex_num 頂点個数 頂点個数は分割数と同じかそれ以上の個数でなければならない
   * @param segment 分割数 デフォルト 6
   *
   */
  static polygon = (
    p: P5,
    radius: number,
    vertex_num: number,
    segment: number = 6
  ) => {
    p.beginShape();
    [...Array(segment).keys()].forEach((theta): void => {
      p.vertex(
        radius * p.cos(p.radians((360 * theta) / vertex_num)),
        radius * p.sin(p.radians((360 * theta) / vertex_num))
      );
    });
    p.endShape(p.CLOSE);
  };

  /**
   * @description 星の描画
   * @param p p5Instance
   * @param radius 半径
   * @param prickle_num 頂点数(トゲの数) デフォルト 5
   * @param segment 分割数 デフォルト 5
   */
  static star = (
    p: P5,
    radius: number,
    prickle_num: number = 5,
    segment: number = 5
  ) => {
    const vertexNumber = prickle_num * 2;
    const segmentNumber = segment * 2;
    p.beginShape();
    [...Array(segmentNumber).keys()].forEach((theta) => {
      const size = theta % 2 === 0 ? radius / 2.0 : radius;
      p.vertex(
        size * p.cos(p.radians((360 * theta) / vertexNumber)),
        size * p.sin(p.radians((360 * theta) / vertexNumber))
      );
    });
    p.endShape(p.CLOSE);
  };

  /**
   *
   * @param p
   * @param radius
   * @param segment
   */
  static astroidStar = (p: P5, radius: number, segment = 360) => {
    p.beginShape();
    [...Array(segment).keys()].forEach((theta) => {
      p.vertex(
        radius * p.pow(Math.cos(p.radians(theta)), 3),
        radius * 1.4 * p.pow(Math.sin(p.radians(theta)), 3)
      );
    });
    p.endShape(p.CLOSE);
  };

  static heart = (p: P5, size: number, segment = 360) => {
    p.strokeJoin(p.ROUND);
    p.beginShape();
    [...Array(segment).keys()].forEach((theta) => {
      const locationX =
        size *
        (16 *
          p.sin(p.radians(theta)) *
          p.sin(p.radians(theta)) *
          p.sin(p.radians(theta)));
      const locationY =
        -1 *
        size *
        (13 * p.cos(p.radians(theta)) -
          5 *
            p.cos(
              p.radians(2 * theta) -
                2 * p.cos(p.radians(3 * theta)) -
                p.cos(p.radians(4 * theta))
            ));
      p.vertex(locationX, locationY);
    });
    p.endShape(p.CLOSE);
  };
}
