const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute("aria-label", "A neutral face");

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "#f3cf87");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");
face.append(head);

const leftEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
leftEye.setAttribute("cx", "72");
leftEye.setAttribute("cy", "82");
leftEye.setAttribute("rx", "6");
leftEye.setAttribute("ry", "9");
leftEye.setAttribute("fill", "#302c29");
face.append(leftEye);

const rightEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
rightEye.setAttribute("cx", "128");
rightEye.setAttribute("cy", "82");
rightEye.setAttribute("rx", "6");
rightEye.setAttribute("ry", "9");
rightEye.setAttribute("fill", "#302c29");
face.append(rightEye);

const nose = document.createElementNS("http://www.w3.org/2000/svg", "line");
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

const mouth = document.createElementNS("http://www.w3.org/2000/svg", "line");
mouth.setAttribute("x1", "75");
mouth.setAttribute("y1", "137");
mouth.setAttribute("x2", "125");
mouth.setAttribute("y2", "137");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");
face.append(mouth);

// A ----------------

function createStar(
  cx: number, // cx is center_x, and c_y is center y
  cy: number,
  outerRadius: number,
  innerRadius: number,
): string {
  const points: string[] = [];

  // %2 here checks if the number is odd or even, use it to decide use the outerRadius or inner Radius
  //Outer radius: determines how far each of the five star tips extends from the center.
  //Inner radius: determines how far inward each of the five inner corners sits.
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;

    const angle = (i * Math.PI) / 5 - Math.PI / 2;

    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    points.push(`${x},${y}`);
  }

  return points.join(" ");
}

// Create a background SVG for the starfield.
const starfield = document.createElementNS(
  //use w3.org here bc it's the universally recognized XML
  "http://www.w3.org/2000/svg",
  "svg",
);

starfield.setAttribute("viewBox", "0 0 800 600");
starfield.setAttribute("preserveAspectRatio", "none");
starfield.setAttribute("aria-hidden", "true");

Object.assign(starfield.style, {
  position: "absolute",
  inset: "0",
  width: "100%",
  height: "100%",
  zIndex: "0",
  pointerEvents: "none",
});

//Make sure the background fills the portrait container.
starfield.style.position = "absolute";
starfield.style.inset = "0";
starfield.style.width = "100%";
starfield.style.height = "100%";
starfield.style.pointerEvents = "none";

//Make the portrait container a positioning context.
portrait.style.position = "relative";

portrait.append(starfield);
portrait.append(face);

//Put the background behind the face ------------
face.style.position = "relative";
face.style.zIndex = "1";
face.style.overflow = "visible";

starfield.style.zIndex = "0";

// NOTE TO TA, 55 stars + 55 circles = 110 objects, some of them hides behind face so you couldn't see them, this is due to above code

//Generate small stars across the entire viewBox.
for (let i = 0; i < 55; i++) {
  const cx = Math.random() * 800;
  const cy = Math.random() * 600;
  const radius = 10 + Math.random() * 30;

  const star = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );

  star.setAttribute("cx", String(cx));
  star.setAttribute("cy", String(cy));
  star.setAttribute("r", String(radius));
  star.setAttribute(
    "fill",
    Math.random() < 0.3 ? "#ffd76a" : "#ffffff",
  );

  starfield.append(star);
}

//Add some larger five pointed stars
for (let i = 0; i < 55; i++) {
  const cx = Math.random() * 800;
  const cy = Math.random() * 600;
  const radius = 10 + Math.random() * 20;

  const star = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon",
  );

  star.setAttribute(
    "points",
    createStar(cx, cy, radius, radius * 0.45),
  );

  star.setAttribute(
    "fill",
    Math.random() < 0.5 ? "#ffd76a" : "#a9d9ff",
  );

  starfield.append(star);
}

void spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
