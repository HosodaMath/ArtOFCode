export class Calculator {
  /**
   *
   * @param n
   * @param low
   * @param high
   * @returns
   */
  static constrain = (n: number, low: number, high: number): number => {
    const answer = Math.max(Math.min(n, high), low);

    return answer;
  };

  /**
   *
   * @param start
   * @param stop
   * @param amt
   * @returns
   */
  static lerp = (start: number, stop: number, amt: number): number => {
    const answer = amt * (stop - start) + start;

    return answer;
  };

  /**
   *
   * @param value
   * @param start1
   * @param stop1
   * @param start2
   * @param stop2
   * @param withBounds
   * @returns
   */
  static map = (
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number,
    withBounds?: boolean
  ) => {
    const newValue =
      ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;

    if (!withBounds) {
      return newValue;
    }

    if (start2 < stop2) {
      return Calculator.constrain(newValue, start2, stop2);
    } else {
      return Calculator.constrain(newValue, stop2, start2);
    }
  };

  /**
   *
   * @param degree
   */
  static radians = (degree: number): number => {
    return (degree * Math.PI) / 180;
  };
}
