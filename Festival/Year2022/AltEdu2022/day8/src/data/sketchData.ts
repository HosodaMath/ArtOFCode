import SketchImage from "../assets/sketch/sketch.png"
export type SketchType = {
  sketchID: number;
  sketchTitle: string;
  sketchSrc: string;
  sketchDescription: string;
  skillList: string[];
};

export const sketchData: SketchType[] = [
  {
    sketchID: 1,
    sketchTitle: "Plane Canvas",
    sketchSrc: SketchImage,
    sketchDescription: `Day7で作った比較用です。Day7で作成したものとアニメーションしていないこと以外、基本的に変わりません。`,
    skillList: ["p5.js", "TypeScript"],
  },
  {
    sketchID: 2,
    sketchTitle: "Canvas CSS Transformer",
    sketchSrc: SketchImage,
    sketchDescription: `CSS Transformとp5.jsで作った簡単なアニメーションです。`,
    skillList: ["p5.js", "TypeScript", "CSS"],
  },
  {
    sketchID: 3,
    sketchTitle: "Canvas Sound",
    sketchSrc: SketchImage,
    sketchDescription: `Web Audio APIでcanvas自体を動かしています。`,
    skillList: ["p5.js", "TypeScript", "CSS", "Web Audio API"],
  },
];
