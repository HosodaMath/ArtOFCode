import { SimpleGeopetryParameter } from "../../webgl/parameter/parameter";
/**
 * @description 簡易版 vertices color indicesのデータのみ
 * @param fileUrl
 * @returns
 */
export const loadSimpleModelJson = async (
  fileUrl: string
): Promise<SimpleGeopetryParameter> => {
  const dataResponse = await fetch(fileUrl);

  const jsonData = await dataResponse.json();
  
  const verticesData: number[] = [];
  [...Array(jsonData.vertices.length).keys()].forEach((count) => {
    const value = jsonData.vertices[count];
    if (typeof value !== "number") {
      throw new Error("Error!! 不適切な値が混入しています。");
    }

    verticesData.push(Number(value));
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

  const data: SimpleGeopetryParameter = {
    verticesData: verticesData,
    colorData: colorData,
    indicesData: indicesData,
  };

  return data;
};
