window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
var c = document.getElementById("c");
var ctx = c.getContext("2d");
c.height = window.innerHeight;
c.width = window.innerWidth;

var bubbles = [];
var colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
var color = colors[Math.floor(Math.random() * (colors.length))];
var fake = colors[Math.floor(Math.random() * (colors.length))];
var score = 0;
var lives = 3;
var clicked = false;

function bubble(color) {
    var w = Math.floor(Math.random() * 4 + 1);
    this.x = w == 1 || w == 3 ? Math.floor(Math.random() * (window.innerWidth - 50) + 25) : w == 4 ? -25 : window.innerWidth + 25;
    this.y = (w == 2 || w == 4) ? Math.floor(Math.random() * (window.innerWidth - 50) + 25) : w == 1 ? -25 : window.innerWidth + 25;

    var wall = Math.floor(Math.random() * 4 + 1);
    if (wall == w) {
        if (wall < 4) {
            wall += 1;
        } else {
            wall = Math.floor(Math.random() * 3 + 1);
        }
    }

    this.dirX = (wall == 1 || wall == 3) ? Math.floor(Math.random() * (window.innerWidth - 50) + 25) : wall == 4 ? -25 : window.innerWidth + 25;
    this.dirY = (wall == 2 || wall == 4) ? Math.floor(Math.random() * (window.innerWidth - 50) + 25) : wall == 1 ? -25 : window.innerWidth + 25;

    this.color = color;
    this.speedX = -(this.x - this.dirX) / 500;
    this.speedY = -(this.y - this.dirY) / 500;
}

function draw() {
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fill();
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].x += bubbles[i].speedX;
        bubbles[i].y += bubbles[i].speedY;
        drawbubble(bubbles[i].x, bubbles[i].y, bubbles[i].color);
        if (bubbles[i].x > window.innerWidth + 50 || bubbles[i].y > window.innerHeight + 50 || bubbles[i].x < -50 || bubbles[i].y < -50) {
            bubbles.splice(i, 1);
            i--;
        }
    }
    ctx.fillStyle = fake;
    ctx.font = "60px 'Comfortaa'";
    var tcolor;
    switch (color) {
        case "#ff0000":
            tcolor = "Red";
            break;
        case "#00ff00":
            tcolor = "Green";
            break;
        case "#0000ff":
            tcolor = "Blue";
            break;
        case "#ff00ff":
            tcolor = "Purple";
            break;
        case "#ffff00":
            tcolor = "Yellow";
            break;
        case "#00ffff":
            tcolor = "Light Blue";
            break;
    }

    var width = ctx.measureText(tcolor).width;
    ctx.fillText(tcolor, (window.innerWidth - width) / 2, (window.innerHeight - 30) / 2);

    ctx.font = "30px 'Comfortaa'";
    ctx.fillStyle = "black";
    if (clicked === false) {
        ctx.fillText("Tap the bubble with the text you read, not the color you see", (window.innerWidth - ctx.measureText("Tap the bubble with the text you read, not the color you see").width) / 2, window.innerHeight - 30);
    }

    ctx.font = "30px 'Comfortaa'";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 0, 30);
    ctx.fillText("Lives: " + lives, window.innerWidth - ctx.measureText("Lives: " + lives).width, 30);
}

function drawbubble(x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = LightenDarkenColor(color, 50);
    ctx.lineWidth = 12;
    ctx.arc(x, y, 50, 0 * Math.PI, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 7;
    ctx.strokeStyle = LightenDarkenColor("#ffffff", -20);
    ctx.arc(x, y, 40, 1.6 * Math.PI, 1.9 * Math.PI);
    ctx.fill();
    ctx.stroke();
}
var dend = false;

function drawend() {
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fill();
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].x += bubbles[i].speedX;
        bubbles[i].y += bubbles[i].speedY;
        drawbubble(bubbles[i].x, bubbles[i].y, bubbles[i].color);
        if (bubbles[i].x > window.innerWidth + 50 || bubbles[i].y > window.innerHeight + 50 || bubbles[i].x < -50 || bubbles[i].y < -50) {
            bubbles.splice(i, 1);
            i--;
        }
    }
    ctx.font = "90px 'Comfortaa'";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, (window.innerWidth - ctx.measureText("Score" + score).width) / 2, (window.innerHeight - 120) / 2);
    ctx.font = "30px 'Comfortaa'";
    ctx.fillText("Press space to restart", (window.innerWidth - ctx.measureText("Press space to restart").width) / 2, (window.innerHeight) / 2);
}

function LightenDarkenColor(col, amt) {
    col = col.slice(1);

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return "#" + (g | (b << 8) | (r << 16)).toString(16);
}

function animate(elem, animation) {
    elem.classList.add("animated", animation);
    elem.addEventListener("animationend", function() {
        elem.classList.remove("animated", animation);
    }, false);
}
document.body.onclick = function(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var correct = false;
    var ondot = false;
    if (lives >= 0) {
        for (var i = 0; i < bubbles.length; i++) {
            var xd = Math.pow(Math.abs(mouseX - bubbles[i].x), 2);
            var yd = Math.pow(Math.abs(mouseY - bubbles[i].y), 2);
            var dis = Math.sqrt(xd + yd);
            if (dis < 62) {
                ondot = true;
                if (bubbles[i].color == color) {
                    correct = true;
                    break;
                }
            }
        }
    }
    if (ondot === true) {
        if (correct === true) {
            score++;
            animate(c, "bounce");
        } else {
            lives--;
            if (lives >= 0) {
                animate(c, "headShake");
            }
        }
        fake = colors[Math.floor(Math.random() * (colors.length))];
        color = colors[Math.floor(Math.random() * (colors.length))];
        clicked = true;
    }
};
document.body.onkeypress = function(event) {
    if (lives < 0 && event.keyCode == 32) {
        console.log("restart");
        lives = 3;
        score = 0;
        clicked = false;
    }
};
document.body.onresize = function() {
    c.height = window.innerHeight;
    c.width = window.innerWidth;
};
var timer = 0;
(function animloop() {
    requestAnimFrame(animloop);
    if (lives >= 0) {
        draw();
    } else {
        if (dend === false) {
            animate(c, "rubberBand");
        }
        drawend();
    }
    if (timer == 15) {
        bubbles.push(new bubble(colors[Math.floor(Math.random() * (colors.length))]));
        timer = 0;
    }
    timer++;
})();