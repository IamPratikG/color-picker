// Import the config
// import { CANVAS_WIDTH, CANVAS_HEIGHT } from "config";

// Picker State Management

let isPickerSelected = false;

function togglePicker(): void {
  const body = document.getElementsByTagName("body")[0];
  isPickerSelected = !isPickerSelected;

  const svgContainer = document.querySelector(".svg-container");
  if (isPickerSelected) {
    body.style.cursor = `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.4067 2.92666C13.802 3.32266 14 3.80667 14 4.38C14 4.94267 13.802 5.422 13.4067 5.818L11.3907 7.818L12.4687 8.91133C12.5191 8.95985 12.559 9.01819 12.5859 9.08275C12.6129 9.14731 12.6263 9.21671 12.6253 9.28666C12.6254 9.43221 12.5693 9.57217 12.4687 9.67733C12.4176 9.72862 12.3567 9.76892 12.2895 9.79575C12.2223 9.82258 12.1503 9.83537 12.078 9.83333C12.0082 9.83428 11.939 9.82092 11.8745 9.79409C11.8101 9.76727 11.7518 9.72753 11.7033 9.67733L10.6253 8.58333L5.09399 14.1147C5.02969 14.1889 4.94948 14.2477 4.85932 14.2867C4.77599 14.318 4.68199 14.3333 4.57799 14.3333H2.71866C2.5269 14.3355 2.34191 14.2625 2.20332 14.13C2.07071 13.9915 1.99771 13.8064 1.99999 13.6147V11.7547C1.99999 11.6513 2.01532 11.5573 2.04666 11.474C2.0856 11.3838 2.1444 11.3036 2.21866 11.2393L7.74999 5.708L6.65666 4.63C6.60634 4.58156 6.56648 4.52332 6.53953 4.45888C6.51259 4.39445 6.49913 4.32517 6.49999 4.25533C6.49999 4.09866 6.55199 3.96866 6.65599 3.86466C6.76126 3.76429 6.9012 3.70841 7.04666 3.70867C7.19332 3.70867 7.31799 3.76066 7.42199 3.86466L8.51532 4.94266L10.5153 2.92733C10.7017 2.73531 10.9255 2.58353 11.1728 2.48137C11.4201 2.3792 11.6858 2.32882 11.9533 2.33333C12.5267 2.33333 13.0107 2.53133 13.4067 2.92666ZM4.43666 13.256L9.84332 7.84933L8.48332 6.49L3.07732 11.8967V13.256H4.43732H4.43666Z' fill='black'/%3E%3C/svg%3E") 8 8, pointer`;
    svgContainer?.classList.remove("svg-inactive");
    svgContainer?.classList.add("svg-active");
  } else {
    body.style.cursor = "auto";
    svgContainer?.classList.add("svg-inactive");
    svgContainer?.classList.remove("svg-active");
  }
}

document
  .getElementById("pickMe")
  ?.addEventListener("click", (e: MouseEvent) => {
    togglePicker();
    e.stopPropagation();
  });

// Initialize Canvas

const myCanvas = document.getElementById("my-canvas") as HTMLCanvasElement;
const context = myCanvas.getContext("2d", { willReadFrequently: true })!;
const magnifier = document.getElementById("zoom") as HTMLCanvasElement;
const ctx = magnifier.getContext("2d", { willReadFrequently: true })!;

const img = new Image();
img.src = "./resources/image.jpg";

img.onload = () => {
  context.drawImage(img, 0, 0, 960, 540);
};

// Handle Color Picker Events

myCanvas.addEventListener("mousemove", (e: MouseEvent) => {
  if (isPickerSelected) {
    const leftOffset = myCanvas.offsetLeft;
    const topOffset = myCanvas.offsetTop;
    const left = e.pageX - leftOffset;
    const top = e.pageY - topOffset;
    const pixel = context.getImageData(left, top, 1, 1);
    fillCircleBorder(pixel);
    zoomImage(left, top);
  }
  e.stopPropagation();
});

// Method to fill the border of the selected color circle

function fillCircleBorder(pixel: ImageData): void {
  const rgb = pixel.data;
  const hex = `#${rgb[0].toString(16).padStart(2, "0")}${rgb[1]
    .toString(16)
    .padStart(2, "0")}${rgb[2].toString(16).padStart(2, "0")}`;
  const colorCircle = document.getElementById("color-circle");
  if (colorCircle) {
    colorCircle.style.fill = hex;
  }
  const previewCode = document.getElementById("preview-code");
  if (previewCode) {
    previewCode.innerHTML = hex;
  }
}

function zoomImage(left: number, top: number): void {
  const imgLeft = (img.naturalWidth / 960) * left - 69;
  const imgTop = (img.naturalHeight / 540) * top - 69;
  ctx.drawImage(img, imgLeft, imgTop, 138, 138, 0, 0, 138, 138);
}

myCanvas.addEventListener("click", (e: MouseEvent) => {
  if (isPickerSelected) {
    const leftOffset = myCanvas.offsetLeft;
    const topOffset = myCanvas.offsetTop;
    const left = e.pageX - leftOffset;
    const top = e.pageY - topOffset;
    const pixel = context.getImageData(left, top, 1, 1);
    const rgb = pixel.data;
    const hex = `#${rgb[0].toString(16).padStart(2, "0")}${rgb[1]
      .toString(16)
      .padStart(2, "0")}${rgb[2].toString(16).padStart(2, "0")}`;
    const paletteCode = document.getElementById("palette-code");
    if (paletteCode) {
      paletteCode.innerHTML = hex;
    }
  }
  e.stopPropagation();
});
