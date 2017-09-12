//var xsize = 600;
//var ysize = 600;
var xsize = innerWidth-20;
var ysize = innerHeight-20;
var balletje;
var bal2;
var bal3;
var img;
var pad;
var gameOver = false;
var timeStart = 0;
var balls = [];
var numBalls = 15;

function setup() {
  //size(xsize, ysize);
  createCanvas(xsize, ysize);
  noStroke();
  //stroke(255);
  ellipse(50, 50, 25, 25);
  img = loadImage("moonwalk.png");
  //println("hello web!");
  //balletje = new Ball();
  //balletje = new Ball(100, 50, 50, 2, 1, 255);

  for (var i = 0; i < numBalls; i++){
    balls.push(new Ball(Math.random()*xsize, Math.random()*ysize, Math.random()*20+5, Math.random()*10-5, Math.random()*10-5, color(102, 240, 5)));
    console.log(balls);
    //balletje = new Ball(50, 30, 20, 1.5, 0.5, color(102, 240, 5));
    //bal2 = new Ball(150, 50, 10, -2.1, 1, 100);
    //bal3 = new Ball(200, 50, 30, 2, 4, 100);
  }
  pad = new Pad();
  timeStart = millis();
}

function achtergrond() {
  // Maak hier de achtergrond
  background(255);
}

function draw(){
  achtergrond();
  if (!gameOver){
    textSize(32);
    fill(0);
    text(Math.round((millis()-timeStart))/1000, 10, 30);
    for (var i = 0; i < balls.length; i++){
      balls[i].display();
      balls[i].beweeg();
      balls[i].botsCheck(pad);
      //balletje.display();
      //bal2.display();
      //bal3.display();
    }
    pad.display();
    pad.move();
    //balletje.beweeg(xsize, ysize);
    //bal2.beweeg(xsize, ysize);
    //bal3.beweeg(xsize, ysize);

    //balletje.botsCheck(pad);
    //bal2.botsCheck(pad);
    //bal3.botsCheck(pad);
  }else{
    fill(0);
    text("Time you lasted " + str(Math.round((millis()-timeStart))/1000) + " seconds.", 10, 30);
    noLoop();
  }
}


/*
function keyPressed(){
  if (keyCode === UP_ARROW){
    pad.ypos -= 10;
  } else if (keyCode === DOWN_ARROW){
    pad.ypos += 10;
  }
}
*/
function Pad() {
  this.padHeight = 40;
  this.padWidth = 10;
  this.radius = 20;
  this.xpos = width/2;
  this.ypos = height/2;
  this.speed = ysize/100;

  this.display = function() {
    fill(255, 0, 0);
    //rect(this.xpos, this.ypos, this.padWidth, this.padHeight);
    ellipse(this.xpos, this.ypos, 2*this.radius, 2*this.radius);
  }

  this.move = function() {
    if (this.ypos >= this.radius && this.ypos <= ysize - this.radius){
      if (keyIsDown(UP_ARROW)){
        pad.ypos -= this.speed;
      } else if (keyIsDown(DOWN_ARROW)){
        pad.ypos += this.speed;
      } else if (keyIsDown(LEFT_ARROW)){
        pad.xpos -= this.speed;
      } else if (keyIsDown(RIGHT_ARROW)){
        pad.xpos += this.speed;
      }
    } else if (this.ypos < this.radius){
      this.ypos = this.radius;
    } else {
      this.ypos = ysize - this.radius;
    }
  }
}

function Ball(xpos, ypos, radius, xspeed, yspeed, kleur) {
  /*this.xpos;
  this.ypos;
  this.this.radius;
  this.xspeed;
  this.yspeed;
  this.kleur;
*/
/*
  this.Ball = function() {
  }
*/
  this.xpos = xpos;
  this.ypos = ypos;
  this.radius = radius;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.kleur = kleur;

  if(this.xpos < 0 || this.xpos > width){
    this.xpos = this.radius;
  }

  if(this.ypos < 0 || this.ypos > height){
    this.ypos = this.radius;
  }


  /* Ook weer balletje
  if(this.xpos < this.radius){
    this.xpos = this.radius;
  }

  if(this.ypos < this.radius){
    this.ypos = this.radius;
  }
  */

/*
  this.xpos = 0;
  this.ypos = 0;
  this.radius = 20;
  this.xspeed = 0;
  this.yspeed = 0;
  this.kleur = color(255);
*/
/*
  this.Ball = function(xpos, ypos, radius, xspeed, yspeed, kleur) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.kleur = kleur;
  }
*/
/*
  this.Ball = function(xpos, ypos, radius, xspeed, yspeed, kleur) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.kleur = kleur;
  }
*/
  this.display = function() {
    fill(this.kleur);
    //image(img, this.xpos, this.ypos, this.radius, this.radius);
    //console.log(this.xpos);
    ellipse(this.xpos,this.ypos,2*this.radius,2*this.radius);
    //rect(this.xpos, this.ypos, this.radius, this.radius);
    //ellipse(50,100,10,20);
  }

  this.beweeg = function(xsize, ysize) {
    // Dit bouncen is niet netjes en is te zien bij hoge snelheden
    //Bovendien geeft dit nog problemen als het objcet buiten het canvas begint

    // Dit is bewegen met een balletje. Er wordt met de straal rekening gehouden
    if (this.xpos > width - this.radius || this.xpos < this.radius){
      //this.xspeed = -this.xspeed*(Math.random()/5+0.9);
      this.xspeed = -this.xspeed*(Math.random()/10+1);
    }
    if (this.ypos > height - this.radius || this.ypos < this.radius){
      //this.yspeed = -this.yspeed*(Math.random()/5+0.9);
      this.yspeed = -this.yspeed*(Math.random()/10+1);
    }

    /*
    // Bouncen voor image
    if (this.xpos > width || this.xpos < 0){
      this.xspeed = -this.xspeed;
    }
    if (this.ypos > height || this.ypos < 0){
      this.yspeed = -this.yspeed;
    }
    */

    this.xpos += this.xspeed;//*Math.random();
    this.ypos += this.yspeed;//*Math.random();
  }

  this.botsCheck = function(pad) {
    //console.log("Check");
    /*
    if (this.ypos <= pad.ypos + pad.height &&
        this.ypos >= pad.ypos &&
        this.xpos <= pad.xpos + pad.width &&
        this.xpos >= pad.xpos
      ){
        console.log("Collide!");
    }
    */
    var dx = this.xpos-pad.xpos;
    var dy = this.ypos-pad.ypos;
    if (Math.sqrt(dx*dx+dy*dy) <= this.radius + pad.radius){
      //alert("NIET BOTSEN!");
      //console.log("Collide!");
      gameOver = true;
    }
  }
}
