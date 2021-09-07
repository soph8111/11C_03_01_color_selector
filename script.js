"use strict";
window.addEventListener("DOMContentLoaded", start);

const color = document.querySelector("#selected_color");

function start() {
  color.addEventListener("input", readInput);
}

function readInput(event) {
  document.querySelector("#color_box").style.background = event.target.value;
  convertToHex(event);
  console.log(event);
}

function convertToHex(event) {
  const HEX = event.target.value;
  console.log(`HEX: ${HEX}`);
  showHex(HEX);
}

function showHex(hex) {
  document.querySelector("#HEX").innerHTML = `HEX: ${hex}`;
  convertToRgb(hex);
}

function convertToRgb(hex) {
  const R = hex.substring(1, 3);
  const G = hex.substring(3, 5);
  const B = hex.substring(5, 7);
  console.log(`RGB: ${R}${G}${B}`);
  calculateRGB(R, G, B);
}

function calculateRGB(red, green, blue) {
  red = parseInt(red, 16);
  green = parseInt(green, 16);
  blue = parseInt(blue, 16);

  showRgb(red, green, blue);
}

function showRgb(r, g, b) {
  document.querySelector("#RGB").innerHTML = `RGB: ${r} ${g} ${b}`;
  convertToHsl(r, g, b);
}

function convertToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  const HSL = h + s + l;
  showHsl(h, s, l);
}

function showHsl(hue, sat, lum) {
  document.querySelector("#HSL").innerHTML = `HSL: ${hue} ${sat}% ${lum}%`;
}
