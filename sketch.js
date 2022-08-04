const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var planoIMG, fruitIMG;
var coelho, coelhoIMG;

var comer, trite, piscar;

var baloon, mute, eat, sad, cut, air, music;

var large, high, mobile;

var buttom, buttom2, buttom3;
var linkar, linkar2, linkar3;
var rope, rope2, rope3;

var fruit;


let engine;
let world;
var ground;

function preload() {
  planoIMG = loadImage("./imagens/background.png")
  fruitIMG = loadImage("./imagens/melon.png")
  coelhoIMG = loadImage("./imagens/Rabbit-01.png")
  comer = loadAnimation("./imagens/eat_0.png", "./imagens/eat_1.png", "./imagens/eat_2.png", "./imagens/eat_3.png", "./imagens/eat_4.png")
  triste = loadAnimation("./imagens/sad_1.png", "./imagens/sad_2.png", "./imagens/sad_3.png")
  piscar = loadAnimation("./imagens/blink_1.png", "./imagens/blink_2.png", "./imagens/blink_3.png")
  eat = loadSound("./imagens/eating_sound.mp3")
  sad = loadSound("./imagens/sad.wav")
  cut = loadSound("./imagens/rope_cut.mp3")
  air = loadSound("./imagens/air.wav")
  music = loadSound("./imagens/sound1.mp3")

  comer.playing = true
  triste.playing = true
  piscar.playing = true

  comer.looping = false
  triste.looping = false



}

function setup() {
  mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if (mobile){
    large = displayWidth
    high = displayHeight
    createCanvas(large, high)
   } else {
    large = windowWidth
    high = windowHeight
    createCanvas(large, high)
  }


  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  music.play()
  music.setVolume(0.1)


  ground = new Ground(width/2, height, width, 20);

  rope = new Rope(10, { x: width/2, y: 10 })
  rope2 = new Rope(10, { x: width/2 - 190, y: 100 })
  rope3 = new Rope(10, { x: width/2 + 160, y: 5 })



  fruit = Bodies.circle(width/2, 287, 20)
  Composite.add(rope.body, fruit)

  linkar = new Link(rope, fruit)
  linkar2 = new Link(rope2, fruit)
  linkar3 = new Link(rope3, fruit)


  piscar.frameDelay = 50
  comer.frameDelay = 20

  coelho = createSprite(width/2 + 300, height - 120)
  coelho.addAnimation("piscando", piscar)
  coelho.addAnimation("triste", triste)
  coelho.addAnimation("comendo", comer)
  coelho.scale = 0.3

  buttom = createImg("./imagens/cut_button.png")
  buttom.position(width/2, 20)
  buttom.size(30, 30)
  buttom.mouseClicked(cortar)
  
  buttom2 = createImg("./imagens/cut_button.png")
  buttom2.position(width/2 - 200, 100)
  buttom2.size(30, 30)
  buttom2.mouseClicked(cortar2)

  buttom3 = createImg("./imagens/cut_button.png")
  buttom3.position(width/2 + 150, 10)
  buttom3.size(30, 30)
  buttom3.mouseClicked(cortar3)

  mute = createImg("./imagens/mute.png")
  mute.position(20, 20)
  mute.size(50, 50)
  mute.mouseClicked(silence)


}

function draw() {

  background(planoIMG);

  ground.show();

  rope.show()
  rope2.show()
  rope3.show()


  Engine.update(engine);


  imageMode(CENTER)

  if (fruit !== null) {
    image(fruitIMG, fruit.position.x, fruit.position.y, 100, 100)
  }

  if (collide(fruit, coelho) == true) {
    coelho.changeAnimation("comendo")
    music.stop()
    eat.play()
  }

  if (fruit !== null && fruit.position.y >= height - 50) {
    coelho.changeAnimation("triste")
    music.stop()
    sad.play()
    fruit = null
  }



  drawSprites()
}

function assopre() {
  Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.04, y: 0 })
  air.play()
}

function silence() {
  if (music.isPlaying()) {
    music.stop()

  }

  else {
    music.play()
    music.setVolume(0.1)
  }

}

function cortar() {
  rope.break()

  linkar.corte()
  linkar = null
  cut.play()

}
function cortar2() {
  rope2.break()

  linkar2.corte()
  linkar2 = null
  cut.play()

}
function cortar3() {
  rope3.break()

  linkar3.corte()
  linkar3 = null
  cut.play()

}

function collide(body, sprite) {
  if (body !== null) {
    var distancia = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)

    if (distancia <= 80) {
      World.remove(world, fruit)
      fruit = null
      return true

    }

    else {
      return false
    }
  }


}
