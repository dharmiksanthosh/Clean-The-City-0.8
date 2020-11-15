var bg,bgimg,cleaner,boyimg,ob1,ob2,ob3,ob4,ob5,ob6,ob7,ob8,ob9,score,hdustbin,wdustbin,rdustbin;
var wgroup,hgroup,gamestate,state2,form,check,pb,pbimg,ibimg,ib,clb,col,count,ctxt,orent,ort,dev;
var mcount,clok;

function preload(){

  bgs = loadImage("images/bgs.png");
  bgp = loadImage("images/bgp.png");
  bgeg = loadImage("images/bgeg.png");
  bgeb = loadImage("images/bgeb.png");

  ints = loadImage("images/ints.png");

  boyimg = loadAnimation("images/player/p2/1.png","images/player/p2/2.png","images/player/p2/3.png","images/player/p2/4.png");
  boystopimg = loadImage("images/player/p2/1.png");

  ob1 = loadImage("images/obh1.png");
  ob2 = loadImage("images/obh2.png");
  ob3 = loadImage("images/obh3.png");
  ob4 = loadImage("images/obr1.png");
  ob5 = loadImage("images/obr2.png");
  ob6 = loadImage("images/obr3.png");
  ob7 = loadImage("images/obw1.png");
  ob8 = loadImage("images/obw2.png");
  ob9 = loadImage("images/obw3.png");

  clokimg = loadImage("images/timer.png");

  hdust = loadImage("images/hazard.png");
  wdust = loadImage("images/wet.png");
  rdust = loadImage("images/recyle.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  background(bgs);

  state2 = 0;

  pbimg = createImg("images/play.png");
  pbimg.position(width/2-100,height/2)

  ibimg = createImg("images/int.png");
  ibimg.position(0,0);
  ibimg.size(300,75);

  col = color(0, 0, 0, 0);
  pb = createButton('');
  pb.style('background-color', col);
  pb.position(width/2-100,height/2);
  pb.size(250,100);
  pb.id('pbutton');

  ib = createButton('');
  ib.style('background-color', col);
  ib.position(width/0,0);
  ib.size(300,75);
  ib.id('ibutton');

  clb = createButton('');
  clb.style('background-color', col);
  clb.position(width-80,10);
  clb.size(70,70);
  clb.id('clbutton');
  clb.hide();

  if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    
    dev = 'mobile';
  }else{

    dev = 'pc';
  }
}

function draw() {

  ib.mousePressed(()=>{

    background(ints);

    pb.hide();
    pbimg.hide();
    ib.hide();
    ibimg.hide();

    clb.show();
  })

  clb.mousePressed(()=>{

    background(bgs);

    pb.show();
    pbimg.show();
    ib.show();
    ibimg.show();

    clb.hide();
  });

  pb.mousePressed(()=>{

    state2 = 1;
  }) 

  if (windowWidth < windowHeight) {
    
    orent = 'portrait';
  }
  if (windowWidth > windowHeight) {
    
    orent = 'landscape';
  }

  if (orent == 'portrait' && state2 == 0 && dev == 'mobile') {
    
    ort = createImg("images/unlock.png");
    ort.position(0,0);
    ort.size(width,height);
  }

  if (state2 === 1) {
    
    pb.hide();
    pbimg.hide();
    ib.hide();
    ibimg.hide();

    bg = createSprite(width/2,-50,width,height);
    bg.addImage(bgp);
    bg.scale = 1.29;

    cleaner = createSprite(width*0.6,580);
    cleaner.addAnimation("boyim",boyimg);
    cleaner.addImage("stop",boystopimg);
    cleaner.scale = 0.5;
    cleaner.frameDelay = 7;

    clok = createSprite(width-50,75,100,125);
    clok.addImage(clokimg);

    score = 0;

    mcount = 120;

    hdustbin = createSprite(width-400,75);
    hdustbin.addImage(hdust);
    hdustbin.scale = 0.6;

    wdustbin = createSprite(width-300,75);
    wdustbin.addImage(wdust);
    wdustbin.scale = 0.6;

    rdustbin = createSprite(width-200,75);
    rdustbin.addImage(rdust);
    rdustbin.scale = 0.6;

    rgroup = new Group();
    wgroup = new Group();
    hgroup = new Group();
    
    gamestate = "play";
    form = new Form();

    state2 = 2;
  }

  if (gamestate==="play") {
   
    form.hide();
    cleaner.changeAnimation("boyim",boyimg);
    //Getting the infinite Road
    bg.velocityY = 4;
    if (bg.y>900) {

      bg.y = -50;
    }
    if (frameCount % round(frameRate()) === 0 && mcount > -1) {
    
      mcount --;
    }

    //Moving the Cleaner-Player(PC)
    if ((keyDown("right")||keyDown("d"))&&cleaner.x<1220) {
    
     cleaner.x += 10;
    }
    if ((keyDown("left")||keyDown("a"))&&cleaner.x>350) {
    
      cleaner.x -= 10;
    }

    if (rgroup.isTouching(cleaner)) {
      
      gamestate = "pause";

      check = "r";
    }
    if (wgroup.isTouching(cleaner)) {
      
      gamestate = "pause";

      check = "w";
    }
    if (hgroup.isTouching(cleaner)) {
      
      gamestate = "pause";

      check = "h";
    }
    spawngarbage();
  }
  if (gamestate==="pause") {
    
    pause();
  }

  drawSprites();
  if (score >= 75) {
      
    gend();
  }
  if (score < 60 && mcount < 0) {
    
    bend();
  }
  fill(0);  

  if (state2 === 2){

    textSize(30);
    text("Score: "+score,width-300,160);
    textAlign(CENTER)
    text(mcount,width-50,100);
  }
}

