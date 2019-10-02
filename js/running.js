let person;

function setup() {
    createCanvas(800, 600);
    person = new Person();
}

function draw() {
    background(51);
    // offset person
    translate(-person.pos.x + 50, 0);
    // var force = createVector(-0.01, 0);

    var gravity = createVector(0,0.1);
    person.applyForce(gravity);

    // person.applyForce(force);
    person.update();
    person.display();
    person.edges();

    fill(255);
    rect(400, height - 50, 50, 50);
    // for (var x = 0; x <= width; x+= 50) {
    //     for (var y = 0; y <= height; y+= 50) {
    //         fill(random(0, [255]), random(0, [255]), random(0, [255]));
    //         rect(x, height - 50, 50, 50);
    //     }
    // }
 
}


function keyPressed(){
    if(key==' '){
        var jump = createVector(0,-5);
        person.applyForce(jump);
    }
}



// person func
function Person() {
    this.pos = createVector(50, height);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);


    this.applyForce = function (force) {
        var f = force.copy();
        this.acc.add(f);
    }
    this.update = function () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }


    this.display = function () {
        fill(255, 0, 100);
        stroke(255, 0, 100);
        rect(this.pos.x, this.pos.y - 50, 20, 50);
    }
    this.edges = function() {
        if (this.pos.y > height) {
          this.vel.y *= 0;
          this.pos.y = height;
        }
    
        if (this.pos.x > width) {
          this.vel.x *= 0;
          this.pos.x = width;
        }
    }
}