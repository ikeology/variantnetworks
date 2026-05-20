// Starry Background
const canvas = document.createElement("canvas");
canvas.style.cssText =
  "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-1;pointer-events:none;";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const STAR_COUNT = 500;
const MAX_SPEED = 1.5;

const mkStar = () => {
  const w = canvas.width;
  const h = canvas.height;
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * MAX_SPEED * 0.3 + 0.1;
  const colorVariation = Math.random() * 20 - 10;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,
    size: Math.random() * 0.9 + 0.5,
    r: 255,
    g: Math.min(255, Math.max(0, 255 + colorVariation)),
    b: Math.min(255, Math.max(0, 255 - colorVariation)),
    alpha: Math.random() * 0.5 + 0.5,
  };
};

const stars = Array.from({ length: STAR_COUNT }, mkStar);

const animate = () => {
  requestAnimationFrame(animate);
  const w = (canvas.width = window.innerWidth);
  const h = (canvas.height = window.innerHeight);

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, w, h);

  let newStars = 0;
  stars.forEach((star, i) => {
    star.x += star.dx;
    star.y += star.dy;
    if (
      star.x + star.size < 0 ||
      star.x > w + star.size ||
      star.y + star.size < 0 ||
      star.y > h + star.size
    ) {
      stars.splice(i, 1);
      newStars++;
    }
    ctx.fillStyle = `rgba(${star.r},${star.g},${star.b},${star.alpha})`;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });

  for (let i = 0; i < newStars; i++) stars.push(mkStar());
  while (stars.length < STAR_COUNT) stars.push(mkStar());
};

animate();
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Greeting
function hello() {
  let name = prompt("What is your name?");
  if (name) {
    document.getElementById("greeting").innerHTML = `hey yawl, ${name}!`;
  }
}

hello();
