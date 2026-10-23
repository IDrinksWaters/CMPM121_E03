const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute("aria-label", "A face reacting to spicy food");

// Create SVG definitions for the gradient.
const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

const gradient = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "linearGradient",
);

gradient.setAttribute("id", "spicy-gradient");
gradient.setAttribute("x1", "0%");
gradient.setAttribute("y1", "0%");
gradient.setAttribute("x2", "100%");
gradient.setAttribute("y2", "100%");

// ellow at the beginning of the gradient
const yellowStop = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "stop",
);
yellowStop.setAttribute("offset", "0%");
yellowStop.setAttribute("stop-color", "#ffeb70");
gradient.append(yellowStop);

//Orange in the middle
const orangeStop = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "stop",
);
orangeStop.setAttribute("offset", "50%");
orangeStop.setAttribute("stop-color", "#ff9638");
gradient.append(orangeStop);

//Red at the end
const redStop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
redStop.setAttribute("offset", "100%");
redStop.setAttribute("stop-color", "#e52b24");
gradient.append(redStop);

defs.append(gradient);
face.append(defs);

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "url(#spicy-gradient)");
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

//A wavy mouth showing a spicy food reaction
const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");

mouth.setAttribute(
  "d",
  "M 72 135 C 82 120, 92 150, 102 135 S 122 120, 130 135",
);

mouth.setAttribute("fill", "none");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");

face.append(mouth);
