function setup() {
    createCanvas(windowWidth, windowHeight);

}

function draw() {
    let noiseScale = 0.02;
    background(0, 0, 0);
    for(let count = 0; count < width; count++){
        let value = noise((mouseX + count) * noiseScale, (mouseY + count) * noiseScale );
        stroke(value * 155, value * 255, 0);
        line(0, mouseX+value*80, count, height);
    }
}