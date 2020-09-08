var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground, invisibleGround;
var survivalTime;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}

function setup() {

  createCanvas(600, 600);
  monkey = createSprite(50, 190, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 220, 600, 10);
  ground.x = ground.width / 2;

  invisibleGround = createSprite(200, 222, 600, 10);
  invisibleGround.visible = false;

  FoodGroup = new Group();
  obstacleGroup = new Group();

  survivalTime = 0;
}

function draw() {

  background(250);

  spawnFood();
  spawnObstacles();




  if (gameState === PLAY) {
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount / frameRate());
    text("Survival Time: " + survivalTime, 100, 50);


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8

    spawnFood();

    spawnObstacles();

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  } else if (gameState === END) {
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();

    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  }


  if (keyDown("space") && monkey.y >= 120) {
    monkey.velocityY = -12;
  }

  if (FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);

  drawSprites();
}


function spawnFood() {
  if (frameCount % 50 === 0) {
    banana = createSprite(600, 40, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 400;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 200 === 0) {
    obstacle = createSprite(600, 120, 40, 10);
    obstacle.y = Math.round(random(180, 180));
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -2.5;
    obstacle.lifetime = 400;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    obstacleGroup.add(obstacle);
  }
}