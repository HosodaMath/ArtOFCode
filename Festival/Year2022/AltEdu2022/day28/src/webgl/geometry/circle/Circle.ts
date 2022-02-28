import { GeometryParameter } from "../../parameter/parameter";
export class Circle {
  static circle(radius: number, split: number, color: number[]) {
    const verticesData: number[] = [];
    const normalData: number[] = [];
    const colorData: number[] = [];
    const textureCoordData: number[] = [];
    const indicesData: number[] = [];

    verticesData.push(0.0, 0.0, 0.0);
    normalData.push(0.0, 0.0, 1.0);
    colorData.push(color[0], color[1], color[2], color[3]);
    textureCoordData.push(0.5, 0.5);
    let j = 0;
    [...Array(split).keys()].forEach((i) => {
      const r = ((Math.PI * 2.0) / split) * i;
      const rx = Math.cos(r);
      const ry = Math.sin(r);
      verticesData.push(rx * radius, ry * radius, 0.0);
      normalData.push(0.0, 0.0, 1.0);
      colorData.push(color[0], color[1], color[2], color[3]);
      textureCoordData.push((rx + 1.0) * 0.5, 1.0 - (ry + 1.0) * 0.5);
      if (i === split - 1.0) {
        indicesData.push(0.0, j + 1.0, 1.0);
      } else {
        indicesData.push(0.0, j + 1.0, j + 2.0);
      }
      j++;
    });

    const data: GeometryParameter = {
      vertices: verticesData,
      normal: normalData,
      color: colorData,
      textureCoord: textureCoordData,
      indices: indicesData,
    };

    return data;
  }

  static circleColor(radius: number, split: number) {
    const verticesData: number[] = [];
    const normalData: number[] = [];
    const colorData: number[] = [];
    const textureCoordData: number[] = [];
    const indicesData: number[] = [];

    verticesData.push(0.0, 0.0, 0.0);
    normalData.push(0.0, 0.0, 1.0);
    colorData.push(1.0, 1.0, 0.0, 1.0);
    textureCoordData.push(0.5, 0.5);
    let j = 0;
    [...Array(split).keys()].forEach((i) => {
      const r = ((Math.PI * 2.0) / split) * i;
      const rx = Math.cos(r);
      const ry = Math.sin(r);
      verticesData.push(rx * radius, ry * radius, 0.0);
      normalData.push(0.0, 0.0, 1.0);
      if (i % 2 !== 0) {
        colorData.push(1.0, 1.0, 0.0, 1.0);
      } else if (i % 2 === 0 && i % 4 !== 0) {
        colorData.push(0.0, 1.0, 1.0, 1.0);
      } else {
        colorData.push(0.0, 0.0, 1.0, 1.0)
      }
      textureCoordData.push((rx + 1.0) * 0.5, 1.0 - (ry + 1.0) * 0.5);
      if (i === split - 1.0) {
        indicesData.push(0.0, j + 1.0, 1.0);
      } else {
        indicesData.push(0.0, j + 1.0, j + 2.0);
      }
      j++;
    });

    const data: GeometryParameter = {
      vertices: verticesData,
      normal: normalData,
      color: colorData,
      textureCoord: textureCoordData,
      indices: indicesData,
    };

    return data;
  }
}
