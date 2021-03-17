import { Vector2 } from "../mathematics/vector";
import { Transform } from "../mathematics/matrix";
class CanvasText {
  protected gl: CanvasRenderingContext2D;
  protected text_lcoation: Vector2;
  protected text: string;
  protected text_font: string;
  /**
   *
   * @param {CanvasRenderingContext2D} gl
   * @param {Vector2} text_location
   * @param {string} text_font
   */
  constructor(
    gl: CanvasRenderingContext2D,
    text_location: Vector2,
    text: string,
    text_font: string
  ) {
    this.gl = gl;
    this.text_lcoation = text_location;
    this.text = text;
    this.text_font = text_font;
  }
  /**
   *
   * @param {string} fillColor
   * @param {CanvasTextAlign} setTextAlign - "center" | "end" | "left" | "right" | "start"
   */
  draw = (fillColor: string, setTextAlign: CanvasTextAlign) => {
    this.gl.fillStyle = fillColor;
    this.gl.font = this.text_font;
    this.gl.textAlign = setTextAlign;
    this.gl.fillText(this.text, this.text_lcoation.x, this.text_lcoation.y);
  };

  /**
   *
   * @param {string} strokeColor
   * @param {CanvasTextAlign} setTextAlign - "center" | "end" | "left" | "right" | "start"
   */
  drawStroke = (strokeColor: string, setTextAlign: CanvasTextAlign) => {
    this.gl.strokeStyle = strokeColor;
    this.gl.font = this.text_font;
    this.gl.textAlign = setTextAlign;
    this.gl.strokeText(this.text, this.text_lcoation.x, this.text_lcoation.y);
  };
}

class AnimationText extends CanvasText {
  protected text_velocity: Vector2;
  constructor(
    gl: CanvasRenderingContext2D,
    text_location: Vector2,
    text_velocity: Vector2,
    text: string,
    text_font: string
  ) {
    super(gl, text_location, text, text_font);
    this.text_velocity = text_velocity;
  }

  text_step_loop = (canvas_size: Vector2) => {
    this.text_lcoation.add(this.text_velocity);

    if (this.text_lcoation.x > canvas_size.x) {
      this.text_lcoation.x = 0;
    }

    if (this.text_lcoation.y > canvas_size.y) {
      this.text_lcoation.y = 0;
    }
  };

  text_step_bound = (canvas_size: Vector2) => {
    this.text_lcoation.add(this.text_velocity);

    if (this.text_lcoation.x < 0 || this.text_lcoation.x > canvas_size.x) {
      this.text_lcoation.x = 0;
    }

    if (this.text_lcoation.y < 0 || this.text_lcoation.y > canvas_size.y) {
      this.text_lcoation.y = 0;
    }
  };

  /**
   *
   * @param {string} fillColor
   * @param {CanvasTextAlign} setTextAlign - "center" | "end" | "left" | "right" | "start"
   */
  draw = (fillColor: string, setTextAlign: CanvasTextAlign) => {
    this.gl.fillStyle = fillColor;
    this.gl.font = this.text_font;
    this.gl.textAlign = setTextAlign;
    this.gl.fillText(this.text, this.text_lcoation.x, this.text_lcoation.y);
  };

  /**
   *
   * @param {string} strokeColor
   * @param {CanvasTextAlign} setTextAlign - "center" | "end" | "left" | "right" | "start"
   */
  drawStroke = (strokeColor: string, setTextAlign: CanvasTextAlign) => {
    this.gl.strokeStyle = strokeColor;
    this.gl.font = this.text_font;
    this.gl.textAlign = setTextAlign;
    this.gl.strokeText(this.text, this.text_lcoation.x, this.text_lcoation.y);
  };
}

class TransformText extends AnimationText {
  constructor(
    gl: CanvasRenderingContext2D,
    text_location: Vector2,
    text_velocity: Vector2,
    text: string,
    text_font: string
  ) {
    super(gl, text_location, text_velocity, text, text_font);
  }

  text_step_loop = (canvas_size: Vector2) => {
    this.text_lcoation.add(this.text_velocity);

    if (this.text_lcoation.x > canvas_size.x) {
      this.text_lcoation.x = 0;
    }

    if (this.text_lcoation.y > canvas_size.y) {
      this.text_lcoation.y = 0;
    }
  };

  text_step_bound = (canvas_size: Vector2) => {
    this.text_lcoation.add(this.text_velocity);

    if (this.text_lcoation.x < 0 || this.text_lcoation.x > canvas_size.x) {
      this.text_lcoation.x = 0;
    }

    if (this.text_lcoation.y < 0 || this.text_lcoation.y > canvas_size.y) {
      this.text_lcoation.y = 0;
    }
  };

  /**
   *
   * @param {string} fillColor
   * @param {CanvasTextAlign} setTextAlign - "center" | "end" | "left" | "right" | "start"
   */
  drawFillT = (
    fillColor: string,
    setTextAlign: CanvasTextAlign,
    transform_data: Transform
  ) => {
    this.gl.fillStyle = fillColor;
    this.gl.font = this.text_font;
    this.gl.textAlign = setTextAlign;
    this.gl.save();
    this.gl.translate(
      transform_data.translate_data.x,
      transform_data.translate_data.y
    );
    this.gl.rotate(transform_data.rotate_data.x);
    this.gl.scale(transform_data.scale_data.x, transform_data.scale_data.y);
    this.gl.fillText(this.text, this.text_lcoation.x, this.text_lcoation.y);
    this.gl.restore();
  };

  /**
   *
   * @param {string} strokeColor
   * @param {CanvasTextAlign} setTextAlign - "center" | "end" | "left" | "right" | "start"
   */
  drawStrokeT = (
    strokeColor: string,
    setTextAlign: CanvasTextAlign,
    transform_data: Transform
  ) => {
    this.gl.strokeStyle = strokeColor;
    this.gl.font = this.text_font;
    this.gl.textAlign = setTextAlign;
    this.gl.save();
    this.gl.translate(
      transform_data.translate_data.x,
      transform_data.translate_data.y
    );
    this.gl.rotate(transform_data.rotate_data.x);
    this.gl.scale(transform_data.scale_data.x, transform_data.scale_data.y);
    this.gl.strokeText(this.text, this.text_lcoation.x, this.text_lcoation.y);
  };
}

export { CanvasText, AnimationText, TransformText };
