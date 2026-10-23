const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "svg",
);
face.setAttribute("viewBox", "0 0 400 400");
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

const nose = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "line",
);
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

const mouth = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "line",
);
mouth.setAttribute("x1", "75");
mouth.setAttribute("y1", "137");
mouth.setAttribute("x2", "125");
mouth.setAttribute("y2", "137");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");
face.append(mouth);

// B --------------------------
// Create the container that will spin all the artwork
portrait.style.position = "relative";
portrait.style.overflow = "hidden";

const artwork = document.createElement("div");

Object.assign(artwork.style, {
  position: "relative",
  width: "100%",
  height: "400px",
  transformOrigin: "center center",
});

// Windows XP Bliss background
const background = document.createElement("img");
background.src =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4GeoQObLQJVpMUtHK8v2KDhgjgvFhZ19N50ib8HYr-A&s";
background.alt = "Green hills and blue sky";

Object.assign(background.style, {
  position: "absolute",
  inset: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: "0",
});

// House image
const house = document.createElement("img");
house.src =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPkSG7LWCvesCfaJGyyrMALHhkBBwKtfwbARFh-dsTQEebge5GvR2s_CUK&s=10";
house.alt = "House in a grassy landscape";

Object.assign(house.style, {
  position: "absolute",
  width: "45%",
  height: "auto",
  left: "50%",
  bottom: "14%",
  zIndex: "1",
});

Object.assign(face.style, {
  position: "relative",
  display: "block",
  width: "100%",
  height: "100%",
  zIndex: "2",
  overflow: "visible",
});

artwork.append(background);
artwork.append(house);
artwork.append(face);
portrait.append(artwork);

// Restart rather than accumulate simultaneous animations on repeated clicks.
//Spin the background, house, and face together
spin.addEventListener("click", () => {
  // Cancel any previous spin.
  for (const animation of artwork.getAnimations()) {
    animation.cancel();
  }

  artwork.animate(
    [
      { transform: "rotate(0deg)" },
      { transform: "rotate(360deg)" },
    ],
    {
      duration: 800,
      easing: "ease-in-out",
    },
  );
});
