var Mario, Mario_running, Mario_collided;
var ground, invisibleGround, groundImage;
var GameOver,restart,restartImage,GameoverImage

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3

var score;
var PLAY = 1
var END = 0
var gamestate = PLAY


function preload(){
  Mario_running = loadAnimation("Mario.png");
  Mario_collided = loadAnimation("Mario_Collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("Obstacle.png");
  obstacle2 = loadImage("Obstacle2.png");
  obstacle3 = loadImage("Obstacle3.png");


  GameoverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  Mario = createSprite(50,height/2,20,50);
  Mario.addAnimation("running", Mario_running);
  Mario.addAnimation("collided" , Mario_collided)
  Mario.scale = 0.4;
  Mario.debug = false;
  Mario.setCollider("circle",0,0,40)
  
  ground = createSprite(width/2,height,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;
  
  console.log("Hello" + 5);
  
  score = 0;
  obstaclesGroup = new Group()
  cloudsGroup = new Group()
  GameOver = createSprite(width/2,height/2-50,15,15)
  GameOver.addImage(GameoverImage)
  restart = createSprite(width/2,height/1.75,5,5)
  restart.scale = 0.4
  GameOver.scale = 0.5
  restart.addImage(restartImage)

}

function draw() {
  background(180);
  if(gamestate == PLAY){
    score = score + Math.round(frameCount/60);
    Mario.changeAnimation("running",Mario_running)
    if(keyDown("space")&& Mario.y >= height-50) {
      Mario.velocityY = -13;
    }
    Mario.velocityY = Mario.velocityY + 0.8
    ground.velocityX = -(6+score/100);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds();
    spawnObstacles();
    GameOver.visible = false
    restart.visible = false
    if(Mario.isTouching(obstaclesGroup)){
      gamestate = END
    }
  }
  else if(gamestate == END){
 ground.velocityX = 0
 Mario.velocityY = 0
 cloudsGroup.setVelocityXEach(0)
 obstaclesGroup.setVelocityXEach(0)
 cloudsGroup.setLifetimeEach(-1) 
 obstaclesGroup.setLifetimeEach(-1) 
GameOver.visible = true
restart.visible = true
Mario.changeAnimation("collided",Mario_collided)
  }
  if (mousePressedOver(restart)){
    reset()
  }
  text("Score: "+ score, width-100,height-900);
  
  

  
  

  
  Mario.collide(invisibleGround);
  
  //spawn the clouds
  
  //spawn obstacles on the ground
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 110 === 0){
   var obstacle = createSprite(width+100,height-20,10,40);
   obstacle.velocityX = -(1+score/100);

   
    // //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 1000;
    obstaclesGroup.add(obstacle)
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(width+100,100,40,10);
    cloud.y = Math.round(random(height-500,height-300));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    cloudsGroup.add(cloud)
    
    //adjust the depth
    cloud.depth = Mario.depth;
    Mario.depth = Mario.depth + 1;
  }
  
}
function reset(){
  gamestate = PLAY
  GameOver.visible = true
  restart.visible = true
  score = 0 
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  
}