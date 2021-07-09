let location2;
let velocity2;
let init_location;
let init_radius = [];
let init_color = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noStroke();
    location2 = createVector(0, 0);
    velocity2 = createVector(0.5, 0.5);
    init_location = createVector(width / 2, height / 2);
    set_init_location();
}

let set_init_location = () => {
    const STAT_MAX = 10;
    let dict_color = ["#ffffff", "#7cfc00", "#87cefa"];
    for(let count = 0; count < STAT_MAX; count++){
        //constrain mapを使う
        tmp_init_color = int(random(0, dict_color.length));
        tmp_init_radius = random(10, 300);
        init_color.push(dict_color[tmp_init_color]);
        init_radius.push(tmp_init_radius);
    }
}

function draw() {

    fill(0, 0, 25, 10);
    rect(0, 0, width, height);
    
    translate(init_location.x, init_location.y);
    for (let count = 0; count < init_color.length; count++) {
        location2.add(velocity2);
        let x = cos(location2.x) * init_radius[count];
        let y = sin(location2.x) * init_radius[count];
        fill(init_color[count]);
        circle(x, y, 5);
    }

}