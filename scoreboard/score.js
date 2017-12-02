let p1Score = document.querySelector("#p1-score");
let p2Score = document.querySelector("#p2-score");
let scoreCap = document.querySelector("#score-cap");

let changeScoreCap = (i) => {
  scoreCap.textContent = i.value;
};

let onPlayerOneClick = () => {
  let score = parseInt(p1Score.textContent);
  let cap = parseInt(scoreCap.textContent);
  if (p2Score.style.color === "green") return;
  if (score < cap - 1){
    p1Score.textContent = parseInt(++p1Score.textContent);
  }
  else if(score < cap){
    p1Score.textContent = parseInt(++p1Score.textContent);
    p1Score.style.color = "green";
  }
};

let onPlayerTwoClick = () => {
  let score = parseInt(p2Score.textContent);
  let cap = parseInt(scoreCap.textContent);
  if (p1Score.style.color === "green") return;
  if (score < cap - 1){
    p2Score.textContent = parseInt(++p2Score.textContent);
  }
  else if(score < cap) {
    p2Score.textContent = parseInt(++p2Score.textContent);
    p2Score.style.color = "green";
  }
};

let onReset = () => {
  p1Score.textContent = 0;
  p2Score.textContent = 0;
  p1Score.style.color = "black";
  p2Score.style.color = "black";
};
