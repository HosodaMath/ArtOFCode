import { Vector2 } from "./vector";
class Transform {
  public scale_data: Vector2;
  public rotate_data: Vector2;
  public translate_data: Vector2;
  constructor(scale_data: Vector2, rotate_data: Vector2, translate_data: Vector2){
    this.scale_data = scale_data;
    this.rotate_data = rotate_data;
    this.translate_data = translate_data;
  }
}

export {Transform}