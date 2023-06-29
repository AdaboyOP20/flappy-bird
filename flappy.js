const canvas  =  document.getElementById('flappybird');
const ctx =  canvas.getContext('2d');
document.getElementById('rest').style.display = 'none';

document.getElementById('rest').onclick = restart;

let bg =  new Image();
let pipenorth = new Image();
let pipesouth = new Image();
let fg = new Image();
let bird = new Image();


let fly = new Audio();
let score_s = new Audio();
let hit = new Audio();
let die = new Audio();


bg.src= "assets/bg.png";
pipenorth.src = "assets/pipeNorth(1).png";
pipesouth.src = "assets/pipeSouth(1).png";
fg.src = "assets/fg(1).png";
bird.src = "assets/bird(1).png";


fly.src = "assets/fly.mp3";
score_s.src = "assets/score.mp3";
innerHeight.src = "assets/hit.wav";
die.src = "assets/die.wav";


let bx = 10;
let by = 150;
let gravity = 1.5;
let pipenorthx = canvas.width - 20;
let pipenorthy = 0;
let pipesouthx = canvas.width -20;
let pipesouthy = canvas.height -20;
let score = 0;
let gap = 85;
let gameover = false;


function render(){
    ctx.drawImage(bg,0,0);
    ctx.drawImage(pipenorth,pipenorthx,pipenorthy);
    ctx.drawImage(pipesouth,pipesouthx,pipesouthy);
    ctx.drawImage(bird,bx,by);
    ctx.drawImage(fg,0,canvas.height - fg.height);
    ctx.fillStyle="#000";
    ctx.font="25px Teko";
    ctx.fillText("Score "+score, 10,canvas.height-20);
    if(gameover){
        ctx.fillText("GAME OVER",canvas.width/3.5,canvas.height/2);
    }
}


document.addEventListener("keydown",moveup);

function moveup(){
by = by - 20;
fly.play();
}


function touching(x,y,h){
    if(bx+bird.width>= x && by+bird.height>=y&&by<=h+y){
        return(true);
    }
    else{
        return(false);
    }
}


function update(){

    by = by+gravity;
    pipenorthx = pipenorthx-2;
    pipesouthy = pipenorth.height + gap;
    pipesouthx = pipenorthx;


    if(pipenorthx+pipenorth.width == 0){
        pipenorthx = canvas.width;
        score += 1;
        score_s.play();
    }
    if(touching(pipenorthx,pipenorthy,pipenorth.height)){
        gameover = true;
        die.play();
        clearInterval(myinterval);
        document.getElementById('rest').style.display = 'block';
    }
    if(touching(pipesouthx,pipesouthy,pipesouth.height)){
        gameover = true;
        die.play();
        clearInterval(myinterval);
        document.getElementById('rest').style.display = 'block';
    }
    if(by + bird.height >= canvas.height - fg.height){
        gameover = true;
        die.play();
        clearInterval(myinterval);
        document.getElementById('rest').style.display = 'block';
    }
    if(by <= 0){
        gameover = true;
        die.play();
        clearInterval(myinterval);
        document.getElementById('rest').style.display = 'block';
    }
}

function restart(){
    location.reload();
}

function game(){
    update()
    render()
}

const fps = 50;

const myinterval = setInterval(game, 1000/fps)