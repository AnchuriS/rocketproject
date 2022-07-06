var spaceImg, space;
var meteorImg, meteor, meteorsGroup;
var starImg, star, starGroup;
var rocket, rocketImg;
var play = 1;
var end = 0;
var gameState = play;
var score = 0;



function preload(){
  spaceImg = loadImage("space2.0.jpg");
  meteorImg = loadImage("meteor.png");
  starImg = loadImage("star.jpg");
  rocketImg = loadImage("rocket.jpg");
  
}

function setup(){
  createCanvas(600,600);  
  space = createSprite(300,300);
  space.addImage("space",spaceImg);
  space.velocityY = 1;
  space.x = space.width /2;
  
  meteorsGroup = new Group();
  starGroup = new Group();
  
 
  rocket = createSprite(200,200,50,50);
  rocket.scale = 0.3;
  rocket.addImage("rocket", rocketImg);
  score = 0;
  text.depth=space.depth
  text.depth+=1
}

function draw(){
  


  gameState=play 

  if (gameState === play) {

    if(keyDown("left_arrow")){
      rocket.x = rocket.x - 3;
    }
   
    if(keyDown("right_arrow")){
      rocket.x = rocket.x + 3;
    }
    
    if(keyDown("space")){
      rocket.velocityY = -10;
    }
    
    rocket.velocityY = rocket.velocityY + 0.8
    
    if(space.y > 400){
      space.y = 300}

  spawnmeteors();

  spawnstar();
  if( rocket.y > 600|| rocket.X>200||rocket.x<-50){
    gameState = end;
  }
  
  
    

    
    
    if(meteorsGroup.isTouching(rocket)){
      gameState = end;
    }

    if(starGroup.isTouching(rocket)){
      score= score + 1;
      stroke("red");
      fill("pink");
      textSize(20);
      text("Stars: "+ score,500,50); 
      starGroup.destroyEach()
      
    }
    }
 if (gameState === end){
    rocket.velocityY = 0;
    rocket.destroy();
    space.destroy()
    background(0);
    stroke("red");
    fill("green");
    textSize(45);
    text("Game Over", 225,250)
    stroke("red");
    fill("pink");
    textSize(20);
    text("Stars: "+ score,500,50)
    meteorsGroup.destroy();
    starGroup.destroy();
    }
  

    drawSprites();
    stroke("red");
    fill("pink");
    textSize(20);
    text("Stars: "+ score,500,50);
  
  
  

}

function spawnmeteors() {
  
  if (frameCount % 200 === 0) {
    var meteor = createSprite(200, -50);
    meteor.x=Math.round(random(120,400));
    meteor.scale=0.1 ;
    meteor.addImage(meteorImg);
    meteor.velocityY=1;
    rocket.depth=meteor.depth;
    rocket.depth+=1;

    meteor.lifetime=700;
    meteorsGroup.add(meteor);
    
   
    
    
  }
}

function spawnstar(){         
  if(frameCount % 240=== 0){
    var star = createSprite(150,-45);
    star.x=Math.round(random(120,400));
    star.scale=0.09       
    star.addImage(starImg);
    star.velocityY=1;
    rocket.depth=star.depth
    rocket.depth+=1;

    star.lifetime=700;
    starGroup.add(star)
  }
}