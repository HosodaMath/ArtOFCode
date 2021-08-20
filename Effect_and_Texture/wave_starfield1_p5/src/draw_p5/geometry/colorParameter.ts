import P5 from "p5";
export interface colorParameter {
  fillColor: P5.Color;
  strokeColor: P5.Color;
  strokeWidth: number;
}

export interface colorFillParameter {
  fillColor: P5.Color;
}

export interface colorStrokeParameter {
  strokeColor: P5.Color;
  strokeWidth: number;
}

export interface colorShadowParameter {
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  starShadowColor: string;
  starShadowBlur: number;
}

export interface colorGradientParameter {
  fillColor: CanvasGradient;
  strokeColor: string;
  strokeWidth: number;
  starShadowColor: string;
  starShadowBlur: number;
}
