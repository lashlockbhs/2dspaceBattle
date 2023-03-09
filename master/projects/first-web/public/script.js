import {
  setCanvas,
  drawLine,
  drawCircle,
  drawRect,
  drawTriangle,
  drawFilledCircle,
  drawFilledRect,
  drawFilledTriangle,
  drawText,
  clear,
  width,
  height,
  now,
  animate,
  registerOnclick,
  registerOnKeyDown,
} from "./graphics.js";


const canvas = document.getElementById("canvas");
setCanvas(canvas);

const drawStars = (percent) =>{
  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y++){
      if(Math.random()*100 < percent) drawFilledRect(x, y, Math.random()*1.2, Math.random()*1.5, "white");
      console.log(x, " ", y); 
    }
  }
}

drawStars(0.1)