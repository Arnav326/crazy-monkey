var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("monkey_running", monkey_running);

  monkey.scale = 0.10;
  
  ground = createSprite(200,200,600,20);
  ground.x = ground.width /2;
  
  
  //create Obstacle and Cloud Groups
  obstacleGroup = new Group();
  cloudsGroup =  new Group();

  
 //  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 //  monkey.debug = true
}


function draw() {
   background(255);
  
  if(gameState === PLAY){
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if (keyDown("space")&& monkey.y>= 150){
      monkey.velocityY = -12;
    }
    
    //add gravity
   monkey.velocityY = monkey.velocityY + 0.8;
  
    //spawn the fruits
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        //trex.velocityY = -12;
      gameState = END;
      
    }
  }
   else if (gameState === END) {
     
      ground.velocityX = 0;
      monkey.velocityY = 0
       
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);  
   }
  
 
  //stop trex from falling down
  monkey.collide(ground);

  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 120 === 0){
   var obstacle = createSprite(600,170,10,40);
   obstacle.scale = 0.1;
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -3;
   
   
   
    //assign scale and lifetime to the obstacle           

    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    var clouds = createSprite(600,100,40,10);
    clouds.y = Math.round(random(80,100));
    clouds.addImage(bananaImage);
    clouds.scale = 0.10;
    clouds.velocityX = -3;
    
     //assign lifetime to the variable
    clouds.lifetime = 200;
    
    //add each cloud to the group
    cloudsGroup.add(clouds);
  }
}
