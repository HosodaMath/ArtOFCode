export class Sound {
  /**
   * @description Hzを求める
   * @param note
   * @param octave
   * @returns
   */
  static calcHz = (note = "A", octave = 4): number => {
    // 基準となる音
    const A4 = 440;
    let n = 0;
    switch (note) {
      default:
      case "A":
        n = 0;
        break;
      case "A#":
      case "Bb":
        n = 1;
        break;
      case "B":
        n = 2;
        break;
      case "C":
        n = 3;
        break;
      case "C#":
      case "Db":
        n = 4;
        break;
      case "D":
        n = 5;
        break;
      case "D#":
      case "Eb":
        n = 6;
        break;
      case "E":
        n = 7;
        break;
      case "F":
        n = 8;
        break;
      case "F#":
      case "Gb":
        n = 9;
        break;
      case "G":
        n = 10;
        break;
      case "G#":
      case "Ab":
        n = 11;
        break;
    }
    n += 12 * (octave - 4);
    return A4 * Math.pow(2, n / 12);
  };
}
