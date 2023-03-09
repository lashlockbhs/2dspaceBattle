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
let animateStart = false;

const drawStars = (percent) =>{
  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y++){
      if(Math.random()*100 < percent) drawFilledRect(x, y, Math.random()*1.2, Math.random()*1.5, "white");
    }
  }
}
const start = () =>{
  animateStart = true;
}

const verticies = [];
const cords = [];
const ships = [];
registerOnclick((x, y) => {
  drawFilledCircle(x, y, 2, "white")
  cords.push({ x, y })
  if(cords.length%2===0){
    verticies.push({x : cords[cords.length-2].x, y : cords[cords.length-2].y, x2 : cords[cords.length-1].x, y2 : cords[cords.length-1].y, })
  }
})
registerOnKeyDown((k) => {
  if (k === 'Enter') {
    ships.push(new ship())
  } else if (k === 'K') {
    //kill
    animateStart = false
  }else if (k === "s"){
    //pause/start
    animateStart = !animateStart
  }
})

class ship{
  constructor(name, guns, size, components, verticies){
    this.name = name;
    this.guns = guns;
    this.size = size;
    this.components = components; //{name: "Engine", pos : 1-amount of component slots, }
    this.rotation = 0;
    this.verticies = verticies;
  }

  drawShipBase(){
    for(let i = 0; i < this.verticies.length; i++){
      const vert = this.verticies[i]
      drawLine(vert.x, vert.y, vert.x2, vert.y2, "white", 1);
      //drawFilledRect()
    }
  }
}
const msPerFrame = 10;
let next = msPerFrame;

const frame = (time) =>{
  if(time > next && animateStart){
    clear();
    drawStars(0.5)
  }
  next+=msPerFrame;
}

animate(frame);