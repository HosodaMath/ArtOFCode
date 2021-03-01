class Triangle {
  constructor(coordinate, triangle_size) {
    this.coordinate = coordinate;
    this.triangle_size = triangle_size;
  }

  testTriangle = (fillColor) => {
    push();
    fill(fillColor.r, fillColor.g, fillColor.b);
    translate(this.coordinate.x, this.coordinate.y, this.coordinate.z);
    rotateY(-frameCount * 0.01);
    scale(this.triangle_size);

    beginShape(TRIANGLES);
    vertex(- 1.0, 1.0, 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(1.0, 1.0, 1.0);

    vertex(1.0, 1.0, 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(0.0, 1.0, - 1.0);

    vertex(0.0, 1.0, - 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(- 1.0, 1.0, 1.0);

    vertex(- 1.0, 1.0, 1.0);
    vertex(1.0, 1.0, 1.0);
    vertex(0.0, 1.0, - 1.0);
    endShape(CLOSE);

    pop();
  }

  drawTriangle = (ambientMaterialColor) => {
    ambientMaterial(ambientMaterialColor.r, ambientMaterialColor.g, ambientMaterialColor.b)
    push();
    translate(this.coordinate.x, this.coordinate.y, this.coordinate.z);
    rotateY(-frameCount * 0.01);
    scale(this.triangle_size);

    beginShape(TRIANGLES);
    vertex(- 1.0, 1.0, 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(1.0, 1.0, 1.0);

    vertex(1.0, 1.0, 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(0.0, 1.0, - 1.0);

    vertex(0.0, 1.0, - 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(- 1.0, 1.0, 1.0);

    vertex(- 1.0, 1.0, 1.0);
    vertex(1.0, 1.0, 1.0);
    vertex(0.0, 1.0, - 1.0);
    endShape(CLOSE);

    pop();
  }
}