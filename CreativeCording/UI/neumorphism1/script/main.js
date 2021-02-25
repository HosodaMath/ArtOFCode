function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    rectMode(CENTER);
}

let drawTitle = (tmp_text = "Neumorphism1") => {
    let location = createVector(width / 2, height / 2);
    push();
    drawingContext.shadowColor = "#00000050";
    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = 5;
    drawingContext.shadowBlur = 10;
    fill("#ffe4b5");
    textSize(64);
    textAlign(CENTER, CENTER);
    text(tmp_text, location.x, location.y);
    pop();
    push();
    drawingContext.shadowColor = "#ffffff50";
    drawingContext.shadowOffsetX = -5;
    drawingContext.shadowOffsetY = -5;
    drawingContext.shadowBlur = 10;
    fill("#ffe4b5");
    textStyle(BOLD);
    textSize(64);
    textAlign(CENTER, CENTER);
    text(tmp_text, location.x, location.y);
    pop();
}

class Neumorphism1 {
    constructor(location, size) {
        this.location = location;
        this.size = size;
    }

    button_rect1 = (fillColor) => {
        push();
        drawingContext.shadowColor = "#00000050";
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = 5;
        drawingContext.shadowBlur = 10;
        fill(fillColor);
        rect(this.location.x, this.location.y, this.size.x, this.size.y, 10, 10);
        pop();
        push();
        drawingContext.shadowColor = "#ffffff50";
        drawingContext.shadowOffsetX = -5;
        drawingContext.shadowOffsetY = -5;
        drawingContext.shadowBlur = 10;
        fill(fillColor);
        rect(this.location.x, this.location.y, this.size.x, this.size.y, 10, 10);
        pop();
    }

    button_ellipse1 = (fillColor) => {
        push();
        drawingContext.shadowColor = "#00000050";
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = 5;
        drawingContext.shadowBlur = 10;
        fill(fillColor);
        ellipse(this.location.x, this.location.y, this.size.x, this.size.y);
        pop();
        push();
        drawingContext.shadowColor = "#ffffff50";
        drawingContext.shadowOffsetX = -5;
        drawingContext.shadowOffsetY = -5;
        drawingContext.shadowBlur = 10;
        fill(fillColor);
        ellipse(this.location.x, this.location.y, this.size.x, this.size.y);
        pop();
    }
}

let render_button_rect = () => {
    let location1 = createVector(width / 4, height / 4 );
    let size1 = createVector(width / 10, width / 10);
    
    button1 = new Neumorphism1(location1, size1);
    button1.button_rect1(color(240, 240, 255));

    let location2 = createVector(width / 2, height / 4 );
    let size2 = createVector(width / 10, width / 10);
    
    button2 = new Neumorphism1(location2, size2);
    button2.button_rect1(color(100, 240, 100));

    let location3 = createVector(width - width / 4, height / 4 );
    let size3 = createVector(width / 10, width / 10);
    
    button3 = new Neumorphism1(location3, size3);
    button3.button_rect1(color(100, 100, 240));
}

let render_button_ellipse = () => {
    let location1 = createVector(width / 4, height - height / 4);
    let size1 = createVector(width / 10, width / 10);

    button1 = new Neumorphism1(location1, size1);
    button1.button_ellipse1(color(240, 240, 255));

    let location2 = createVector(width / 2, height - height / 4 );
    let size2 = createVector(width / 10, width / 10);
    
    button2 = new Neumorphism1(location2, size2);
    button2.button_ellipse1(color(100, 240, 100));

    let location3 = createVector(width - width / 4, height - height / 4 );
    let size3 = createVector(width / 10, width / 10);
    
    button3 = new Neumorphism1(location3, size3);
    button3.button_ellipse1(color(100, 100, 240));
}

/*
let grid = () => {
    push();
    stroke("#000000");
    beginShape()
    vertex(width / 2, 0);
    vertex(width / 2, height);
    endShape()
    beginShape()
    vertex(0, height / 2.0);
    vertex(width, height / 2.0);
    endShape()
    pop();
}*/

function draw() {
    background("#BECDD7");
   

    drawTitle();
    render_button_rect();
    render_button_ellipse();
}