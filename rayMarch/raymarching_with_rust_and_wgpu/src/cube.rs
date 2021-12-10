use crate::{Color, Normal, TexCoord, Vertex};
const SCALE: f32 = 50.0;
pub const VERTICES: [Vertex; 24] = [
  Vertex {
    position: (-1.0 * SCALE, -1.0 * SCALE, 1.0 * SCALE),
  },
  Vertex {
    position: (-1.0 * SCALE, 1.0 * SCALE, 1.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, 1.0 * SCALE, -1.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, -1.0 * SCALE, 1.0 * SCALE),
  },
  Vertex {
    position: (-1.0 * SCALE, 1.0 * SCALE, 1.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, 1.0 * SCALE, 1.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, 1.0 * SCALE, 1.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, 1.0 * SCALE, -1.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, -1.0 * SCALE, 1.0 * SCALE),
  },
  Vertex {
    position: (-1.0 * SCALE, 1.0 * SCALE, 1.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, 1.0 * SCALE, -1.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, -1.0 * SCALE, -1.0 * SCALE),
  },
  Vertex {
    position: (-1.0 * SCALE, -1.0 * SCALE, -1.0 * SCALE),
  },
  Vertex {
    position: (-1.0 * SCALE, -1.0 * SCALE, -1.0 * SCALE),
  },
  Vertex {
    position: (-1.0 * SCALE, -1.0 * SCALE, 1.0 * SCALE),
  },
  Vertex {
    position: (-1.0 * SCALE, 1.0 * SCALE, -1.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, -1.0 * SCALE, 1.0 * SCALE),
  },
  Vertex {
    position: (-1.0 * SCALE, 1.0 * SCALE, 1.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, 1.0 * SCALE, -1.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, -1.0 * SCALE, 1.0 * SCALE),
  },
  Vertex {
    position: (-1.0 * SCALE, 1.0 * SCALE, -1.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, -1.0 * SCALE, -1.0 * SCALE),
  },
  Vertex {
    position: (-1.0 * SCALE, -1.0 * SCALE, -1.0 * SCALE),
  },
  Vertex {
    position: (-1.0 * SCALE, -1.0 * SCALE, 1.0 * SCALE),
  },
];
pub const NORMALS: [Normal; 24] = [
  Normal {
    normal: (-0.5773502691896258, -0.5773502691896258, 0.5773502691896258),
  },
  Normal {
    normal: (-0.5773502691896258, 0.5773502691896258, 0.5773502691896258),
  },
  Normal {
    normal: (0.5773502691896258, 0.5773502691896258, -0.5773502691896258),
  },
  Normal {
    normal: (0.5773502691896258, -0.5773502691896258, 0.5773502691896258),
  },
  Normal {
    normal: (-0.5773502691896258, 0.5773502691896258, 0.5773502691896258),
  },
  Normal {
    normal: (0.5773502691896258, 0.5773502691896258, 0.5773502691896258),
  },
  Normal {
    normal: (0.5773502691896258, 0.5773502691896258, 0.5773502691896258),
  },
  Normal {
    normal: (0.5773502691896258, 0.5773502691896258, -0.5773502691896258),
  },
  Normal {
    normal: (0.5773502691896258, -0.5773502691896258, 0.5773502691896258),
  },
  Normal {
    normal: (-0.5773502691896258, 0.5773502691896258, 0.5773502691896258),
  },
  Normal {
    normal: (0.5773502691896258, 0.5773502691896258, -0.5773502691896258),
  },
  Normal {
    normal: (0.5773502691896258, -0.5773502691896258, -0.5773502691896258),
  },
  Normal {
    normal: (
      -0.5773502691896258,
      -0.5773502691896258,
      -0.5773502691896258,
    ),
  },
  Normal {
    normal: (
      -0.5773502691896258,
      -0.5773502691896258,
      -0.5773502691896258,
    ),
  },
  Normal {
    normal: (-0.5773502691896258, -0.5773502691896258, 0.5773502691896258),
  },
  Normal {
    normal: (-0.5773502691896258, 0.5773502691896258, -0.5773502691896258),
  },
  Normal {
    normal: (0.5773502691896258, -0.5773502691896258, 0.5773502691896258),
  },
  Normal {
    normal: (-0.5773502691896258, 0.5773502691896258, 0.5773502691896258),
  },
  Normal {
    normal: (0.5773502691896258, 0.5773502691896258, -0.5773502691896258),
  },
  Normal {
    normal: (0.5773502691896258, -0.5773502691896258, 0.5773502691896258),
  },
  Normal {
    normal: (-0.5773502691896258, 0.5773502691896258, -0.5773502691896258),
  },
  Normal {
    normal: (0.5773502691896258, -0.5773502691896258, -0.5773502691896258),
  },
  Normal {
    normal: (
      -0.5773502691896258,
      -0.5773502691896258,
      -0.5773502691896258,
    ),
  },
  Normal {
    normal: (-0.5773502691896258, -0.5773502691896258, 0.5773502691896258),
  },
];
pub const COLORS: [Color; 24] = [
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
  Color {
    color: (1.0, 1.0, 1.0, 1.0),
  },
];
pub const TEXCOORD: [TexCoord; 24] = [
  TexCoord {
    texcoord: (0.0, 0.0),
  },
  TexCoord {
    texcoord: (0.0, 1.0),
  },
  TexCoord {
    texcoord: (1.0, 0.0),
  },
  TexCoord {
    texcoord: (0.0, 1.0),
  },
  TexCoord {
    texcoord: (1.0, 1.0),
  },
  TexCoord {
    texcoord: (1.0, 0.0),
  },
  TexCoord {
    texcoord: (0.0, 1.0),
  },
  TexCoord {
    texcoord: (1.0, 0.0),
  },
  TexCoord {
    texcoord: (0.0, 0.0),
  },
  TexCoord {
    texcoord: (0.0, 1.0),
  },
  TexCoord {
    texcoord: (1.0, 0.0),
  },
  TexCoord {
    texcoord: (0.0, 1.0),
  },
  TexCoord {
    texcoord: (1.0, 1.0),
  },
  TexCoord {
    texcoord: (1.0, 0.0),
  },
  TexCoord {
    texcoord: (0.0, 1.0),
  },
  TexCoord {
    texcoord: (1.0, 0.0),
  },
  TexCoord {
    texcoord: (0.0, 0.0),
  },
  TexCoord {
    texcoord: (0.0, 1.0),
  },
  TexCoord {
    texcoord: (1.0, 0.0),
  },
  TexCoord {
    texcoord: (0.0, 1.0),
  },
  TexCoord {
    texcoord: (1.0, 1.0),
  },
  TexCoord {
    texcoord: (1.0, 0.0),
  },
  TexCoord {
    texcoord: (0.0, 1.0),
  },
  TexCoord {
    texcoord: (1.0, 0.0),
  },
];
pub const INDICES: [u16; 36] = [
  0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16,
  18, 19, 20, 21, 22, 20, 22, 23,
];
