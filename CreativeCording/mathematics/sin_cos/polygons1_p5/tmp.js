/// openProcessing NEORT用
const MAX = 100;
//ここはカラーセットなので2次元配列です。
let colors = [];
let position = [];
let radius = [];
let depth = 0;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //p.noLoop(); /// <- 値の確認用
  noStroke();
  colorMode("rgb", 1.0);
  angleMode("degrees");
  /// 色の設定
  for (let count = 0; count < MAX; count++) {
    let choice_vert_number = floor(random(3, 7));
    colors[count] = setColor(choice_vert_number);
  }

  /// 座標と大きさの設定
  setPositionData();
}

function setColor(n) {
  const COLORS_DATA = [
    color(1.0, 0.0, 0.0),
    color(1.0, 0.5, 0.0),
    color(1.0, 0.5, 0.5),
    color(1.0, 1.0, 0.0),
    color(1.0, 1.0, 0.5),
  ];

  let init_color_set = [];
  for (let count = 0; count < n; count++) {
    let color_choice = floor(random(0, COLORS_DATA.length));
    init_color_set[count] = COLORS_DATA[color_choice];
  }

  return init_color_set;
}

function setPositionData() {
  depth = width;
  for (let count = 0; count < MAX; count++) {
    let init_position_data = createVector(
      random((-1 * width) / 2.0, width / 2.0),
      random((-1 * height) / 2.0, height / 2.0),
      random(0.0, (-1 * depth) / 2.0)
    );
    position.push(init_position_data);

    let init_radius = random(50, 100);
    radius.push(init_radius);
  }
}

function render(color, size) {
  const N = color.length;
  const ANGLE = TWO_PI / N;
  beginShape();
  for (let count = 0; count < N; count++) {
    let x = Math.cos(ANGLE * count) * size;
    let y = Math.sin(ANGLE * count) * size;
    fill(color[count]);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function draw() {
  background("#000000");

  for (let count = 0; count < colors.length; count++) {
    push();
    translate(position[count].x, position[count].y, position[count].z);
    render(colors[count], radius[count]);
    pop();
    /// 正常に出力されているかどうかの確認用

    //console.log(colors[count]);
    //console.log(position[count]);
    //console.log(radius[count]);
  }
}
