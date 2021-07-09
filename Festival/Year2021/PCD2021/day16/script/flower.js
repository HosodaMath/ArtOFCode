class Flower {
    constructor(location1, radius) {
        this.location1 = location1;
        this.radius = radius;
    }

    setFlower = (k) => {
        let data = []
        for (let count = 0; count < PI * 4.0; count += 0.01) {
            let x = cos(k * count) * cos(count) * radius;
            let y = cos(k * count) * sin(count) * radius;
            let tmp = new Vector2(x, y);
            data.push_back(tmp);
        }

        return data;
    }

    drawFlower = (color_data, k = 4.0) => {
        let n = this.setFlower(k).length;
        let data = this.setFlower(k);
        fill(color_data);
        stroke(255, 255, 255, random(10, 20));
        push();
        beginShape();
        for (let count = 0; count < n; count++) {
            vertex(data[count].x, data[count].y);
        }
        endShape();
        pop();
    }
}

