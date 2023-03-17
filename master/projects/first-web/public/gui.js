//https://stackoverflow.com/questions/4602141/variable-name-as-a-string-in-javascript
const varToString = (varObj) => Object.keys(varObj)[0];

class Menu {
  constructor(options, menuHolder, hidden, name) {
    this.childs = [];
    this.currentWindows = [];
    this.elArray = [];
    this.options = options;
    this.menuHolder = menuHolder;
    this.headbar, this.window, this.windowObject;
    this.optionsHidden, (this.hidden = hidden);
    this.name = name;

  }
  #createButton(displayTxt) {
    const div = document.createElement('div');
    div.setAttribute('id', displayTxt);
    div.setAttribute('class', 'menu-option');
    div.append(document.createTextNode(displayTxt));
    this.hidden ? (div.style.visibility = 'hidden') : (div.style.visibility = 'visible');
    div.onmousedown = (e) => {
      this.onClick(div);
      e.stopPropagation();
    };
    div.onmouseup = (e) => {
      this.refresh(div);
      e.stopPropagation();
    };
    div.onmousemove = (e) => {
      this.onHover(div);
      e.stopPropagation();
    };
    div.onmouseleave = (e) => {
      this.refresh(div);
      e.stopPropagation();
    };
    this.elArray.push(div);
    this.headbar.append(div);
  }
  
  createElements() {
    //create button/option elements as divs
    for (let i = 0; i < this.options.length; i++) {
      this.#createButton(this.options[i].text);
    }
  }
  createHeadbar() {
    this.headbar = document.createElement('div');
    this.headbar.setAttribute('class', 'headbar');

    this.headbar.append(document.createTextNode(this.name))

    this.hidden
      ? (this.headbar.style.visibility = 'hidden')
      : (this.headbar.style.visibility = 'visible');
    this.headbar.onclick = (e) => {
      if (e.target === this.headbar && dragDone) {
        this.optionsHidden ? this.showAllEl() : this.hideAllEl();
      }
    };

    const whileDragging = (e) => {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX; //this math was sampled from chatgpt drag functions, but I had to
        currentY = e.clientY - initialY; //scrap the rest cause it didnt work with what I wanted to do
        xOffset = currentX;
        yOffset = currentY;
        this.setTranslate(currentX, currentY);
        dragDone = false;
      } else {
        dragDone = true;
      }
    };
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    let xOffset = 0;
    let yOffset = 0;
    let dragDone = true;

    this.headbar.onmousedown = (e) => {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      document.onmousemove = whileDragging;
      document.onmouseup = (e) => {
        isDragging = false;
        document.onmousemove = null;
      };
      isDragging = true;
    };
    this.headbar.onmouseup = (e) => {
      isDragging = false;
    };

    this.headbar.onmousemove = whileDragging;
    this.menuHolder.append(this.headbar);
  }
  createWindow(objects, width, height) {
    for (let i = 0; i < objects.length; i++) {
      const div = document.createElement('div');
      div.setAttribute('id', objects[i].name);
      div.setAttribute('class', 'var-display');
      if(objects[i].modify){
        const input = document.createElement("input");
        input.setAttribute("class", "density")
        input.setAttribute("id", this.name + " density")
        div.append(document.createTextNode(objects[i].name+": "), input)
      }
      div.append(
        document.createTextNode(objects[i].name + ': ' + JSON.stringify(objects[i].value)),
      );

      this.elArray.push(div);
      this.headbar.append(div);
    }
  }
  updateWindow(objects) {
    const divs = this.headbar.children;
    for (let i = 0; i < divs.length; i++) {
      divs[i].setAttribute('class', 'var-display');
      const object = objects.find((e) => e.name === divs[i].id);
      const textNode = divs[i].firstChild;
      textNode.nodeValue = object.name + ': ' + JSON.stringify(object.value);
    }
  }
  updateMenu() {
    for (let i = 0; i < this.options.length; i++) {
      try {
        this.elArray[i].firstChild.nodeValue = this.options[i].text;
      } catch {
        this.#createButton(this.options[i].text);
      }
    }
  }
  setTranslate(xPos, yPos) {
    this.headbar.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
  }
  setPos(xPos, yPos){
    this.headbar.style.left = xPos+"px";
    this.headbar.style.top = yPos+"px";
  }
  hideMenu() {
    this.headbar.style.visibility = 'hidden';
    this.hideAllEl();
  }
  showMenu() {
    this.headbar.style.visibility = 'visible';
    this.showAllEl();
  }
  showAllEl() {
    this.elArray.forEach((e) => (e.style.visibility = 'visible'));
    this.optionsHidden = false;
  }
  hideAllEl() {
    this.elArray.forEach((e) => (e.style.visibility = 'hidden'));
    this.optionsHidden = true;
  }
  onClick(el) {
    el.style.backgroundColor = 'rgb(105, 102, 102)';
    const child = this.childs.find((e) => e.button === el);
    if (child.el.hidden) {
      child.el.showMenu();
      child.el.hidden = false;
    } else {
      child.el.hideMenu();
      child.el.hidden = true;
    }
  }
  onHover(el) {
    el.style.backgroundColor = 'rgb(155, 151, 151)';
  }
  refresh(el) {
    el.style.backgroundColor = 'rgb(200, 192, 192)';
  }
};

const shipsMenu = new Menu([{text : "Ships"}], null, false, "ships");
shipsMenu.createHeadbar();
shipsMenu.createElements();

export { Menu, shipsMenu };