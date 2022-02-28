import { GeometryParameter } from "../../parameter/parameter";
export class Sphere {
  /**
   *
   * @param row 分割数（縦）
   * @param column 分割数（横）
   * @param radius 半径
   * @param color 色のデータ [r, g, b, alpha]
   * @returns
   */
  static sphere(
    row: number,
    column: number,
    radius: number,
    color: [number, number, number, number]
  ) {
    let i: number, j: number;
    const verticesData: number[] = [],
      normalData: number[] = [],
      colorData: number[] = [],
      textureCoord: number[] = [],
      indicesData: number[] = [];
    for (i = 0; i <= row; i++) {
      const r = (Math.PI / row) * i;
      const ry = Math.cos(r);
      const rr = Math.sin(r);
      for (j = 0; j <= column; j++) {
        const tr = ((Math.PI * 2) / column) * j;
        const tx = rr * radius * Math.cos(tr);
        const ty = ry * radius;
        const tz = rr * radius * Math.sin(tr);
        const rx = rr * Math.cos(tr);
        const rz = rr * Math.sin(tr);
        verticesData.push(tx, ty, tz);
        normalData.push(rx, ry, rz);
        colorData.push(color[0], color[1], color[2], color[3]);
        textureCoord.push(1 - (1 / column) * j, (1 / row) * i);
      }
    }
    for (i = 0; i < row; i++) {
      for (j = 0; j < column; j++) {
        let r = (column + 1) * i + j;
        indicesData.push(r, r + 1, r + column + 2);
        indicesData.push(r, r + column + 2, r + column + 1);
      }
    }

    const sphereData: GeometryParameter = {
      vertices: verticesData,
      normal: normalData,
      color: colorData,
      textureCoord: textureCoord,
      indices: indicesData,
    };

    return sphereData;
  }

  /**
   *
   * @param row 分割数（縦）
   * @param column 分割数（横）
   * @param radius 半径
   * @returns
   */
  static sphereColor(row: number, column: number, radius: number) {
    let i: number, j: number;
    const verticesData: number[] = [],
      normalData: number[] = [],
      colorData: number[] = [],
      textureCoord: number[] = [],
      indicesData: number[] = [];
    for (i = 0; i <= row; i++) {
      const r = (Math.PI / row) * i;
      const ry = Math.cos(r);
      const rr = Math.sin(r);
      for (j = 0; j <= column; j++) {
        const tr = ((Math.PI * 2) / column) * j;
        const tx = rr * radius * Math.cos(tr);
        const ty = ry * radius;
        const tz = rr * radius * Math.sin(tr);
        const rx = rr * Math.cos(tr);
        const rz = rr * Math.sin(tr);
        verticesData.push(tx, ty, tz);
        normalData.push(rx, ry, rz);
        const orange = [1.0, 0.5, 0.0, 1.0];
        colorData.push(orange[0], orange[1], orange[2], orange[3]);
        textureCoord.push(1 - (1 / column) * j, (1 / row) * i);
      }
    }
    for (i = 0; i < row; i++) {
      for (j = 0; j < column; j++) {
        let r = (column + 1) * i + j;
        indicesData.push(r, r + 1, r + column + 2);
        indicesData.push(r, r + column + 2, r + column + 1);
      }
    }

    const sphereData: GeometryParameter = {
      vertices: verticesData,
      normal: normalData,
      color: colorData,
      textureCoord: textureCoord,
      indices: indicesData,
    };

    return sphereData;
  }
}
