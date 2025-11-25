/* ------------------ DOM refs ------------------ */
const openBtn = document.getElementById("open-btn");
const card = document.getElementById("card");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const response = document.getElementById("response");
const heartsBg = document.querySelector(".hearts-bg");
const starsLayer = document.querySelector(".stars");
const musicToggle = document.getElementById("music-toggle");
const nightToggle = document.getElementById("night-toggle");
const surpriseOpen = document.getElementById("surprise-open");
const surpriseModal = document.getElementById("surprise-modal");
const closeSurprise = document.getElementById("close-surprise");
const typedMessageEl = document.getElementById("typed-message");
const fireworksCanvas = document.getElementById("fireworks-canvas");

/* ---------- small utility ---------- */
const rand = (min, max) => Math.random() * (max - min) + min;

/* ---------- Typing message content ---------- */
const fullMessage = `
I created this tiny page just for you.
Every animation and color was chosen because it reminds me of your smile.
You mean so much to me — my heart smiles when I think of you. 💖
`;

/* ---------- card open & typing ---------- */
openBtn.addEventListener("click", () => {
  openBtn.style.display = "none";
  card.classList.remove("hidden");
  card.classList.add("show");
  card.setAttribute("aria-hidden", "false");
  // start typing after a short delay
  setTimeout(() => typeText(typedMessageEl, fullMessage, 28), 350);
});

/* typing function */
function typeText(el, text, speed = 40) {
  el.textContent = "";
  let i = 0;
  const step = () => {
    if (i <= text.length - 1) {
      el.textContent += text[i] === "\n" ? "\n" : text[i];
      i++;
      setTimeout(step, speed);
    } else {
      // finish with a subtle highlight
      const highlight = document.createElement("span");
      highlight.className = "highlight";
      highlight.textContent = " You are my favorite thought.";
      el.appendChild(highlight);
    }
  };
  step();
}

/* ---------- floating hearts generator ---------- */
function createHeart() {
  const el = document.createElement("div");
  el.className = "heart";
  const size = Math.floor(rand(10, 26));
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.left = `${rand(0, 100)}vw`;
  el.style.top = `${rand(60, 100)}vh`;
  el.style.opacity = rand(0.35, 0.9);
  el.style.transform = `rotate(45deg)`;
  el.style.position = "absolute";
  // before/after circles
  el.style.background = `#ff4b6e`;
  el.style.borderRadius = `0`;
  el.style.zIndex = 1;

  // pseudo elements simulation using inner spans
  const b1 = document.createElement("span");
  const b2 = document.createElement("span");
  Object.assign(b1.style, {
    content: '""', position: "absolute", width: `${size}px`, height: `${size}px`,
    borderRadius: "50%", background: "#ff4b6e", top: `-${size/2}px`, left: `0`
  });
  Object.assign(b2.style, {
    content: '""', position: "absolute", width: `${size}px`, height: `${size}px`,
    borderRadius: "50%", background: "#ff4b6e", left: `-${size/2}px`, top: `0`
  });
  el.appendChild(b1); el.appendChild(b2);

  // animate via CSS transition (simple)
  heartsBg.appendChild(el);
  // animate up
  const dur = rand(4500, 9000);
  el.animate([
    { transform: `translateY(0) rotate(45deg) scale(.8)`, opacity: 0 },
    { opacity: 1, offset: 0.12 },
    { transform: `translateY(-120vh) rotate(45deg) scale(1.4)`, opacity: 0.0 }
  ], { duration: dur, iterations: 1, easing: "linear" });

  setTimeout(() => el.remove(), dur + 50);
}
setInterval(createHeart, 420);

/* ---------- NO button playful escape ---------- */
noBtn.addEventListener("mouseover", () => {
  const wrapper = document.querySelector(".wrapper").getBoundingClientRect();
  // keep button inside wrapper area
  const maxX = wrapper.width - noBtn.offsetWidth - 12;
  const maxY = wrapper.height - noBtn.offsetHeight - 12;
  const x = rand(-maxX/2, maxX/2);
  const y = rand(-6, maxY);
  noBtn.style.transition = "transform .35s cubic-bezier(.2,.9,.3,1)";
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

/* ---------- YES button: hearts + fireworks + music flourish + surprise modal ---------- */
yesBtn.addEventListener("click", () => {
  response.textContent = "Aww... You just made my whole world brighter 💖";
  // small heart burst
  for (let i=0; i<12; i++){
    spawnFloatingEmoji("💖");
  }
  // fireworks
  triggerFireworks();
  // show surprise modal after brief moment
  setTimeout(() => {
    openSurpriseModal();
  }, 900);
});
