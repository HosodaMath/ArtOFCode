/// 頂点数のみその場で生成(色数に依存)
final int MAX = 100;
ArrayList<ArrayList<Integer>> colors;
ArrayList<PVector> position;
ArrayList<Float> radius;
float depth;
void setup() {
  fullScreen(P3D);
  //noLoop(); /// <- 値の確認用
  noStroke();
  colorMode(RGB, 1.0);
  position = new ArrayList<PVector>();
  radius = new ArrayList<Float>();
  colors = new ArrayList<ArrayList<Integer>>();
  /// 色の設定
  for(int count = 0; count < MAX; count++){
    int choice_vert_number = floor(random(3, 7));
    colors.add(setColor(choice_vert_number));
  }

  /// 座標と大きさの設定
  setPositionData();
  
}

/// nは頂点数
 ArrayList<Integer> setColor(int n){
  color[] COLORS_DATA = {
    color(1.0, 0.0, 0.0), 
    color(1.0, 0.5, 0.0), 
    color(1.0, 0.5, 0.5),
    color(1.0, 1.0, 0.0), 
    color(1.0, 1.0, 0.5)
  };
  ArrayList<Integer> init_color_set = new ArrayList<Integer>();
  
  for(int count = 0; count < n; count++){
    int color_choice = floor(random(0, COLORS_DATA.length));
    init_color_set.add(COLORS_DATA[color_choice]);
  }

  return init_color_set;
}

void setPositionData(){
  depth = width;
  for (int count = 0; count < MAX; count++) {
      PVector init_position_data = new PVector(
        random(0, width), 
        random(0, height),
        random(0,-1 * depth)
      );
      position.add(init_position_data);

      float init_radius = random(50, 100);
      radius.add(init_radius);
    }
}

void render(ArrayList<Integer> colors, float size ){
  final int N = colors.size();
  final float ANGLE = TWO_PI / N;
  beginShape();
  for (int count = 0; count < N; count++) {
    float x = cos(ANGLE * count) * size;
    float y = sin(ANGLE * count) * size;
    fill(colors.get(count));
    vertex(x, y);
  }
  endShape(CLOSE);
}

void draw() {
  background(0, 0, 0);
  for(int count = 0; count < colors.size(); count++){
    pushMatrix();
    translate(position.get(count).x, position.get(count).y, position.get(count).z);
    render(colors.get(count),radius.get(count));
    popMatrix();
    /// 正常に出力されているかどうかの確認用
    /*
    System.out.println(colors.get(count));
    System.out.println(position.get(count).x + "," + position.get(count).y + "," + position.get(count).z);
    System.out.println(radius.get(count));
    */

   saveFrame("capture_data/#######.png");
  }
}
