let spinsInput = document.getElementById("spins");
let minScoreInput = document.getElementById("minScore");
let timeInput = document.getElementById("time");

localStorage["score"] = 0;
localStorage["bonus"] = 0;

spinsInput.addEventListener("change", ev => {
  if(ev.target.value <= 0) ev.target.value = 1
  localStorage["spins"] = ev.target.value
})

minScoreInput.addEventListener("change", ev => {
  if(ev.target.value < 5) ev.target.value = 5

  localStorage["minScore"] = ev.target.value
})

setDif("medium");

document.getElementById("easy").addEventListener("click", () => {
  setDif("easy");
});
document.getElementById("medium").addEventListener("click", () => {
  setDif("medium");
});
document.getElementById("hard").addEventListener("click", () => {
  setDif("hard");
});

function setDif(dif = "medium") {
  switch (dif) {
    case "easy": {
      spinsInput.value = 10;
      localStorage["spins"] = spinsInput.value;

      minScoreInput.value = 35;
      localStorage["minScore"] = minScoreInput.value;

      timeInput.value = 20;
      localStorage["time"] = timeInput.value;

      break;
    }

    case "medium": {
      spinsInput.value = 15;
      localStorage["spins"] = spinsInput.value;

      minScoreInput.value = 65;
      localStorage["minScore"] = minScoreInput.value;

      timeInput.value = 15;
      localStorage["time"] = timeInput.value;

      break;
    }

    case "hard": {
      spinsInput.value = 25;
      localStorage["spins"] = spinsInput.value;

      minScoreInput.value = 120;
      localStorage["minScore"] = minScoreInput.value;

      timeInput.value = 10;
      localStorage["time"] = timeInput.value;

      break;
    }
  }
}
