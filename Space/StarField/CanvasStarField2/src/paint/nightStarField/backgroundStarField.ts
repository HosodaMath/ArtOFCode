/**
 * データの生成と描画の関数を分割する
 */
import * as Draw from "../../draw/draw";

/**
 * @interface BackGroundStarType
 * @property position
 */
export interface BackGroundStarParameters {
  position: Draw.Vector2[];
  size: number[];
  starColor: string[];
  shadowColor: string[];
}

export class InitBackGroundStar {

}

export const initBackgroundStarField = (
  o: Draw.Vector2,
  canvasSize: Draw.Vector2
): BackGroundStarParameters => {
  const StarMax = 200;
  const starColorSet = [
    "rgba(245, 250, 200, 1.0)",
    "rgba(200, 200, 250, 1.0)",
    "rgba(200, 250, 250, 1.0)",
  ];

  const starPosition: Draw.Vector2[] = [];
  const starSize: number[] = [];
  const starColor: string[] = [];
  const starShadowColor: string[] = [];
  [...Array(StarMax).keys()].forEach((_count) => {
    // 座標の生成

    const initPosition = new Draw.Vector2(
      Draw.Random.random(o.x, canvasSize.x),
      Draw.Random.random(o.y, canvasSize.y)
    );
    starPosition.push(initPosition);

    // 星の大きさを生成

    const initSize = Draw.Random.random(1, 3);
    starSize.push(initSize);

    // 星の色を生成

    const choice = Math.floor(Draw.Random.random(0, starColorSet.length));
    starColor.push(starColorSet[choice]);

    // 星の影を生成

    starShadowColor.push(starColorSet[choice]);
  });

  const backgroundStar: BackGroundStarParameters = {
    position: starPosition,
    size: starSize,
    starColor: starColor,
    shadowColor: starShadowColor,
  };

  return backgroundStar;
};

export const drawBackgroundStarField = (
  gl: CanvasRenderingContext2D,
  star_data: BackGroundStarParameters
) => {
  [...Array(star_data.position.length).keys()].forEach((count) => {
    const star = new Draw.Circle(
      gl,
      star_data.position[count],
      star_data.size[count]
    );

    gl.save();
    gl.shadowColor = star_data.shadowColor[count];
    gl.shadowBlur = 10;
    star.draw_fill(star_data.starColor[count]);
    gl.restore();
  });
};
