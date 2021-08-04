/**
 * @description 角度からラジアンに変換
 * @param angle 
 * @returns ラジアンを出力する
 */
export const degreeToRadian = (angle: number) => {
  const radian = (angle * Math.PI) / 180;

  return radian;
}