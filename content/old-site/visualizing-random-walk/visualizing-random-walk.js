let canvas = document.getElementById("randomWalk");
let ctx = canvas.getContext("2d");
let image = document.getElementById("dollars");
let n = 11, m = 5;
let states = new Array(n);

let parent = document.getElementById("parent");
canvas.width = parent.offsetWidth - parent.offsetLeft;

let padding = canvas.width * 0.05;
let radius = Math.min((canvas.width - 2 * padding - (n - 1) * canvas.width * 0.06) / 10, 20);
let activeStateColor = "red";
let inactiveStateColor = "#0095DD";
let intervalId;
for (let i = 0; i < n; i++) {
    states[i] = { x: (canvas.width - 2 * padding) * i / (n-1) + padding, y: canvas.height / 2 - 20, active: false};
}

function drawStates() {
    for (let i = 0; i < n; i++) {
    ctx.beginPath();
    ctx.arc(states[i].x, states[i].y, radius, 0, Math.PI*2);
    ctx.fillStyle = (states[i].active) ? activeStateColor : inactiveStateColor;
    ctx.fill();
    ctx.font = radius + "px Comic Sans";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(i, states[i].x, states[i].y + radius / 4);
    ctx.closePath();
    }
}

function drawArrows() {
    for (let i = 0; i < n - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(states[i].x + radius, states[i].y);
        ctx.lineTo(states[i + 1].x - radius, states[i].y);
        ctx.stroke();
        if (i < n - 2) {
            // drawing left arrow heads
            ctx.moveTo(states[i].x + radius + canvas.width * 0.005, states[i].y - canvas.width * 0.005);
            ctx.lineTo(states[i].x + radius, states[i].y);
            ctx.lineTo(states[i].x + radius + canvas.width * 0.005, states[i].y + canvas.width * 0.005);
            ctx.stroke();
        }
        if (i > 0) {
            // drawing right arrow heads
            ctx.moveTo(states[i+1].x - radius - canvas.width * 0.005, states[i+1].y - canvas.width * 0.005);
            ctx.lineTo(states[i+1].x - radius, states[i].y);
            ctx.lineTo(states[i+1].x - radius - canvas.width * 0.005, states[i+1].y + canvas.width * 0.005);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function draw() {
    states[m].active = true;

    drawStates();
    image.src = ("../../dollar bills " + m + ".png");

    if (m > 0 && m < n - 1) {
        states[m].active = false;
        if (Math.random() < 1/2) {
            m++;
        } else {
            m--;
        }
    } else {
        if (m == 0) {
            ctx.font = "16px Arial";
            ctx.fillStyle = "black";
            ctx.fillText("You are now broke.", canvas.width / 2, canvas.height - 20);
        } else if (m == n - 1) {
            ctx.font = "16px Arial";
            ctx.fillStyle = "black";
            ctx.fillText("You doubled your money!", canvas.width / 2, canvas.height - 20);
        }
        clearInterval(intervalId);
    }
}
drawArrows();
draw();
intervalId = setInterval(draw, 1000);