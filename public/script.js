let drop;
window.onload = function() {
    var name = localStorage.getItem('name');
    drop=localStorage.getItem('drop');
    drop=Number(drop);
    
    var diff;
    if(drop==1)diff="Easy";
    if(drop==2)diff="Medium";
    if(drop==3)diff="Hard";
    if(drop==4)diff="God Mode";
    if (name || drop) {
        document.getElementById('nameDisplay').textContent = 'Hello, ' + name + '!  ';
        document.getElementById('diffDisplay').textContent='  Difficulty Level - '+diff;
    } else {
        document.getElementById('nameDisplay').textContent = 'No name found!';
    }
    console.log("drop:"+drop);



const { body } = document;
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const height = 510;
const width = 500;
const p_width = 50;
const p_height = 20;
let paddle_cpu = 225;
let paddle_player = 225;
let ball_x = width / 2;
let ball_y = height / 2;
let ballRadius = 5;
let player_score = 0;
let cpu_score = 0;
let p_diff = 25;
let speed_x = -2;
let vegam;
let speed_y=2;
if(drop==1){
    vegam=2;
speed_y = vegam;}
if(drop==2){
    vegam=4;
speed_y = vegam;}
if(drop==3){
    vegam=8;
speed_y = vegam;}
if(drop==4){
    vegam=12;
speed_y = vegam;}
console.log(vegam);
let cpu_speed = vegam-1;
let mouse_moved = false;
let paddleContact = false;
let trajectory;
let playerMoved = false;

function renderCanvas() {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    context.fillRect(paddle_cpu, 1, p_width, p_height);
    context.fillRect(paddle_player, height - 21, p_width, p_height);

    context.beginPath();
    context.setLineDash([]);
    context.moveTo(0, 255);
    context.lineTo(500, 255);
    context.strokeStyle = "red";
    context.stroke();

    context.beginPath();
    context.arc(ball_x, ball_y, ballRadius, 0, 2 * Math.PI, false);
    context.fillStyle = "black";
    context.fill();

    context.font = "32px Courier New";
    context.fillText(player_score, 20, canvas.height / 2 + 50);
    context.fillText(cpu_score, 20, canvas.height / 2 - 30);
}

function ballMove() {
    ball_x += speed_x;
    ball_y += speed_y;
}

function ballReset() {
    ball_x = width / 2;
    ball_y = height / 2;
    speed_x = -2;
    speed_y = vegam;
    paddleContact = false;
    playerMoved = false;
}

function boundary() {
    if (ball_x < ballRadius && speed_x < 0) {
        speed_x = -speed_x;
    }
    if (ball_x > width - ballRadius && speed_x > 0) {
        speed_x = -speed_x;
    }
    if (ball_y > height - ballRadius - p_diff) {
        if (ball_x > paddle_player && ball_x < paddle_player + p_width) {
            paddleContact = true;
            speed_y = -speed_y;
            trajectory = ball_x - (paddle_player + p_width / 2);
            speed_x = trajectory * 0.3;
        } else if (ball_y > height - ballRadius) {
            ballReset();
            cpu_score++;
        }
    }
    if (ball_y < ballRadius + p_diff) {
        if (ball_x > paddle_cpu && ball_x < paddle_cpu + p_width) {
            speed_y = -speed_y;
            trajectory = ball_x - (paddle_cpu + p_width / 2);
            speed_x = trajectory * 0.3;
        } else if (ball_y < ballRadius) {
            ballReset();
            player_score++;
        }
    }
}

function computerPaddle() {
    if (paddle_cpu + p_width / 2 < ball_x) {
        paddle_cpu += cpu_speed;
    } else {
        paddle_cpu -= cpu_speed;
    }
    if (paddle_cpu < 0) {
        paddle_cpu = 0;
    }
    if (paddle_cpu > width - p_width) {
        paddle_cpu = width - p_width;
    }
}

function animation() {
    ballMove();
    boundary();
    renderCanvas();
    computerPaddle();
    window.requestAnimationFrame(animation);
}

function createCanvas() {
    canvas.height = height;
    canvas.width = width;
    body.appendChild(canvas);
    renderCanvas();
}

function start() {
    createCanvas();
    animation();

    player_score = 0;
    cpu_score = 0;
    canvas.addEventListener('mousemove', (e) => {
        playerMoved = true;
        paddle_player = e.clientX - canvas.getBoundingClientRect().left - p_width / 2;
        if (paddle_player < 0) {
            paddle_player = 0;
        }
        if (paddle_player > width - p_width) {
            paddle_player = width - p_width;
        }
    });

    document.addEventListener('keydown', (e) => {
        const key = e.key;
        const moveDistance = 20;
        playerMoved = true;

        if (key === 'ArrowLeft') {
            paddle_player -= moveDistance;
            if (paddle_player < 0) {
                paddle_player = 0;
            }
        } else if (key === 'ArrowRight') {
            paddle_player += moveDistance;
            if (paddle_player > width - p_width) {
                paddle_player = width - p_width;
            }
        }
    });
}

start();}
