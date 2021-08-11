import { Line } from "../geometry/line";

/**
 * @class
 * @description 簡単なグリッドを描く
 */
export class Grid {
  static grid2(line1: Line, line2: Line, line_color: string = "#d8d8d8") {
    line1.draw(line_color);
    line2.draw(line_color);
  }

  static gridN(line: Line[], line_color: string = "#000000") {
    for (let count = 0; count < line.length; count++) {
      line[count].draw(line_color);
    }
  }
}
