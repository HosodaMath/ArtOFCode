export class Matrix4 {
  /**
   *
   * @returns
   */
  static init() {
    return new Float32Array(16);
  }

  /**
   *
   * @param targetMatrix
   * @param matrix
   * @returns
   */
  static copy(targetMatrix: Float32Array, matrix: Float32Array) {
    let out = matrix;

    out[0] = targetMatrix[0];
    out[1] = targetMatrix[1];
    out[2] = targetMatrix[2];
    out[3] = targetMatrix[3];
    out[4] = targetMatrix[4];
    out[5] = targetMatrix[5];
    out[6] = targetMatrix[6];
    out[7] = targetMatrix[7];
    out[8] = targetMatrix[8];
    out[9] = targetMatrix[9];
    out[10] = targetMatrix[10];
    out[11] = targetMatrix[11];
    out[12] = targetMatrix[12];
    out[13] = targetMatrix[13];
    out[14] = targetMatrix[14];
    out[15] = targetMatrix[15];

    return out;
  }

  /**
   *
   * @param matrix
   * @returns
   */
  static identity(matrix: Float32Array) {
    let out = matrix;
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
  }

  /**
   *
   * @param matrixA
   * @param matrixB
   * @param matrix
   * @returns
   */
  static multiply(
    matrixA: Float32Array,
    matrixB: Float32Array,
    matrix: Float32Array
  ) {
    let out = matrix;
    let A11 = matrixA[0],
      A12 = matrixA[1],
      A13 = matrixA[2],
      A14 = matrixA[3],
      A21 = matrixA[4],
      A22 = matrixA[5],
      A23 = matrixA[6],
      A24 = matrixA[7],
      A31 = matrixA[8],
      A32 = matrixA[9],
      A33 = matrixA[10],
      A34 = matrixA[11],
      A41 = matrixA[12],
      A42 = matrixA[13],
      A43 = matrixA[14],
      A44 = matrixA[15],
      B11 = matrixB[0],
      B12 = matrixB[1],
      B13 = matrixB[2],
      B14 = matrixB[3],
      B21 = matrixB[4],
      B22 = matrixB[5],
      B23 = matrixB[6],
      B24 = matrixB[7],
      B31 = matrixB[8],
      B32 = matrixB[9],
      B33 = matrixB[10],
      B34 = matrixB[11],
      B41 = matrixB[12],
      B42 = matrixB[13],
      B43 = matrixB[14],
      B44 = matrixB[15];
    out[0] = B11 * A11 + B12 * A21 + B13 * A31 + B14 * A41;
    out[1] = B11 * A12 + B12 * A22 + B13 * A32 + B14 * A42;
    out[2] = B11 * A13 + B12 * A23 + B13 * A33 + B14 * A43;
    out[3] = B11 * A14 + B12 * A24 + B13 * A34 + B14 * A44;
    out[4] = B21 * A11 + B22 * A21 + B23 * A31 + B24 * A41;
    out[5] = B21 * A12 + B22 * A22 + B23 * A32 + B24 * A42;
    out[6] = B21 * A13 + B22 * A23 + B23 * A33 + B24 * A43;
    out[7] = B21 * A14 + B22 * A24 + B23 * A34 + B24 * A44;
    out[8] = B31 * A11 + B32 * A21 + B33 * A31 + B34 * A41;
    out[9] = B31 * A12 + B32 * A22 + B33 * A32 + B34 * A42;
    out[10] = B31 * A13 + B32 * A23 + B33 * A33 + B34 * A43;
    out[11] = B31 * A14 + B32 * A24 + B33 * A34 + B34 * A44;
    out[12] = B41 * A11 + B42 * A21 + B43 * A31 + B44 * A41;
    out[13] = B41 * A12 + B42 * A22 + B43 * A32 + B44 * A42;
    out[14] = B41 * A13 + B42 * A23 + B43 * A33 + B44 * A43;
    out[15] = B41 * A14 + B42 * A24 + B43 * A34 + B44 * A44;
    return out;
  }

  /**
   *
   * @param mat
   * @param vec
   * @param source
   * @returns
   */
  static translate(mat: Float32Array, vec: Float32Array, source: Float32Array) {
    let out = source;

    out[0] = mat[0];
    out[1] = mat[1];
    out[2] = mat[2];
    out[3] = mat[3];
    out[4] = mat[4];
    out[5] = mat[5];
    out[6] = mat[6];
    out[7] = mat[7];
    out[8] = mat[8];
    out[9] = mat[9];
    out[10] = mat[10];
    out[11] = mat[11];
    out[12] = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2] + mat[12];
    out[13] = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2] + mat[13];
    out[14] = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2] + mat[14];
    out[15] = mat[3] * vec[0] + mat[7] * vec[1] + mat[11] * vec[2] + mat[15];
    return out;
  }

  /**
   *
   * @param matrix
   * @param angle
   * @param axis
   * @param source
   * @returns
   */
  static rotate(
    matrix: Float32Array,
    angle: number,
    axis: Float32Array,
    source: Float32Array
  ) {
    let out = source;
    if (out == null) {
      out = Matrix4.init();
    }
    let sq = Math.sqrt(
      axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]
    );
    if (!sq) {
      return null;
    }
    let axis0 = axis[0],
      axis1 = axis[1],
      axis2 = axis[2];
    if (sq != 1) {
      sq = 1 / sq;
      axis0 *= sq;
      axis1 *= sq;
      axis2 *= sq;
    }
    const S = Math.sin(angle),
      T = Math.cos(angle),
      F = 1 - T,
      A11 = matrix[0],
      A12 = matrix[1],
      A13 = matrix[2],
      A14 = matrix[3],
      A21 = matrix[4],
      A22 = matrix[5],
      A23 = matrix[6],
      A24 = matrix[7],
      A31 = matrix[8],
      A32 = matrix[9],
      A33 = matrix[10],
      A34 = matrix[11],
      S1 = axis0 * axis0 * F + T,
      S2 = axis1 * axis0 * F + axis2 * S,
      S3 = axis2 * axis0 * F - axis1 * S,
      S4 = axis0 * axis1 * F - axis2 * S,
      S5 = axis1 * axis1 * F + T,
      S6 = axis2 * axis1 * F + axis0 * S,
      S7 = axis0 * axis2 * F + axis1 * S,
      S9 = axis1 * axis2 * F - axis0 * S,
      S10 = axis2 * axis2 * F + T;
    if (angle) {
      if (matrix != out) {
        out[12] = matrix[12];
        out[13] = matrix[13];
        out[14] = matrix[14];
        out[15] = matrix[15];
      }
    } else {
      out = matrix;
    }
    out[0] = A11 * S1 + A21 * S2 + A31 * S3;
    out[1] = A12 * S1 + A22 * S2 + A32 * S3;
    out[2] = A13 * S1 + A23 * S2 + A33 * S3;
    out[3] = A14 * S1 + A24 * S2 + A34 * S3;
    out[4] = A11 * S4 + A21 * S5 + A31 * S6;
    out[5] = A12 * S4 + A22 * S5 + A32 * S6;
    out[6] = A13 * S4 + A23 * S5 + A33 * S6;
    out[7] = A14 * S4 + A24 * S5 + A34 * S6;
    out[8] = A11 * S7 + A21 * S9 + A31 * S10;
    out[9] = A12 * S7 + A22 * S9 + A32 * S10;
    out[10] = A13 * S7 + A23 * S9 + A33 * S10;
    out[11] = A14 * S7 + A24 * S9 + A34 * S10;

    return out;
  }

  /**
   *
   * @param fovy
   * @param aspect
   * @param near
   * @param far
   * @param matrix
   * @returns
   */
  static perspective(
    fovy: number,
    aspect: number,
    near: number,
    far: number,
    matrix: Float32Array
  ) {
    let out = matrix;
    let t = near * Math.tan((fovy * Math.PI) / 360);
    let r = t * aspect;
    let a = r * 2,
      b = t * 2,
      c = far - near;
    out[0] = (near * 2) / a;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) / b;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = -(far + near) / c;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = -(far * near * 2) / c;
    out[15] = 0;
    return out;
  }

  /**
   * @description
   * @param eye
   * @param center
   * @param up
   * @param source
   * @returns
   */
  static lookAt = (
    eye: Float32Array,
    center: Float32Array,
    up: Float32Array,
    source: Float32Array
  ) => {
    const eyeX = eye[0],
      eyeY = eye[1],
      eyeZ = eye[2],
      centerX = center[0],
      centerY = center[1],
      centerZ = center[2],
      upX = up[0],
      upY = up[1],
      upZ = up[2];
    if (eyeX == centerX && eyeY == centerY && eyeZ == centerZ) {
      return Matrix4.identity(source);
    }
    let out = source;
    if (out == null) {
      out = Matrix4.init();
    }
    let x0: number,
      x1: number,
      x2: number,
      y0: number,
      y1: number,
      y2: number,
      z0: number,
      z1: number,
      z2: number,
      l: number;
    z0 = eyeX - center[0];
    z1 = eyeY - center[1];
    z2 = eyeZ - center[2];
    l = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= l;
    z1 *= l;
    z2 *= l;
    x0 = upY * z2 - upZ * z1;
    x1 = upZ * z0 - upX * z2;
    x2 = upX * z1 - upY * z0;
    l = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!l) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      l = 1 / l;
      x0 *= l;
      x1 *= l;
      x2 *= l;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    l = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!l) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      l = 1 / l;
      y0 *= l;
      y1 *= l;
      y2 *= l;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyeX + x1 * eyeY + x2 * eyeZ);
    out[13] = -(y0 * eyeX + y1 * eyeY + y2 * eyeZ);
    out[14] = -(z0 * eyeX + z1 * eyeY + z2 * eyeZ);
    out[15] = 1;

    return out;
  };

  /**
   *
   * @param matrix
   * @param sourceMatrix
   * @returns
   */
  static transpose(matrix: Float32Array, sourceMatrix: Float32Array) {
    let out = sourceMatrix;

    out[0] = matrix[0];
    out[1] = matrix[4];
    out[2] = matrix[8];
    out[3] = matrix[12];
    out[4] = matrix[1];
    out[5] = matrix[5];
    out[6] = matrix[9];
    out[7] = matrix[13];
    out[8] = matrix[2];
    out[9] = matrix[6];
    out[10] = matrix[10];
    out[11] = matrix[14];
    out[12] = matrix[3];
    out[13] = matrix[7];
    out[14] = matrix[11];
    out[15] = matrix[15];

    return out;
  }

  static invert(matrix: Float32Array, sourceMatrix: Float32Array) {
    let out = sourceMatrix;
    let A11 = matrix[0],
      A12 = matrix[1],
      A13 = matrix[2],
      A14 = matrix[3],
      A21 = matrix[4],
      A22 = matrix[5],
      A23 = matrix[6],
      A24 = matrix[7],
      A31 = matrix[8],
      A32 = matrix[9],
      A33 = matrix[10],
      A34 = matrix[11],
      A41 = matrix[12],
      A42 = matrix[13],
      A43 = matrix[14],
      A44 = matrix[15],
      C1 = A11 * A22 - A12 * A21,
      C2 = A11 * A23 - A13 * A21,
      C3 = A11 * A24 - A14 * A21,
      C4 = A12 * A23 - A13 * A22,
      C5 = A12 * A24 - A14 * A22,
      C6 = A13 * A24 - A14 * A23,
      C7 = A31 * A42 - A32 * A41,
      C8 = A31 * A43 - A33 * A41,
      C9 = A31 * A44 - A34 * A41,
      C10 = A32 * A43 - A33 * A42,
      A = A32 * A44 - A34 * A42,
      B = A33 * A44 - A34 * A43,
      ivd = 1 / (C1 * B - C2 * A + C3 * C10 + C4 * C9 - C5 * C8 + C6 * C7);
    out[0] = (A22 * B - A23 * A + A24 * C10) * ivd;
    out[1] = (-A12 * B + A13 * A - A14 * C10) * ivd;
    out[2] = (A42 * C6 - A43 * C5 + A44 * C4) * ivd;
    out[3] = (-A32 * C6 + A33 * C5 - A34 * C4) * ivd;
    out[4] = (-A21 * B + A23 * C9 - A24 * C8) * ivd;
    out[5] = (A11 * B - A13 * C9 + A14 * C8) * ivd;
    out[6] = (-A41 * C6 + A43 * C3 - A44 * C2) * ivd;
    out[7] = (A31 * C6 - A33 * C3 + A34 * C2) * ivd;
    out[8] = (A21 * A - A22 * C9 + A24 * C7) * ivd;
    out[9] = (-A11 * A + A12 * C9 - A14 * C7) * ivd;
    out[10] = (A41 * C5 - A42 * C3 + A44 * C1) * ivd;
    out[11] = (-A31 * C5 + A32 * C3 - A34 * C1) * ivd;
    out[12] = (-A21 * C10 + A22 * C8 - A23 * C7) * ivd;
    out[13] = (A11 * C10 - A12 * C8 + A13 * C7) * ivd;
    out[14] = (-A41 * C4 + A42 * C2 - A43 * C1) * ivd;
    out[15] = (A31 * C4 - A32 * C2 + A33 * C1) * ivd;
    return out;
  }
}
