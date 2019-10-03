// OOP style

class Dino {
    constructor() {
        this.r = 50;
        this.x = 50;
        this.y = height - this.r;
        // setting physic 
        this.v = 0;
        this.g = 2;
    }
    jump() {
        if (this.y == height - this.r || this.y == 50) {
            this.v = -30;
        }

    }
    hits(pipe) {
        let x1 = this.x + this.r * 0.5;
        let y1 = this.y + this.r * 0.5;
        let x2 = pipe.x + pipe.r * 0.5;
        let y2 = pipe.y + pipe.r * 0.5;
        return collideCircleCircle(x1, y1, this.r, x2, y2, pipe.r);

    }
    move() {
        this.y += this.v;
        this.v += this.g;
        this.y = constrain(this.y, 0, height - this.r)
    }
    show() {
        image(chImg, this.x, this.y, this.r, this.r)
    }
}
