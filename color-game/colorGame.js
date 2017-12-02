let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

function init(){
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons(){
  for(let i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ?
        numSquares = 3 : numSquares = 6;
      reset();
    });
  }
}

function setupSquares(){
  for(let i =0; i < squares.length; i++){
    // add initial colors to squares
    squares[i].style.backgroundColor = colors[i];
    //add click listeners
    squares[i].addEventListener("click", function(){
      //grab color of clicked square
      let clickedColor = this.style.backgroundColor;
      //compare color to picked color
      if (pickedColor === clickedColor) {
        messageDisplay.textContent = "Correct";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play Again?"
      }
      else{
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again";
      }
    });
  }
}

function reset(){
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "steelblue"
  //generate new colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from the array
  pickedColor = pickColor();
  //set picked color display
  colorDisplay.textContent = pickedColor
  //change colors of squares
  for(let i = 0; i < squares.length; i++){
    squares[i].style.display = "block";
    if(colors[i]){
      squares[i].style.backgroundColor = colors[i];
    }
    else squares[i].style.display = "none";
  }
};

resetButton.addEventListener("click", function(){
      reset();
});

let changeColors = (color) => {
  for(var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = color;
  }
};

function pickColor(){
  return colors[Math.floor(Math.random() * colors.length)];
};

function generateRandomColors(num){
  //make an array
  let arr = [];
  //add num random colors to array
  for(let i = 0; i < num; i++){
    let red = randomColor();
    let green = randomColor();
    let blue = randomColor();
    arr.push(`rgb(${red}, ${green}, ${blue})`);
  }
  return arr;
};

function randomColor(){
  return Math.floor(Math.random() * 256);
};
