// import { GeometryParameter } from "./geometryParameter";

export class Trapezoid {
  /**
   * @static
   * @description 色の指定のみ
   * @param color
   * @returns
   */
  static trapezoid(color: number[]) {
    // trapezoidの座標設定
    const verticesData = [
      -1.0, -0.5, 0, 
      -0.5, 0.5, 0.0, 
      0.0, -0.5, 0.0, 
      0.5, 0.5, 0.0, 
      1.0, -0.5, 0.0,
    ];

    // 各頂点ごとに色を設定する
    const colorMax = verticesData.length / 3.0;
    const colorData: number[] = [];
    [...Array(colorMax).keys()].forEach((_count) => {
      colorData.push(color[0], color[1], color[2], color[3]);
    });

    const indicesData = [0, 2, 1, 1, 2, 3, 2, 4, 3];

    return {
      verticesData: verticesData,
      colorData: colorData,
      indicesData: indicesData,
    };
  }

  /**
   * @static
   * @description 各頂点ごとに色の設定済み
   * @returns
   */
  static trapezoidColor() {
    // trapezoidの座標設定
    const verticesData = [
      -1.0, -0.5, 0, -0.5, 0.5, 0.0, 0.0, -0.5, 0.0, 0.5, 0.5, 0.0, 1.0, -0.5,
      0.0,
    ];

    // 各頂点ごとに色を設定する
    const colorData = [
      1.0, 0.0, 0.0, 1.0, 
      0.0, 1.0, 0.0, 1.0, 
      0.0, 0.0, 1.0, 1.0, 
      1.0, 1.0, 0.0, 1.0, 
      1.0, 1.0, 1.0, 1.0,
    ];

    const indicesData = [0, 2, 1, 1, 2, 3, 2, 4, 3];

    return {
      verticesData: verticesData,
      colorData: colorData,
      indicesData: indicesData,
    };
  }
}
