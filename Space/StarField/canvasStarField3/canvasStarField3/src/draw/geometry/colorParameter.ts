/**
 * @interface colorParameters
 * @description circleの色パラメータ
 * @property {string | CanvasGradient | CanvasPattern} fillColor
 * @property {string | CanvasGradient | CanvasPattern} strokeColor
 * @property {number} strokeWidth
 * @author Shingo Hosoda
 */
export interface colorParameters {
  fillColor: string | CanvasGradient | CanvasPattern;
  strokeColor: string | CanvasGradient | CanvasPattern;
  strokeWidth: number;
}

/**
 * @interface colorFillParameters
 * @description circleの色パラメータ
 * @property {string | CanvasGradient | CanvasPattern} fillColor
 * @author Shingo Hosoda
 */
export interface colorFillParameters {
  fillColor: string | CanvasGradient | CanvasPattern;
}

/**
 * @interface colorStrokeParameters
 * @description circleの色パラメータ
 * @property {string | CanvasGradient | CanvasPattern} strokeColor
 * @property {number} strokeWidth
 * @author Shingo Hosoda
 */
export interface colorStrokeParameters {
  strokeColor: string | CanvasGradient | CanvasPattern;
  strokeWidth: number;
}