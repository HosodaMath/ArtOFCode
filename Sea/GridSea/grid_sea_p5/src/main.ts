/// Grid Sea(Art Of Code用 Processing)
import p5 from "p5";
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.stroke(150, 250, 150);
  };


  p.draw = () => {
    p.background("#ffffff");
    let size = p.width * 0.1;
    p.push();
    /// ライトを暗めに設定したらどうなる？
    p.pointLight(100, 100, 100, 0, 0, 0);
    p.ambientMaterial(25, 200, 200)
    for(let x = -p.width; x < p.width; x+=size){
      for(let y = -p.height; y < p.height; y+=size){
        p.push();
        //
       
        //p.fill(25, 200, 200);
        p.translate(x, y, -200);
        p.rotateX(p.millis() * 0.001);
        //p.rotateY(p.millis() * 0.001);
        p.box(size);
        p.pop();
      }
    }
    p.pop();
  };
};

new p5(sketch);
