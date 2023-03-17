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
  OnMouseDown,
  OnMouseUp,
  OnMouseMove
} from "./graphics.js";


const canvas = document.getElementById("canvas");
setCanvas(canvas);
let animateStart = false;

const drawStars = (percent) => {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (Math.random() * 100 < percent) drawFilledRect(x, y, Math.random() * 1.2, Math.random() * 1.5, "white");
    }
  }
};

const blockClicked = (x, y) => {
  const clicked = [];
  for (const ship of ships) {
    let num = 0;
    for (const block of ship.blocks) {

      if (x > block[0].x && y > block[0].y && x < block[2].x && y < block[2].y) {
        clicked.push({ block, ship, num });
      }
      num++;
    }
  }
  return clicked;
}

const getEffects = () =>{
  
}

const start = () => {
  animateStart = true;
}

let blocks = [];
let cords = [];
const ships = [];
registerOnclick((x, y) => {
  drawFilledCircle(x, y, 2, "white")
  cords.push({ x, y })
  for(const block of blockClicked(x, y)){
    block.ship.components.push({name : document.getElementById("compName"), effects : []})
  };
})
registerOnKeyDown((k) => {
  if (k === 'Enter') {
    clear();
    ships.push(new ship("ship " + ships.length, [{ type: "1", pos: "1" }], null, [{ name: "Engine", pos: "eng" }, { name: "Reactor", pos: 3 }], blocks));
    console.log(ships)
    blocks = [];
    cords = [];

    for (const e of ships) {
      e.drawShipBase();
    }

  } else if (k === 'K') {
    //kill
    animateStart = false
  } else if (k === "s") {
    //pause/start
    animateStart = !animateStart
  }
});

let startPos;
let endPos;
let dragStart;
OnMouseDown((x, y) => {
  if (!animateStart) {
    startPos = { x, y };
    dragStart = true;
  };

});
OnMouseUp((x, y) => {
  if (!animateStart) {
    drawRect(startPos.x, startPos.y, (startPos.x - x) * -1, (startPos.y - y) * -1, "white", 1);
    blocks.push([{ x: startPos.x, y: startPos.y }, { x, y: startPos.y }, { x, y }, { x: startPos.x, y }])
    dragStart = false;

  };
});

/*
OnMouseMove((x, y) => {
  if (dragStart) {
    clear();
    for(const ship in ships){
      ship.drawShipBase();
    }
    drawRect(startPos.x, startPos.y, (startPos.x - x) * -1, (startPos.y - y) * -1, "white", 1);
  }
});
*/

class ship {
  constructor(name, guns, size, blocks) {
    this.name = name;
    this.guns = guns;
    this.size = size;
    this.components = [];  //{name : "eng", effects : [{name : speed, mod : 10}, {name : manuavorability, mod : 5}], pos : 1}
    this.rotation = 0;
    this.blocks = blocks;
  }

  drawShipBase() {
    for (let i = 0; i < this.blocks.length; i++) {
      for (let a = 0; a < 4; a++) {
        if (a === 3) {
          drawLine(this.blocks[i][a].x, this.blocks[i][a].y, this.blocks[i][0].x, this.blocks[i][0].y, "white", 1)
        }
        else {
          drawLine(this.blocks[i][a].x, this.blocks[i][a].y, this.blocks[i][a + 1].x, this.blocks[i][a + 1].y, "white", 1)

        }

      }
    }
  }
}
const msPerFrame = 10;
let next = msPerFrame;

const frame = (time) => {
  if (time > next && animateStart) {
    clear();
    //drawStars(0.5);
    for (const ship of ships) {
      ship.drawShipBase();
    }
  }
  next += msPerFrame;
}

animate(frame);