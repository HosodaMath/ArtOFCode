let location2;
let velocity2;
let init_location_x = [];
let init_location_y = [];
let init_color = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noStroke();
    location2 = createVector(0, 0);
    velocity2 = createVector(0.5, 0.5);
    set_init_location();
}

let set_init_location = () => {
    const STAT_MAX = 10;
    for(let count = 0; count < STAT_MAX; count++){
        //constrain mapを使う
        tmp_init_location_x = random(width / 4.0, width - width / 4.0);
        tmp_init_location_y = random(height / 4.0, height - height / 4.0);
        init_location_x.push(tmp_init_location_x);
        init_location_y.push(tmp_init_location_y);
        tmp_init_color = color(random(1, 250), random(1, 250), random(1, 250));
        init_color.push(tmp_init_color);
    }
}

function draw() {
    fill(0, 0, 30, 30);
    rect(0, 0, width, height);
    for (let count = 0; count < init_location_x.length; count++) {
        push();
        translate(init_location_x[count], init_location_y[count]);
        location2.add(velocity2);
        let x = cos(location2.x) * 200;
        let y = sin(location2.x) * 200;
        fill(init_color[count]);
        circle(x, y, 5);
        pop();
    }

    /*
    if(0 >  location2.x || width < location2.x ){
        velocity2.x *= -1;
    }

    if(0 >  location2.y || height < location2.y ){
        velocity2.y *= -1;
    }*/

}