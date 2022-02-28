export class Triangle {
  static triangle = (w: number, h: number, color: number[]) => {
    const verticesData = [-w, -h, 0, 0, h, 0, w, -h, 0];

    const colorMax = 3;
    const colorData: number[] = [];

    [...Array(colorMax).keys()].forEach((_count) => {
      colorData.push(color[0], color[1], color[2], color[3]);
    });

    const indicesData = [0, 1, 2];

    return {
      verticesData: verticesData,
      colorData: colorData,
      indicesData: indicesData,
    };
  };

  static triangleColor = (w: number, h: number) => {
    const verticesData = [-w, -h, 0, 0, h, 0, w, -h, 0];

    const colorData: number[] = [
      1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
    ];

    const indicesData = [0, 1, 2];

    return {
      verticesData: verticesData,
      colorData: colorData,
      indicesData: indicesData,
    };
  };
}
