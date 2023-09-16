if(!localStorage["spins"] || !localStorage["minScore"] || !localStorage["time"] || !localStorage["score"]) return window.location.replace("/Matepreguntas-reforged")

class OptionElement {
  constructor(content, i) {
    this.content = content;
    this.i = i;
  }

  returnHtml() {
    let btn = document.createElement("button");
    btn.classList.add("option");
    btn.id = `option-${this.i}`;
    btn.innerText = this.content;

    return btn;
  }
}

let optionsId = [];

let sucess = new Audio();
sucess.src = "./audio/sucess.mp3";

let data = {
  question: "¿Que comodín deseas?",
  options: [{
    "content": "+10 puntos"
  }, {
    "content": "+5 giros"
  },
  {
    "content": "Pasarle el juego a otra persona"
  }]
}

document.getElementById("question").innerText = data.question;

data.options.forEach((opt, i) => {
  let optElement = new OptionElement(opt.content, i);
  let html = optElement.returnHtml();

  document.getElementById("optionsContainer").appendChild(html);

  optionsId.push(html.id);
});

let firstTime = true
optionsId.forEach((id) => {
  document.getElementById(id).addEventListener("click", (ev) => {
    if(!firstTime) return
    firstTime = false
    
    ev.target.style.backgroundColor = "rgb(45, 200, 45)";
    ev.target.style.boxShadow = "4px 4px rgb(25, 180, 25)";

    if(ev.target.id.substring(ev.target.id.length - 1) == 0) {
      localStorage["score"] = parseInt(localStorage["score"]) + 10
    }

    if(ev.target.id.substring(ev.target.id.length - 1) == 1) {
      localStorage["spins"] = parseInt(localStorage["spins"]) + 5
    }

    sucess.play();
    setTimeout(
      () => window.location.replace("/Matepreguntas-reforged/roulette.html"),
      500 + sucess.duration * 1000
    );
  });
});

