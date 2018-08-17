var numSquares = 6;
var colors = getRandomColorsList(6);
var pickedColor = chooseColor();

var resetBtn = document.getElementById("reset")
var h1 = document.querySelector("h1");
var squares = document.getElementsByClassName("square");
var pickedColorDisplay = document.getElementById("pickedColorDisplay");
var message = document.getElementById("message");
var modeBtns = document.getElementsByClassName("mode");

const bodyBackgroundStyle =  window.getComputedStyle(document.body, null)
const bodyBackgroundColor = bodyBackgroundStyle.backgroundColor;
const h1DefaultColor = h1.style.backgroundColor;

init();

resetBtn.addEventListener("click", function() {
    reset();
});


function init() {
    setUpModeBtns();
    setUpSquares();
    reset();
}

function setUpModeBtns() {
    for (var i = 0; i < modeBtns.length; i++) {
        modeBtns[i].addEventListener("click", function() {
            modeBtns[0].classList.remove("selected");
            modeBtns[1].classList.remove("selected");
            this.classList.add("selected");

            if (this.textContent == "Easy") {
                numSquares = 3;
            } else if (this.textContent == "Hard") {
                numSquares = 6;
            }
            reset();
        });
    }
}

function setUpSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) {
                message.textContent = "Correct!";
                resetBtn.textContent = "Play Again?";
                changeSquareColors(pickedColor);
                h1.style.backgroundColor = pickedColor
            } else {
                this.style.backgroundColor = bodyBackgroundColor;
                message.textContent = "Try Again!";
            }
        });
    }
}

// Get random int between 0 (inclusive) and max (exclusive)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function changeSquareColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function getRandomColorsList(number) {
    var colors = []
    for (var i = 0; i < number; i++) {
        colors.push(generateRandomColor());
    }

    return colors;
}

// Returns a string of the format "rgb(red, green, blue)".
function generateRandomColor() {
    var red = generateRandom8BitInt();
    var green = generateRandom8BitInt();
    var blue = generateRandom8BitInt();

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function chooseColor() {
    return colors[getRandomInt(numSquares)];
}

// Returns a random integer between 0 (inclusive) and 255 (inclusive).
function generateRandom8BitInt() {
    return Math.floor(Math.random() * 256);
}

function reset() {
    resetBtn.textContent = "New Colors";
    colors = getRandomColorsList(numSquares);
    pickedColor = chooseColor();
    pickedColorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = h1DefaultColor;
    message.textContent = "";
    resetBtn.textContent = "New Colors";
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }
    
}