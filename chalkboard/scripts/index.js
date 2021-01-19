let canvas = document.getElementById("chalkboard");
fitToContainer(canvas);
let context = canvas.getContext("2d");
let relativeX, relativeY, radius = 5;
document.addEventListener("mousemove", event => {
    relativeX = event.clientX - canvas.offsetLeft;
    relativeY = event.clientY - canvas.offsetTop;
});
document.addEventListener("keydown", event => {
    if (event.key == "[") {
        radius -= 1;
    }
});
document.addEventListener("keydown", event => {
    if (event.key == "]") {
        radius += 1;
    }
});
function fitToContainer(canvas){
    canvas.style.width ='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
function drawMouse() {
    context.beginPath();
    context.arc(relativeX, relativeY, radius, 0, 2 * Math.PI);
    context.stroke();
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawMouse()
    requestAnimationFrame(draw)
}
draw()