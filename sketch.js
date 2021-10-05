let imgArr = [], count =1, FRAMES_PER_SECOND = 4;
const maxFrames = 360, width = 4000, height = width;
const CAPTURE=false, // Captures an image per a new set of frames
DISPLAY_NUMBER = false, // Displays the frame number in the top left corner of the image
RANDOM_IMAGES = false, // Shuffle images for display
RANDOM_SIZE = false, // Use a random number between 1 and NUMBERS_PER_ROW of divisions when displaying the image grid
NUMBER_PER_ROW = 10; // Number of images per row (and column, as this is square)

function preload() {
  for (let i=1; i<maxFrames; i++){
    const zeroStuff = i < 10 ? '000' + i : i > 99 ? '0' + i : '00' + i;
    // If your file naming differs from 0001.png format,
    // you'll want to fix that here (e.g. after running through
    // REAL-ESRGan, you might have an _out attached to the filename.0
    imgArr.push(
      loadImage(
        `${zeroStuff}.png`
        )
      );
  }
}

function setup() {
  createCanvas(width,height);
  frameRate(FRAMES_PER_SECOND);
  colorMode(HSL);
}


function draw() {
  let newNumber = RANDOM_SIZE? floor(random(1, NUMBER_PER_ROW)) : NUMBER_PER_ROW;
  const frame = frameCount % maxFrames;
  const DISPLAY_FRAMES=(newNumber*newNumber); //must be perfect sq

  for (let i=frame; i<frame+DISPLAY_FRAMES;i+=DISPLAY_FRAMES){
    
    const { DIVS, PIC_WIDTH } = setSizes(DISPLAY_FRAMES);
    displayGrid(DIVS, i, PIC_WIDTH);
  }
  checkForCapture(newNumber);
}

function setSizes(DISPLAY_FRAMES) {
  const DIVS = sqrt(DISPLAY_FRAMES);
  const PIC_WIDTH = width / DIVS;
  return { DIVS, PIC_WIDTH };
}

function displayGrid(DIVS, i, PIC_WIDTH) {
  for (let x = 0; x < DIVS; x++) {
    for (let y = 0; y < DIVS; y++) {
      const idx = (i + (y * DIVS) + x);

      if (RANDOM_IMAGES) {
        const randIdx = floor(random(1, maxFrames - 2));
        image(imgArr[randIdx], x * PIC_WIDTH % width, y * PIC_WIDTH % height, width / DIVS, height / DIVS);
        if (DISPLAY_NUMBER) {
          fill(frameCount % 360, 90, 80);
          text(`${randIdx}`, x * PIC_WIDTH % width + 10, y * PIC_WIDTH % height + 10, width / DIVS, height / DIVS);
        }
      }
      else {
        image(imgArr[idx % maxFrames] ? imgArr[idx % maxFrames] : imgArr[maxFrames - idx % maxFrames], x * PIC_WIDTH % width, y * PIC_WIDTH % height, width / DIVS, height / DIVS);
        if (DISPLAY_NUMBER) {
          fill(frameCount % 360, 90, 80);
          text(`${idx % maxFrames}`, x * PIC_WIDTH % width + 10, y * PIC_WIDTH % height + 10, width / DIVS, height / DIVS);
        }
      }
    }
  }
}

function checkForCapture(newNumber) {
  if (CAPTURE && (frameCount == 1 || frameCount % (newNumber * newNumber) == 0)) {
    capture();
  }
}

function addImg(img){
  imgArr.push(img);
}

function zeroPad(input, length) {
  return (Array(length + 1).join("0") + input).slice(-length);
}

function capture() {
  save(`${zeroPad(count, 4)}.png`);
  count += 1;
}
