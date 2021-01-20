var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_collided;
var ground, invisibleGround, groundImage;

var bricksGroup, brickImage;
var obstaclesGroup1, obstacle1, obstacle2,obstaclesGroup2;

var score=0;

var gameOver,obgroup2,restart;

var life=0;
var lifeImage;
var life1,life2,life3;
var lostlifeImage,lostlife1,lostlife2,lostlife3;

function preload(){
  //mario_running =   loadAnimation("m1.png","m2.png","m3.png")
  mario_running =   loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  mario_collided = loadAnimation("collided.png");

  lifeImage=loadImage("mario02.png") 
lostlifeImage= loadImage("star.png")


  groundImage =loadImage("ground2.png")
brickImage=loadImage("brick.png")
  obstacle1img =loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
  obstacle2img =loadAnimation("g1.png","g2.png","g3.png")
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  bg=loadImage("bg.png")
}



function setup(){
  createCanvas(windowWidth,windowHeight)

  mario = createSprite(150,windowHeight-150,50,50);
  mario.addAnimation("running",mario_running);
  mario.addAnimation("collided", mario_collided);
  mario.scale = 2;
 
life1 = createSprite(windowWidth-windowWidth/8,windowHeight/20);
life1.addImage("lifeline",lifeImage)

lostlife1=createSprite(windowWidth-windowWidth/8,windowHeight/20,10,10);
lostlife1.addImage("lostlife",lostlifeImage)
lostlife1.visible=false
lostlife1.scale=0.07

life2 = createSprite(windowWidth-windowWidth/8-30,windowHeight/20);
life2.addImage("lifeline",lifeImage)

lostlife2=createSprite(windowWidth-windowWidth/8,windowHeight/20,10,10);
lostlife2.addImage("lostlife",lostlifeImage)
lostlife2.visible=false
lostlife2.scale=0.07

life3 = createSprite(windowWidth-windowWidth/8-60,windowHeight/20);
life3.addImage("lifeline",lifeImage)

lostlife3=createSprite(windowWidth-windowWidth/8,windowHeight/20,10,10);
lostlife3.addImage("lostlife",lostlifeImage)
lostlife3.scale=0.07
lostlife3.visible=false

  ground = createSprite(windowWidth/2,windowHeight-56.5,windowWidth*10,80);
  //ground.addAnimation("ground",groundImage);
  ground.addImage("ground",groundImage);
  ground.scale=2.25
  ground.scale.width=10
  ground.x = ground.width ;
 ground.velocityX = -12
  
invisibleGround= createSprite(windowWidth/2,windowHeight-67,windowWidth*10,80);
 invisibleGround.visible= false
ground.visible=true
  gameOver = createSprite(windowWidth/2,windowHeight/2-50);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false
  
  restart = createSprite(windowWidth/2,windowHeight/2);
  restart.addImage(restartImg);
restart.visible=false

  bricksGroup = new Group();
  obstaclesGroup1 = new Group();
  //obstaclesGroup2 = new Group();
}



function draw(){
background(bg)

ground.velocityX = -12;
if (ground.x <=(ground.width-50))
  ground.x = ground.width*2;

//console.log(mario.y)
  if( keyDown("up_Arrow")&& mario.y >= height-150)  {
    mario.velocityY = -20;
  }
 mario.velocityY = mario.velocityY + 0.8

mario.collide(invisibleGround);

spawnObstacles1()
  if (obstaclesGroup1.isTouching(mario)){ //|| obstaclesGroup2.isTouching(mario)){

    life++
     console.log("life = ",life)
     if (life===1){
     life1.visible=false
          life2.visible=true
     life3.visible=true
     obstaclesGroup1.destroyEach()
     }

     if(life===2){
      life1.visible=false
     
     life2.visible=false
     
     life3.visible=true;

     obstaclesGroup1.destroyEach()
     }

     if(life===3){
      life1.visible=false
        
     life2.visible=false
          life3.visible=false
          obstaclesGroup1.destroyEach()
gameOver.visible=true
gameState = END

     }

    }
    if (gameState===END){

      obstaclesGroup1.setVelocityEach(0)
      ground.velocityX=0;
    }
    //
    
  //  }
  


  
  

  drawSprites()
}

function spawnObstacles1() {
  if(frameCount % 220 === 0) {
  
obstacle1 = createSprite(width-20,(height-height/4.9),10,40)

obstacle1.velocityX = -6;
//obstacle1.scale= 1.5;
//obstacle.lifetime = 300;var rand= Math.round(random(1,2))
var rand=Math.round(random(1,2))
  switch(rand){
    case 1 :obstacle1.addAnimation("running",obstacle1img);
    obstacle1.scale=1.5
    break;
    
    case 2 :obstacle1.addAnimation("obstacle2",obstacle2img)
    obstacle1.scale=0.5
    //obstacle1.y=(height-height/7)
    break;
    
    default: break;
    
      }
  
obstaclesGroup1.add(obstacle1) 
  
  }
}

/*function spawnObstacles2() {
  if(frameCount % 120 === 0) {
  
obstacle2 = createSprite(width-50,height-height/7,10,40)
obstacle2.addAnimation("obstacle2",obstacle2img)
obstacle2.velocityX = -6;
obstacle2.scale=0.5;
//obstacle.lifetime = 300;
  
obstaclesGroup2.add(obstacle2) 
  
  }
}*/
