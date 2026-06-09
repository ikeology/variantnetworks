// Starry Background — subtle dark stars on white sections only
const canvas = document.createElement("canvas");
canvas.style.cssText =
  "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// White sections by ID/class — stars only render over these
const WHITE_SECTIONS = [
  "#hero-is-light",
  ".hero",
  "section:not(.mesh-section):not(.how-bg-dark)",
];

const STAR_COUNT_START = 120;
const STAR_COUNT_MAX = 500;
const MAX_SPEED = 0.4; // slow and calm

// Time-based growth — stars expand gradually over 3 minutes
const SESSION_START = Date.now();
const GROW_DURATION = 180000; // 3 minutes in ms

const getProgress = () =>
  Math.min(1, (Date.now() - SESSION_START) / GROW_DURATION);

const getStarTarget = () =>
  Math.floor(
    STAR_COUNT_START + (STAR_COUNT_MAX - STAR_COUNT_START) * getProgress()
  );

const getSizeMultiplier = () => 1 + getProgress() * 1.8; // stars grow up to ~2.8x over time

const mkStar = () => {
  const w = canvas.width;
  const h = canvas.height;
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * MAX_SPEED * 0.5 + 0.05;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,
    baseSize: Math.random() * 0.8 + 0.4,
    // Dark navy/slate stars — subtle on white backgrounds
    r: Math.floor(Math.random() * 30 + 10),
    g: Math.floor(Math.random() * 40 + 20),
    b: Math.floor(Math.random() * 60 + 40),
    alpha: Math.random() * 0.18 + 0.06, // very subtle: 6–24% opacity
  };
};

const stars = Array.from({ length: STAR_COUNT_START }, mkStar);

// Determine which pixel Y ranges are "white sections"
// We check by sampling section backgrounds at scroll time
const isWhiteSection = (y) => {
  const scrollY = window.scrollY;
  const absY = y + scrollY;
  const el = document.elementFromPoint(window.innerWidth / 2, y);
  if (!el) return false;
  // Walk up to find a section
  let node = el;
  for (let i = 0; i < 6; i++) {
    if (!node || node === document.body) break;
    const cls = node.className || "";
    const id = node.id || "";
    // Skip dark sections
    if (
      cls.includes("mesh-section") ||
      cls.includes("proof-strip") ||
      node.tagName === "FOOTER" ||
      node.tagName === "NAV"
    )
      return false;
    node = node.parentElement;
  }
  return true;
};

// Precompute white Y bands every second (cheap enough)
let whiteBands = []; // [{top, bottom}] in viewport coords

const computeWhiteBands = () => {
  whiteBands = [];
  const darkSelectors = [".mesh-section", ".proof-strip", "footer", "nav"];
  const allSections = document.querySelectorAll(
    "section, .proof-strip, footer, nav, .mesh-section"
  );
  allSections.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    const bg = style.backgroundColor;
    // Consider dark if background is dark (midnight blue or very dark)
    const isDark =
      el.classList.contains("mesh-section") ||
      el.classList.contains("proof-strip") ||
      el.tagName === "FOOTER" ||
      el.tagName === "NAV" ||
      bg.includes("13, 27, 42") ||
      bg.includes("21, 35, 56");
    if (!isDark) {
      whiteBands.push({ top: rect.top, bottom: rect.bottom });
    }
  });
};

computeWhiteBands();
setInterval(computeWhiteBands, 1000);

const inWhiteBand = (y) => whiteBands.some((b) => y >= b.top && y <= b.bottom);

const animate = () => {
  requestAnimationFrame(animate);
  const w = (canvas.width = window.innerWidth);
  const h = (canvas.height = window.innerHeight);

  // Clear with fully transparent — no background fill
  ctx.clearRect(0, 0, w, h);

  const progress = getProgress();
  const sizeMultiplier = getSizeMultiplier();
  let removed = 0;

  stars.forEach((star, i) => {
    star.x += star.dx;
    star.y += star.dy;

    // Wrap around edges smoothly
    if (star.x < -2) star.x = w + 2;
    if (star.x > w + 2) star.x = -2;
    if (star.y < -2) star.y = h + 2;
    if (star.y > h + 2) star.y = -2;

    // Only draw if over a white section
    if (inWhiteBand(star.y)) {
      const size = star.baseSize * sizeMultiplier;
      // Slightly increase opacity over time too
      const alpha = star.alpha * (1 + progress * 0.5);
      ctx.fillStyle = `rgba(${star.r},${star.g},${star.b},${alpha})`;
      ctx.fillRect(star.x, star.y, size, size);
    }
  });

  // Gradually add stars toward target
  const target = getStarTarget();
  if (stars.length < target) {
    stars.push(mkStar());
  }
};

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  computeWhiteBands();
});

window.addEventListener("scroll", computeWhiteBands);
