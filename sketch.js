var PLAY=1
var END=0;
var gameState=PLAY;
var pikachu1;
var stopper1;
var stopper2;
var stopper3;
var gameover;
var restart;
var particle;
var playground1;
var playground2;
var playground3;
var life;
var time;
var speed;
var points;
var added;
var highscore;
var Season10Sound;
var particleGroup;
var pikachuImage1;
var pikachuImage2;
var pikachuImage3;
var gameoverImage;
var restartImage;
var particleImage;
var playgroundImage1;
function preload(){
Season10Sound=loadSound("Pokemon Season 10.wav");
pikachuImage1=loadAnimation("pikachu1.png","pikachu2.png","pikachu3.png","pikachu4.png");
pikachuImage2=loadAnimation("pikachu10.png");
pikachuImage3=loadAnimation("pikachu11.png");
gameoverImage=loadImage("gameover.png");
restartImage=loadImage("restart.png");
particleImage=loadImage("particle.png");
playgroundImage1=loadAnimation("tunnel17.png");
}
function setup() {
createCanvas(2400,1200);
pikachu1=createSprite(600,1015,20,20);
pikachu1.addAnimation("running",pikachuImage1);
pikachu1.addAnimation("attacking",pikachuImage2);
pikachu1.addAnimation("defeated",pikachuImage3);
pikachu1.lifetime=500;
stopper1=createSprite(1200,1175,2400,20);
stopper1.visible=false;
stopper2=createSprite(1200,90,2400,20);
stopper2.visible=false;
stopper3=createSprite(-1500,600,20,1200);
stopper3.visible=false;
gameover=createSprite(1200,200,20,20);
gameover.addImage(gameoverImage);
gameover.scale=0.5;
gameover.depth=1;
restart=createSprite(1200,1100,20,20);
restart.addImage(restartImage);
restart.scale=1.5;
restart.depth=1;
playground1=createSprite(1200,600,20,20);
playground1.addAnimation("level1",playgroundImage1);
playground1.scale=8;
playground2=createSprite(3600,600,20,20);
playground2.addAnimation("level1",playgroundImage1);
playground2.scale=8;
playground2=createSprite(3600,600,20,20);
playground2.addAnimation("level1",playgroundImage1);
playground2.scale=8;
playground3=createSprite(1200,600,20,20);
playground3.addAnimation("level1",playgroundImage1);
playground3.scale=8;
playground3.depth=1.5;
life=0;
time=0;
speed=0;
points=0;
added=0;
highscore=0;
particleGroup=createGroup();
}
function draw(){
background("red");
if(gameState===PLAY){
Season10Sound.play();
pikachu1.collide(stopper1);
pikachu1.bounceOff(stopper2);
playground1.velocityX=-(10+1*time/100);
playground2.velocityX=-(10+1*time/100);
playground3.velocityX=-(10+1*time/100);
life=pikachu1.lifetime;
time=time+Math.round(getFrameRate()/60);
speed=playground2.velocityX+ Math.round(0);
spawnParticles();
if(pikachu1.y<1000&&pikachu1.isTouching(particleGroup)){
pikachu1.lifetime=pikachu1.lifetime+250;
points=points+1;
added=added+250;
particleGroup.destroyEach();
}
if(pikachu1.lifetime===1){
pikachu1.lifetime=-1;
gameState=END;
}
if(keyDown("space")&&pikachu1.y>=900){
pikachu1.velocityY=-12
}
if(pikachu1.velocityY===-12){
pikachu1.changeAnimation("attacking",pikachuImage2);
}
if(pikachu1.y>=900){
pikachu1.changeAnimation("running",pikachuImage1);
}
if(playground1.x<-1195){
playground1.x=3600;
}
if(playground2.x<-1195){
playground2.x=3600;
}
if(particleGroup.isTouching(stopper3)){
particleGroup.destroyEach();
}
}
if(gameState===END){
background("blue");
pikachu1.x=1200;
pikachu1.y=700;
pikachu1.changeAnimation("defeated",pikachuImage3);
gameover.depth=2;
restart.depth=2;
playground1.depth=0.5;
playground2.depth=0.5;
playground3.x=1200;
particleGroup.destroyEach();
if(highscore<time){
highscore=time;
}
if(mousePressedOver(restart)){
reset();
}
}
drawSprites();
fill("red");
textSize(15);
text("life left: "+life,25,25);
fill("red");
textSize(15);
text("score: "+time,25,50);
fill("red");
textSize(15);
text("pokemon speed"+speed,25,75);
fill("red");
textSize(15);
text("particles destroyed: "+points,25,100);
fill("red");
textSize(15);
text("life added: "+added,25,125);
fill("red");
textSize(15);
text("High Score: "+highscore,25,150);
}
function reset(){
gameState=PLAY;
pikachu1.lifetime=500;
pikachu1.x=600;
pikachu1.y=980;
pikachu1.changeAnimation("running",pikachuImage1);
gameover.depth=0.5;
restart.depth=0.5;
playground1.x=1200;
playground1.depth=2;
playground2.x=3600;
playground2.depth=3;
time=0;
points=0;
added=0;
}
function spawnParticles(){
if(frameCount%150===0){
var rando=Math.round(random(100,1000));
var particle=createSprite(2500,rando,10,40);
particle.velocityX=-(10+1*time/100);
particle.addImage(particleImage);     
particleGroup.add(particle);
pikachu1.depth=pikachu1.depth+10;
}
}
