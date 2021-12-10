use crate::{Color, Normal, TexCoord, Vertex};
const SCALE: f32 = 80.0;

pub const COLOR: [Color; 4] = [
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


pub const VERTICES: [Vertex; 4] = [
  Vertex {
    position: (-1.0 * SCALE, 1.0 * SCALE, 0.0 * SCALE),
  },
  Vertex {
    position: (-1.0 * SCALE, -1.0 * SCALE, 0.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, -1.0 * SCALE, 0.0 * SCALE),
  },
  Vertex {
    position: (1.0 * SCALE, 1.0 * SCALE, 0.0 * SCALE),
  },
];

pub const NORMALS: [Normal; 4] = [
  Normal {
    normal: (0.0, 0.0, 1.0),
  },
  Normal {
    normal: (0.0, 0.0, 1.0),
  },
  Normal {
    normal: (0.0, 0.0, 1.0),
  },
  Normal {
    normal: (0.0, 0.0, 1.0),
  },
];

pub const TEXCOORD: [TexCoord; 4] = [
  TexCoord {
    texcoord: (1.0, 0.0),
  },
  TexCoord {
    texcoord: (0.0, 0.0),
  },
  TexCoord {
    texcoord: (1.0, 1.0),
  },
  TexCoord {
    texcoord: (0.0, 1.0),
  },
];

pub const INDICES: [u16; 6] = [0, 1, 2, 0, 2, 3];
