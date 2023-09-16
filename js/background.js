const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let oliverImg = new Image();
oliverImg.src = "./img/mainBackground/oliver.jpg";

let olivers = [];
for (i = 0; i <= 15; i++) {
  let oliver = new Entity(
    getRandomInteger(200, canvas.width - 200),
    getRandomInteger(200, canvas.height - 200),
    100,
    100,
    oliverImg
  );

  oliver.vx = Math.random() > 0.5 ? 512 : -512;
  oliver.vy = Math.random() > 0.5 ? 512 : -512;

  olivers.push(oliver);
}

let lastTimestamp = 0;

function animate(timestamp) {
  const dt = (timestamp - lastTimestamp) / 1000; // Calcula el deltaTime en segundos
  lastTimestamp = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  olivers.forEach((oliver) => {
    // Resto de tu lógica de colisión con los bordes del canvas
    if (oliver.x + oliver.w / 2 > canvas.width || oliver.x - oliver.w / 2 < 0) {
      oliver.vx = -oliver.vx;
      oliver.vAngle = -oliver.vAngle

    }
    if (oliver.y + oliver.h / 2 > canvas.height || oliver.y - oliver.h / 2 < 0) {
      oliver.vy = -oliver.vy;
      oliver.vAngle = -oliver.vAngle

    }

    oliver.update(ctx, dt); // Llama a la función de actualización de oliver con dt
  });

  requestAnimationFrame(animate);
}

// Resto de tu código aquí

// Inicia la animación llamando a requestAnimationFrame por primera vez
requestAnimationFrame(animate);

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
