function Score() {
  this.score = 0;

  this.display = function (){
    fill(255);
    textSize(50)
    
    text(this.score,2, 50);
  }

  this.increment = function () {
    this.score++;
  }

}
