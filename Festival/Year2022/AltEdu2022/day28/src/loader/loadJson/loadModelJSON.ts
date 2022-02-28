import { GeometryParameter } from "../../webgl/parameter/parameter";
/**
 * @description 簡易版 vertices color indicesのデータのみ
 * @param fileUrl
 * @returns
 */
export const loadModelJSON = async (
  fileUrl: string
): Promise<GeometryParameter> => {
  const dataResponse = await fetch(fileUrl);

  type JsonModelData = {
    vertices: number[],
    normal: number[],
    color: number[],
    textureCoord: number[],
    indices: number[],
  }

  const jsonData: JsonModelData = await dataResponse.json();

  const verticesData: number[] = [];
  [...Array(jsonData.vertices.length).keys()].forEach((count) => {
    const value = jsonData.vertices[count];
    if (typeof value !== "number") {
      throw new Error("Error!! 不適切な値が混入しています。");
    }

    verticesData.push(Number(value));
  });

  const normalData: number[] = [];
  [...Array(jsonData.normal.length).keys()].forEach((count) => {
    const value = jsonData.normal[count];
    if (typeof value !== "number") {
      throw new Error("Error!! 不適切な値が混入しています。");
    }

    normalData.push(Number(value));
  });

  const textureCoordData: number[] = [];
  [...Array(jsonData.textureCoord.length).keys()].forEach((count) => {
    const value = jsonData.textureCoord[count];
    if (typeof value !== "number") {
      throw new Error("Error!! 不適切な値が混入しています。");
    }

    textureCoordData.push(Number(value));
  });

  const colorData: number[] = [];
  [...Array(jsonData.color.length).keys()].forEach((count) => {
    const value = jsonData.color[count];
    if (typeof value !== "number") {
      throw new Error("Error!! 不適切な値が混入しています。");
    }

    colorData.push(Number(value));
  });

  const indicesData: number[] = [];
  [...Array(jsonData.indices.length).keys()].forEach((count) => {
    const value = jsonData.indices[count];
    if (typeof value !== "number") {
      throw new Error("Error!! 不適切な値が混入しています。");
    }

    indicesData.push(Number(value));
  });

  const data: GeometryParameter = {
    vertices: verticesData,
    color: colorData,
    normal: normalData,
    textureCoord: textureCoordData,
    indices: indicesData,
  };

  return data;
};
