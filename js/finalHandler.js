let jsConfetti = new JSConfetti();

let winSound = new Audio();
winSound.src = "audio/win.mp3";

let loseSound = new Audio();
loseSound.src = "audio/lose.mp3";

parseInt(localStorage["score"]) > parseInt(localStorage["minScore"])
  ? (document.getElementById("img").src = "./img/win.jpg")
  : (document.getElementById("img").src = "./img/lose.jpg");

let firstTime = true;

document.getElementById("reveal").addEventListener("click", () => {
  if (!firstTime) return;

  document.querySelector(".question-overlay").style.opacity = 0;
  document.querySelector(".img").style.opacity = 1;

  if (parseInt(localStorage["score"]) >= parseInt(localStorage["minScore"])) {
    firstTime = false;
    winSound.play();
    jsConfetti.addConfetti({
      emojis: ["🎉", "🎆", "🎈", "✨", "🎊", "🎄", "🎁"],
      emojiSize: 50,
    });

    setTimeout(
      () => window.location.replace("/"),
      winSound.duration * 1000 + 500
    );
  } else {
    firstTime = false;
    loseSound.play();
    jsConfetti.addConfetti({
      emojis: ["😭", "😢", "😟", "😞"],
      emojiSize: 50,
    });
    setTimeout(
      () => window.location.replace("/"),
      loseSound.duration * 1000 + 500
    );
  }
});
