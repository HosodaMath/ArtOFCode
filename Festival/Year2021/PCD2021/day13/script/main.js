let flower_location_data = [];
let flower_color = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    set_flower_data();

}


//blue air
let set_background = () => {

    let grad_color = drawingContext.createLinearGradient(
        width / 2.0, 0, width / 2.0, height);

    grad_color.addColorStop(0, "#1ab6ff");
    grad_color.addColorStop(0.5, "#5dd5ff");
    grad_color.addColorStop(1.0, "#d3ffff");

    drawingContext.fillStyle = grad_color;

    rect(0, 0, width, height);
}

let set_flower = (flower_location, radius, k = 4.0) => {
    const K = k;
    let flower_data = [];
    for (let count = 0; count < Math.PI * 4.0; count += 0.01) {
        let x = cos(K * count) * cos(count) * radius;
        let y = cos(K * count) * sin(count) * radius;
        let tmp = createVector(x + flower_location.x, y + flower_location.y);
        flower_data.push(tmp);
    }

    return flower_data
}

let set_flower_data = () => {
    const COLOR_DATA = ["#ff99ff", "#ffb033", "#bdff34"];
    for (let count = 0; count < 20; count++) {
        let tmp = createVector(random(0, width), random(0, height - 300));
        let tmp_radius = random(30, 100);
        let flower_data_tmp = set_flower(tmp, tmp_radius, random(3, 5));
        flower_location_data.push(flower_data_tmp);
        flower_color.push(COLOR_DATA[int(random(0, 3))]);
    }
}

let polygon = (data, color_data) => {
    push();
    stroke("#ffffff");
    fill(color_data);
    beginShape();
    for(let count = 0; count < data.length; count++){
        vertex(data[count].x, data[count].y);
    }
    endShape();
    pop();
}

let render_flower = () => {
   for(let count = 0; count < flower_location_data.length; count++){
        polygon(flower_location_data[count], flower_color[count]);
   }
}


let draw_grass = () => {
    let grad_color = drawingContext.createLinearGradient(
        width / 2.0, height - 500, width / 2.0, height);

    grad_color.addColorStop(0, "#46ff00");
    grad_color.addColorStop(0.5, "#65dc70");
    grad_color.addColorStop(1.0, "#03ce6a");

    drawingContext.fillStyle = grad_color;

    push();
    beginShape();
    vertex(0, height);
    vertex(0, height - 350);
    bezierVertex(
        width / 4.0, height - 500,
        width - width / 4.0, height - 500,
        width, height - 350
    );
    vertex(width, height);
    endShape(CLOSE);
    pop();
}


function draw() {
    const BLACK = "#000000";
    background(BLACK);
    set_background();
    render_flower();
    draw_grass();
    
}