//Spawining Garbage in the game
function spawngarbageR(){

     var obstacleR = createSprite(Math.round(random(350,1150)), 0);
     obstacleR.velocityY = 4;

     var rand = Math.round(random(1,3));
     switch (rand){

      case 1:
          obstacleR.addImage(ob4);
          obstacleR.scale = 0.3;
      break;

      case 2:
          obstacleR.addImage(ob5);
          obstacleR.scale = 0.2;
      break;

      case 3:
          obstacleR.addImage(ob6);
          obstacleR.scale = 0.1;
      break;

      default:
        break;
     }
     rgroup.add(obstacleR);
     obstacleR.lifetime = height;
}

function spawngarbageW(){

 
    var obstacleW = createSprite(Math.round(random(350,1150)), 0);
    obstacleW.velocityY = 4;

    var rand = Math.round(random(1,3));
    switch (rand){

     case 1:
         obstacleW.addImage(ob7);
         obstacleW.scale = 0.01;
     break;

     case 2:
         obstacleW.addImage(ob8);
         obstacleW.scale = 0.2;
     break;

     case 3:
         obstacleW.addImage(ob9);
         obstacleW.scale = 0.2;
     break;

      default:
       break;
    }
    wgroup.add(obstacleW);
    obstacleW.lifetime = height;
}
function spawngarbageH(){


    var obstacleH = createSprite(Math.round(random(350,1150)), 0);
    obstacleH.velocityY = 4;

    var rand = Math.round(random(1,3));
    switch (rand){

     case 1:
         obstacleH.addImage(ob1);
         obstacleH.scale = 0.03;
     break;

     case 2:
         obstacleH.addImage(ob2);
         obstacleH.scale = 0.5;
         obstacleH.setCollider("rectangle",0,0,200,200);
     break;

     case 3:
         obstacleH.addImage(ob3);
         obstacleH.scale = 0.5;
         obstacleH.setCollider("rectangle",0,0,200,200);
     break;

     
     default:
       break;
    }
    hgroup.add(obstacleH);
    obstacleH.lifetime = height;
}
function spawngarbage(){
  if(frameCount % 180 ===0 ){
    var r = Math.round(random(1,3));
    if(r === 1){
      spawngarbageR();
    }else if(r === 2){
      spawngarbageH();
    }else
    {spawngarbageW();
    }
  }

}
function pause(){

  form.show();
  form.display();

  if (check === "h") {
   
    hgroup.lifetime = -1;
  }
  if (check === "w") {
   
    wgroup.lifetime = -1;
  }
  if (check === "r") {
   
    rgroup.lifetime = -1;
  }

  form.buttonh.mousePressed(()=>{

    if (check==="h"&&check!==undefined) {

        score += 5;
        form.hide();
        gamestate = 'play';
        hgroup.destroyEach();
    }
    else if(check==="w"||check==="r"){

      if(score>0){score -= 5;}

      alert("Wrong dustbin");
      form.hide();
      gamestate = 'play';
      wgroup.destroyEach();
      rgroup.destroyEach();
    }
  })
  form.buttonr.mousePressed(()=>{

    if (check==="r"&&check!==undefined) {

        score += 5;
        form.hide();
        gamestate = 'play';
        rgroup.destroyEach();
    }
    else if(check==="w"||check==="h"){

      if(score>0){score -= 5;}
        alert("Wrong dustbin");
        form.hide();
        gamestate = 'play';
        wgroup.destroyEach();
        hgroup.destroyEach();
    }
  })
  form.buttonw.mousePressed(()=>{

    if (check==="w"&&check!==undefined) {

        score += 5;
        form.hide();
        gamestate = 'play';
        wgroup.destroyEach();
    }
    else if(check==="h"||check==="r"){

        if(score>0){score -= 5;}
        
        alert("Wrong dustbin");
        form.hide();
        gamestate = 'play';
        hgroup.destroyEach();
        rgroup.destroyEach();
    }
  })

  if(count < 0){

    if(score>0){score -= 5;}

    alert("Time Up, Be Fast Next Time");
    form.hide();
    hgroup.destroyEach();
    wgroup.destroyEach();
    rgroup.destroyEach();
    gamestate = 'play';
  }

  bg.velocityY = 0;
  rgroup.setVelocityEach(0,0);
  hgroup.setVelocityEach(0,0);
  wgroup.setVelocityEach(0,0);
  cleaner.changeAnimation("stop",boystopimg);
}
function gend(){

  gamestate = 'gend';
  state2 = 3;
  bg.velocityY = 0;
  cleaner.changeAnimation('stop');

  background(bgeg);
}
function bend(){

  gamestate = 'bend';
  state2 = 3;
  bg.velocityY = 0;
  cleaner.changeAnimation('stop');
  bg.destroy();
  cleaner.destroy();

  background(bgeb);
}
