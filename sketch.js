// To create variables here.
var Dog,Dog2,Dog3,HappyDog,sadDog,database,foodS,foodStock,form,milkImg,milk;
var Milks = [];
var AmorPm;
var gameStateref,gameState;
var hour;
var gardenImg,background1,bedRoomImg,background2,bathroomImg,background3;
var fhour,fhour2,fhour3;
var datahourref,datahour;

function preload()
{
  //To load Images.
  Dog = loadImage("images/Dog.png");
  HappyDog = loadImage("images/Happy.png");
  milkImg = loadImage("images/milk.png");
  sadDog = loadImage("images/Lazy.png");
  gardenImg = loadImage("images/Garden.png")
  bedRoomImg = loadImage("images/Bed Room.png")
  bathroomImg  = loadImage("images/Wash Room.png")
  
}

function setup() {

//To create datatbase, canvas, sprites etc.

  createCanvas(800, 700);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);


  datahourref = database.ref('Time')
  datahourref.on("value",fetchTime)

  Dog2= createSprite(300,300,20,20);
  Dog2.addImage(Dog)
  Dog2.scale=0.2;

  
  background1 = createSprite(width/2,height/2,800,700);
  background1.addImage(gardenImg);
  background1.visible = false;
 
   
  background2 = createSprite(width/2,height/2,800,700);
  background2.addImage(bedRoomImg);
  background2.visible = false;

   
  background3 = createSprite(width/2,height/2,800,700);
  background3.addImage(bathroomImg);
  background3.visible = false;

  form = new Form();
}


function draw() {  
  //to give colour to background.
   background(46, 139, 87);

 fhour = datahour + 1;
 
 fhour2 = datahour + 2;
 fhour3 = datahour + 5;
 
 if(hour === datahour)
 {
  Dog2.addImage(HappyDog);

 }
 
 if(hour === fhour)
   {
    background1.visible = true;
  
  }
  else if(hour === fhour2)
   {
     background1.visible=false;
     background2.visible=true;
   }
else if(hour > fhour2 && hour < fhour3){
  background2.visible=false;
     background3.visible=true;
}
else
{
  Dog2.addImage(sadDog);
}

   //To draw sprites
  drawSprites();
  GetTime();

  for (var a =0;a <foodS;a++)
  {
    Milks.push(new Food());
    Milks[a].display();
  }



 

  form.display();

  textSize(25);
  fill("blue");
  text("Last Feed: "+ datahour + AmorPm,50,35);
 
// If condition to refill the food. 
if(foodS < 1)
{
  database.ref('/').set(
    {
      Food:20
    }
  )
}


}

function writeStock(varname)
{
  //For updating realtime database.
  varname =varname -1;

  database.ref('/').set(
    {
      Food:varname
    }
    
  )

  
}

function readStock(data)
{
  //To get values from real time database.
  foodS = data.val();
}

async function GetTime()
{
  var time = await fetch ("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  
  var timeJSON = await time.json();

var dt = timeJSON.datetime;

 hour = dt.slice(11,13);



if(datahour >=00 && datahour <=12)
{
  AmorPm = await "a.m.";
}
else
{
  AmorPm = await "p.m.";
}

console.log(hour);



}



async function fetchTime(data)
{
  datahour = await data.val();
}