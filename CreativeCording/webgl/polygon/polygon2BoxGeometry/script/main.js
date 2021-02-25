let location1 = [];
let colors = [];
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    frameRate(60);
    let width2 = width / 2;
    let height2 = height / 2;
    let depth = width;
    let depth2 = depth / 2;
    for (let count = 0; count < 30; count++) {
        location1[count] = createVector(random(-width2, width2), random(-height2, height2), random(-depth2, depth2));
        colors[count] = color(random(20, 30), random(200, 255), random(200, 255));
    }
}

/**
 * 
 * @param {number} width 
 * @param {number} height 
 * @param {number} depth 
 */
let drawBox = (width, height, depth, fillColor) => {

    let box_data = [
        // 前面
        [
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0
        ],
        // 背面
        [
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, -1.0, -1.0
        ],
        // 上面(生のWebGLだとここは逆になるー>底面になる)
        [
            -1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, -1.0, -1.0
        ],
        // 底面(生のWebGLだとここは逆になるー>上面になる)
        [
            -1.0, 1.0, -1.0,
            -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, -1.0
        ],
        // 左側面 
        [
            -1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0,
            -1.0, 1.0, 1.0,
            -1.0, 1.0, -1.0
        ],
        // 右側面
        [
            1.0, -1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, 1.0, 1.0,
            1.0, -1.0, 1.0
        ]
    ];



    beginShape();
    //前面
    push();
    fill(fillColor);
    vertex(box_data[0][0] * width, box_data[0][1] * height, box_data[0][2] * depth);
    vertex(box_data[0][3] * width, box_data[0][4] * height, box_data[0][5] * depth);
    vertex(box_data[0][6] * width, box_data[0][7] * height, box_data[0][8] * depth);
    vertex(box_data[0][9] * width, box_data[0][10] * height, box_data[0][11] * depth);
    pop();

    //背面
    vertex(box_data[1][0] * width, box_data[1][1] * height, box_data[1][2] * depth);
    vertex(box_data[1][3] * width, box_data[1][4] * height, box_data[1][5] * depth);
    vertex(box_data[1][6] * width, box_data[1][7] * height, box_data[1][8] * depth);
    vertex(box_data[1][9] * width, box_data[1][10] * height, box_data[1][11] * depth);

    //上面(生のWebGLだとここは逆になるー>底面になる)
    vertex(box_data[2][0] * width, box_data[2][1] * height, box_data[2][2] * depth);
    vertex(box_data[2][3] * width, box_data[2][4] * height, box_data[2][5] * depth);
    vertex(box_data[2][6] * width, box_data[2][7] * height, box_data[2][8] * depth);
    vertex(box_data[2][9] * width, box_data[2][10] * height, box_data[2][11] * depth);

    // 底面(生のWebGLだとここは逆になるー>上面になる)
    vertex(box_data[3][0] * width, box_data[3][1] * height, box_data[3][2] * depth);
    vertex(box_data[3][3] * width, box_data[3][4] * height, box_data[3][5] * depth);
    vertex(box_data[3][6] * width, box_data[3][7] * height, box_data[3][8] * depth);
    vertex(box_data[3][9] * width, box_data[3][10] * height, box_data[3][11] * depth);

    //  左側面
    vertex(box_data[4][0] * width, box_data[4][1] * height, box_data[4][2] * depth);
    vertex(box_data[4][3] * width, box_data[4][4] * height, box_data[4][5] * depth);
    vertex(box_data[4][6] * width, box_data[4][7] * height, box_data[4][8] * depth);
    vertex(box_data[4][9] * width, box_data[4][10] * height, box_data[4][11] * depth);
    //  右側面
    vertex(box_data[5][0] * width, box_data[5][1] * height, box_data[5][2] * depth);
    vertex(box_data[5][3] * width, box_data[5][4] * height, box_data[5][5] * depth);
    vertex(box_data[5][6] * width, box_data[5][7] * height, box_data[5][8] * depth);
    vertex(box_data[5][9] * width, box_data[5][10] * height, box_data[5][11] * depth);
    endShape(CLOSE);

}

function draw() {
    //orbitControl();
    background(190, 205, 215);

    for (let count = 0; count < location1.length; count++) {
        push();
        rotateX( frameCount * 0.01);
        rotateY( frameCount * 0.005);
        translate(location1[count].x, location1[count].y, location1[count].z);
        drawBox(100 / 2, 100 / 2, 100 / 2, colors[count]);
        pop();
    }

}