// ===== Cuenta regresiva al 14 Feb =====
const now = new Date();
let targetYear = now.getFullYear();
const thisYearTarget = new Date(targetYear, 1, 14, 0, 0, 0);
if (now > thisYearTarget) targetYear += 1;
const finalDate = new Date(targetYear, 1, 14, 0, 0, 0);

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown(){
  const current = new Date();
  const diff = finalDate - current;

  if(diff <= 0){
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}
setInterval(updateCountdown, 1000);
updateCountdown();


// ===== Corazones =====
const heartEmojis = ["💗","💜","💖","💘","💕","💞"];

function spawnHeart(){
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = (Math.random() * 100) + "vw";
  heart.style.animationDuration = (4 + Math.random() * 4) + "s";
  heart.style.fontSize = (16 + Math.random() * 20) + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 9000);
}
setInterval(spawnHeart, 260);


// ===== Botones =====
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const final = document.getElementById("final");
const buttons = document.getElementById("buttons");
const question = document.getElementById("question");
const scrollHint = document.getElementById("scrollHint");

// 👉 FUNCIÓN MEJORADA PARA MOVER EL "NO"
function moveNoButton(){

  const containerRect = buttons.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 10;

  const maxX = containerRect.width - btnRect.width - padding;
  const maxY = containerRect.height - btnRect.height - padding;

  let tries = 0;
  let x, y;
  let overlaps;

  do{
    x = Math.random() * maxX;
    y = Math.random() * maxY;

    const futureLeft = containerRect.left + x;
    const futureTop = containerRect.top + y;

    overlaps =
      futureLeft < yesRect.right &&
      futureLeft + btnRect.width > yesRect.left &&
      futureTop < yesRect.bottom &&
      futureTop + btnRect.height > yesRect.top;

    tries++;

  } while(overlaps && tries < 20);

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

// Eventos
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});


// ===== Cuando dice que SÍ =====
yesBtn.addEventListener("click", () => {

  buttons.style.display = "none";
  question.textContent = "Sabía que ibas a decir que sí 🥹💘";

  final.style.display = "block";

  // Animación TE AMO
  const teamoEl = document.querySelector(".teamo");
  const text = teamoEl.textContent;
  teamoEl.textContent = "";

  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.animationDelay = `${i * 0.12}s`;
    teamoEl.appendChild(span);
  });

  // Corazones + confeti
  for(let i=0;i<80;i++){
    setTimeout(spawnHeart, i*60);
    setTimeout(spawnConfetti, i*70);
  }

  setTimeout(() => {
    scrollHint.classList.add("show");
  }, 600);
});


// ===== Confeti =====
function spawnConfetti(){
  const conf = document.createElement("div");
  conf.classList.add("confetti-piece");
  conf.style.backgroundColor = randomColor();
  conf.style.left = Math.random()*100 + "vw";
  conf.style.width = 6 + Math.random()*6 + "px";
  conf.style.height = conf.style.width;
  conf.style.animationDuration = 2 + Math.random()*2 + "s";
  document.body.appendChild(conf);
  setTimeout(()=>conf.remove(),4000);
}

function randomColor(){
  const colors = ["#FF5C5C","#FFB75C","#FFEA5C","#5CFF7C","#5CDAFF","#A55CFF"];
  return colors[Math.floor(Math.random()*colors.length)];
}


// ===== Música =====
const song = document.getElementById("song");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");

playBtn.addEventListener("click", async () => {
  try{
    await song.play();
    playBtn.textContent = "🎶 Sonando...";
  }catch(err){
    alert("Tu cel no dejó reproducir automático. Intenta tocar de nuevo 😅");
  }
});

pauseBtn.addEventListener("click", () => {
  song.pause();
  playBtn.textContent = "▶ Reproducir";
});
