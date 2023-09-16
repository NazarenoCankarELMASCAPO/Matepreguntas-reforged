document.getElementById("spins").innerText += ` ${localStorage["spins"]}`;
document.getElementById("score").innerText += ` ${localStorage["score"]}`;

if (
  !localStorage["spins"] ||
  !localStorage["minScore"] ||
  !localStorage["time"] ||
  !localStorage["score"]
) {
  window.location.replace("/Matepreguntas-reforged");
}

if (parseInt(localStorage["spins"]) <= 0)
  window.location.replace("/Matepreguntas-reforged/final.html");

let options = [
  "Multiplicación",
  "División",
  "Radicación",
  "Potenciación",
  "Simela",
  "Geometría",
  "Calc. combinados",
  "COMODÍN",
];

let routes = [
  "/Matepreguntas-reforged/questions.html?id=multiplicacion",
  "/Matepreguntas-reforged/questions.html?id=division",
  "/Matepreguntas-reforged/questions.html?id=radicacion",
  "/Matepreguntas-reforged/questions.html?id=potenciacion",
  "/Matepreguntas-reforged/questions.html?id=simela",
  "/Matepreguntas-reforged/questions.html?id=geometria",
  "/Matepreguntas-reforged/questions.html?id=calculos",
  "/Matepreguntas-reforged/c.html",
];

let colors = [
  "#2C3E50", // Azul grisáceo
  "#34495E", // Azul metálico
  "#7F8C8D", // Gris pizarra
  "#95A5A6", // Gris azulado
  "#718093", // Gris azul claro
  "#2E4053", // Azul acero
  "#22313F", // Azul noche
  "#FFD700", // Gris tormenta
];

let textColors = [
  "#FFF", // Azul grisáceo
  "#FFF", // Azul metálico
  "#FFF", // Gris pizarra
  "#FFF", // Gris azulado
  "#FFF", // Gris azul claro
  "#FFF", // Azul acero
  "#FFF", // Azul noche
  "#000", // Gris tormenta
];

let startAngle = 0;
let arc = Math.PI / (options.length / 2);
let spinTimeout = null;

let spinArcStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

let canvas;
let ctx;

let text = "";

let tick = new Audio();
tick.src = "./audio/sucess.mp3";
tick.playbackRate = 15.0;

function byte2Hex(n) {
  let nybHexString = "0123456789ABCDEF";
  return (
    String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
    nybHexString.substr(n & 0x0f, 1)
  );
}

function RGB2Color(r, g, b) {
  return "#" + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
  let phase = 0;
  let center = 128;
  let width = 127;
  let frequency = (Math.PI * 2) / maxitem;

  red = Math.sin(frequency * item + 2 + phase) * width + center;
  green = Math.sin(frequency * item + 0 + phase) * width + center;
  blue = Math.sin(frequency * item + 4 + phase) * width + center;

  return RGB2Color(red, green, blue);
}

let degrees = (startAngle * 180) / Math.PI + 90;
let arcd = (arc * 180) / Math.PI;
let index = Math.floor((360 - (degrees % 360)) / arcd);
let lastIndex = index;
let outsideRadius = 160;
let textRadius = 125;
let insideRadius = 100;
function drawRouletteWheel() {
  canvas = document.getElementById("roulette");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);

    ctx.font = "13px Helvetica, Arial";

    for (let i = 0; i < options.length; i++) {
      let angle = startAngle + i * arc;
      ctx.fillStyle = colors[i];
      //ctx.fillStyle = getColor(i, options.length);

      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        outsideRadius,
        angle,
        angle + arc,
        false
      );
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        insideRadius,
        angle + arc,
        angle,
        true
      );
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.fillStyle = textColors[i];
      ctx.translate(
        canvas.width / 2 + Math.cos(angle + arc / 2) * textRadius,
        canvas.height / 2 + Math.sin(angle + arc / 2) * textRadius
      );
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      let text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    //Arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 4, canvas.height / 2 - (outsideRadius + 5));
    ctx.lineTo(canvas.width / 2 + 4, canvas.height / 2 - (outsideRadius + 5));
    ctx.lineTo(canvas.width / 2 + 4, canvas.height / 2 - (outsideRadius - 5));
    ctx.lineTo(canvas.width / 2 + 9, canvas.height / 2 - (outsideRadius - 5));
    ctx.lineTo(canvas.width / 2 + 0, canvas.height / 2 - (outsideRadius - 13));
    ctx.lineTo(canvas.width / 2 - 9, canvas.height / 2 - (outsideRadius - 5));
    ctx.lineTo(canvas.width / 2 - 4, canvas.height / 2 - (outsideRadius - 5));
    ctx.lineTo(canvas.width / 2 - 4, canvas.height / 2 - (outsideRadius + 5));
    ctx.fill();

    ctx.font = "bold 30px Helvetica, Arial";
    ctx.fillText(
      text,
      canvas.width / 2 - ctx.measureText(text).width / 2,
      canvas.height / 2 + 10
    );

    degrees = (startAngle * 180) / Math.PI + 90;
    arcd = (arc * 180) / Math.PI;
    index = Math.floor((360 - (degrees % 360)) / arcd);
    if (index !== lastIndex) {
      lastIndex = index;
      tick.play();
    }
  }
}

let itsFirstTime = true;
function spin() {
  itsFirstTime = false;
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  let spinAngle =
    spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI) / 180;

  drawRouletteWheel();
  spinTimeout = setTimeout("rotateWheel()", 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  degrees = (startAngle * 180) / Math.PI + 90;
  arcd = (arc * 180) / Math.PI;
  index = Math.floor((360 - (degrees % 360)) / arcd);
  ctx.save();
  ctx.font = "bold 30px Helvetica, Arial";
  text = options[index];
  ctx.fillText(
    text,
    canvas.width / 2 - ctx.measureText(text).width / 2,
    canvas.height / 2 + 10
  );
  setTimeout(() => {
    localStorage["spins"] = (parseInt(localStorage["spins"]) - 1).toString();
    window.location.replace(routes[index]);
  }, 800);
  ctx.restore();
}

function easeOut(t, b, c, d) {
  let ts = (t /= d) * t;
  let tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

setInterval(drawRouletteWheel, 1000 / 60);

document.getElementById("spinBtn").addEventListener("click", () => {
  if (!itsFirstTime) return;
  spin();
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
