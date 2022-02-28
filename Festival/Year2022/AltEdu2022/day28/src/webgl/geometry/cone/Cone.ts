export class Cone {
  static cone(color: number[]) {
    const verticesData = [
      1.5, 0, 0, 
      -1.5, 1, 0, 
      -1.5, 0.809017, 0.587785, 
      -1.5, 0.309017, 0.951057,
      -1.5, -0.309017, 0.951057, 
      -1.5, -0.809017, 0.587785, 
      -1.5, -1, 0, 
      -1.5, -0.809017, -0.587785, 
      -1.5, -0.309017, -0.951057, 
      -1.5, 0.309017, -0.951057, 
      -1.5, 0.809017, -0.587785,
    ];

    const colorMax = verticesData.length / 3.0;
    const colorData: number[] = [];

    [...Array(colorMax).keys()].forEach((_count) => {
      colorData.push(color[0], color[1], color[2], color[3]);
    });

    const indicesData = [
      0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 7, 0, 7, 8, 0, 8, 9, 0,
      9, 10, 0, 10, 1,
    ];

    return {
      verticesData: verticesData,
      colorData: colorData,
      indicesData: indicesData,
    };
  }

  static coneColor() {
    const verticesData = [
      1.5, 0, 0, 
      -1.5, 1, 0, 
      -1.5, 0.809017, 0.587785, 
      -1.5, 0.309017, 0.951057,
      -1.5, -0.309017, 0.951057, 
      -1.5, -0.809017, 0.587785, 
      -1.5, -1, 0, 
      -1.5, -0.809017, -0.587785, 
      -1.5, -0.309017, -0.951057, 
      -1.5, 0.309017, -0.951057, 
      -1.5, 0.809017, -0.587785,
    ];

    const colorData: number[] = [
      1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,
      1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0,
      0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
    ];

    const indicesData = [
      0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 7, 0, 7, 8, 0, 8, 9, 0,
      9, 10, 0, 10, 1,
    ];

    return {
      verticesData: verticesData,
      colorData: colorData,
      indicesData: indicesData,
    };
  }
}
