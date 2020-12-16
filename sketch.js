
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, bananaGroup, obstacleGroup;
var FoodGroup, obstacleGroup;
var score;
var invisibleGround;
var state = "play";
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,200);
  monkey = createSprite(20,170,30,50);
  monkey.addAnimation("run",monkey_running);
  monkey.scale = 0.1;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  invisibleGround = createSprite(0,200,600,10);
  invisibleGround.visible = false;
                                
spawnRock();
  
}


function draw() {
background("white");
  
  
  
drawSprites();

  if(state === "play"){
    text("Survival Time: "+ survivalTime,500,30)
      if(keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleGround)
    if(frameCount%300 === 0){
      spawnRock();
    }
    if(frameCount%80 === 0){
      spawnBanana();
    }
    if(monkey.isTouching(obstacleGroup)){
      state = "end"
    }
    survivalTime = Math.ceil(frameCount/frameRate())
  }
  if(state === "end"){
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0)
    bananaGroup.setVelocityXEach(0)
    monkey.visible = false;
    text("Your final time was " + survivalTime  + "! Press the spacebar to continue.",200,30)
    if(keyDown("space")){
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
      monkey.visible = true;
      survivalTime = 0;
      state = "play";
      
      
      
    }
  }
  
  
}
function spawnRock(){
  obstacle = createSprite(600,170,30,30);
  obstacle.velocityX = -3;
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacleGroup.add(obstacle)
}
function spawnBanana(){
if(Math.round(random(1,2)) === 2)  {
  banana = createSprite(600,Math.round(random(90,40)),20,40)
  banana.velocityX = -3;
  banana.addImage(bananaImage)
  banana.scale = 0.1
  bananaGroup.add(banana);
}

}






