/// 頂点数のみその場で生成(色数に依存)
import p5 from "p5";
const sketch = (p: p5) => {
  const MAX = 100;
  //ここはカラーセットなので2次元配列です。
  let colors: p5.Color[][] = [];
  let position: p5.Vector[] = [];
  let radius: number[] = [];
  let depth: number = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    //p.noLoop(); /// <- 値の確認用
    p.noStroke();
    p.colorMode("rgb", 1.0);
    p.angleMode("degrees");
    /// 色の設定
    for (let count = 0; count < MAX; count++) {
      let choice_vert_number = p.floor(p.random(3, 7));
      colors[count] = setColor(choice_vert_number);
    }

    /// 座標と大きさの設定
    setPositionData();
  };

  const setColor = (n: number) => {
    const COLORS_DATA = [
      p.color(1.0, 0.0, 0.0),
      p.color(1.0, 0.5, 0.0),
      p.color(1.0, 0.5, 0.5),
      p.color(1.0, 1.0, 0.0),
      p.color(1.0, 1.0, 0.5),
    ];

    let init_color_set: p5.Color[] = [];
    for (let count = 0; count < n; count++) {
      let color_choice = p.floor(p.random(0, COLORS_DATA.length));
      init_color_set[count] = COLORS_DATA[color_choice];
    }

    return init_color_set;
  };

  const setPositionData = () => {
    depth = p.width;
    for (let count = 0; count < MAX; count++) {
      let init_position_data = p.createVector(
        p.random((-1 * p.width) / 2.0, p.width / 2.0),
        p.random((-1 * p.height) / 2.0, p.height / 2.0),
        p.random(0.0,-1 * depth / 2.0)
      );
      position.push(init_position_data);

      let init_radius = p.random(50, 100);
      radius.push(init_radius);
    }
  };

  const render = (color: p5.Color[], size: number) => {
    const N = color.length;
    const ANGLE = p.TWO_PI / N;
    console.log(N);
    p.beginShape();
    for (let count = 0; count < N; count++) {
      let x = Math.cos(ANGLE * count) * size;
      let y = Math.sin(ANGLE * count) * size;
      console.log(x, y);
      p.fill(color[count]);
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);
  };

  p.draw = () => {
    // p.orbitControl();
    p.background("#000000");

    for (let count = 0; count < colors.length; count++) {
      p.push();
      p.translate(position[count].x, position[count].y, position[count].z);
      render(colors[count], radius[count]);
      p.pop();
      /// 正常に出力されているかどうかの確認用
    
      //console.log(colors[count]);
      //console.log(position[count]);
      //console.log(radius[count]);
    }
  };
};

new p5(sketch);
