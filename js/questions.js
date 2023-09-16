if (
  !localStorage["spins"] ||
  !localStorage["minScore"] ||
  !localStorage["time"] ||
  !localStorage["score"]
) {
  window.location.replace("/Matepreguntas-reforged");
}

const params = new URLSearchParams(window.location.search);
let optionsId = [];

let sucess = new Audio();
sucess.src = "./audio/sucess.mp3";

let fail = new Audio();
fail.src = "./audio/fail.mp3";

let tick = new Audio();
tick.src = "./audio/tick.mp3";

let firstTime = true;
fetch("./js/data.json")
  .then((res) => {
    res.json().then((data) => {
      data = data[params.get("id")]
      let dataIndex = Math.floor(Math.random() * data.length)
      document.getElementById("question").innerText = data[dataIndex].question;

      data[dataIndex].options.forEach((opt, i) => {
        let optElement = new OptionElement(opt.content, opt.isCorrect, i);
        let html = optElement.returnHtml();

        document.getElementById("optionsContainer").appendChild(html);

        optionsId.push(html.id);
      });

      optionsId.forEach((id) => {
        document.getElementById(id).addEventListener("click", (ev) => {
          if (!firstTime) return;
          firstTime = false;
          let isCorrect = ev.target.classList.toString().includes("correctOne");

          if (isCorrect) {
            localStorage["score"] = (
              parseInt(localStorage["score"]) + 5
            ).toString();

            ev.target.style.backgroundColor = "rgb(45, 200, 45)";
            ev.target.style.boxShadow = "4px 4px rgb(25, 180, 25)";

            sucess.play();
            setTimeout(
              () => window.location.replace("/Matepreguntas-reforged/roulette.html"),
              500 + sucess.duration * 1000
            );
          } else {
            localStorage["score"] = (
              parseInt(localStorage["score"]) - 5
            ).toString();

            ev.target.style.backgroundColor = "rgb(200, 45, 45)";
            ev.target.style.boxShadow = "4px 4px rgb(180, 25, 25)";

            document.querySelector(".correctOne").style.backgroundColor =
              "rgb(45, 200, 45)";
            document.querySelector(".correctOne").style.boxShadow =
              "4px 4px rgb(25, 180, 25)";

            fail.play();
            setTimeout(
              () => window.location.replace("/Matepreguntas-reforged/roulette.html"),
              500 + fail.duration * 1000
            );
          }
        });
      });

      let time = parseInt(localStorage["time"]);

      document.querySelector(".time").innerText = `Tiempo restante: ${time}`;

      let isOut = false;
      setInterval(() => {
        if(!firstTime) return
        time--;
        tick.play();
        document.querySelector(".time").innerText = `Tiempo restante: ${time}`;
        if (time == 0 && !isOut) {
          isOut = true;
          localStorage["score"] = (
            parseInt(localStorage["score"]) - 5
          ).toString();
          window.location.replace("/Matepreguntas-reforged/roulette.html");
        }
      }, 1000);
    });
  })
  .catch((e) => {
    console.log(e);
  });

class OptionElement {
  constructor(content, isCorrect, i) {
    this.content = content;
    this.isCorrect = isCorrect;
    this.i = i;
  }

  returnHtml() {
    let btn = document.createElement("button");
    btn.classList.add("option");
    this.isCorrect ? btn.classList.add("correctOne") : "";
    btn.id = `option-${this.i}`;
    btn.innerText = this.content;

    return btn;
  }
}
