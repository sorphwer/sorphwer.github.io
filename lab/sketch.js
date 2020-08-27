const VIEW_RADIUS = 8;
const CIRCLE_RADIUS = 4;
const LENGTH = 400;
const NUM_INITIAL_ELEMENTS = 16;
const EYE_RATIO = 0.5;
const ELLIPSE_RATIO = 0.2;
var elements = [];
var nextElementId = 1;
var mouseDownX = 0;
var mouseDownY = 0;
var mouseMoveX = 0;
var mouseMoveY = 0;
var mouseMoveVelX = 0;
var mouseMoveVely = 0;
var mousePressing = false;
var mouseDragging = false;
var mouseDragTargetId = -1;

class Element {
  constructor(x, y) {
    this.id = nextElementId++;
    this.x = x;
    this.y = y;
    this.r = 0.0;
    this.velX = 0.0;
    this.velY = 0.0;
    this.velR = 0.0;
    this.tgtOrb = CIRCLE_RADIUS;
    this.tgtR = 1.0;
    this.isEyeOpen = false;
    this.isEllipse = false;
    this.isTall = false;
    this.eyeX0 = 0.0;
    this.eyeY0 = 0.0;
    this.eyeX1 = 0.0;
    this.eyeY1 = 0.0;
    this.tgtEyeX0 = 0.0;
    this.tgtEyeY0 = 0.0;
    this.tgtEyeX1 = 0.0;
    this.tgtEyeY1 = 0.0;
    this.updateBody();

  }
  drawEllipse(x, y, r1,r2, col) {
    fill(col);
    ellipse(x, y, r1, r2);
  }

  drawBody() {

    if (this.r <= 0.0) return;
    if(this.isEllipse){
      if(this.isTall){
        this.drawEllipse(this.x, this.y, this.r * 1.7,this.r * 2.5, '#e60012');
      }
      else{
      this.drawEllipse(this.x, this.y, this.r * 2.5,this.r * 1.7, '#e60012');
      }
    }
    else{
      this.drawEllipse(this.x, this.y, this.r * 1.7,this.r * 1.7, '#e60012');
    }
  }
  drawEye(){
    if (this.r <= 0.0 || !this.isEyeOpen) return;
    if(this.isEllipse) return;
    var ex = this.x + this.eyeX0 * this.r;
    var ey = this.y + this.eyeY0 * this.r;
    this.drawEllipse(ex, ey, this.r / 1.2,this.r / 1.2, '#ffffff');
    ex += this.eyeX1 * this.r * 0.7;
    ey += this.eyeY1 * this.r * 0.7;
    this.drawEllipse(ex, ey, this.r / 2.6,this.r / 2.6, '#006bb7');
  }
  updateBody(eyeRatio = EYE_RATIO, ellipseRatio = ELLIPSE_RATIO) {
    this.velX = 0.5 * (Math.random() - 0.5);
    this.velY = 0.5 * (Math.random() - 0.5);
    this.velR = 0.5 * (Math.random() - 0.5);
    this.tgtR = 1.0 + 0.5 * Math.random();
    this.tgtOrb = CIRCLE_RADIUS + 1.2 * (Math.random() - 0.5);
    this.isEyeOpen = Math.random() < eyeRatio;
    if(Math.random() < ellipseRatio){
      this.isEllipse=true;
      if(Math.random()<0.5){
        this.isTall=true;
      }
      else{
        this.isTall=false;
      }
    }
    else{
      this.isEllipse=false;
    }
    //this.isEllipse = Math.random() < ellipseRatio;
    this.tgtEyeX0 = 0.8 * (Math.random() - 0.5);
    this.tgtEyeY0 = 0.8 * (Math.random() - 0.5);
  }
  updateEye() {
    this.tgtEyeX1 = 0.8 * (Math.random() - 0.5);
    this.tgtEyeY1 = 0.8 * (Math.random() - 0.5);
  }
  shakeBody(eyeRatio = EYE_RATIO, ellipseRatio = ELLIPSE_RATIO) {
    this.velX = 0.5 * (Math.random() - 0.5);
    this.velY = 0.5 * (Math.random() - 0.5);
    this.velR = 0.5 * (Math.random() - 0.5);
    this.tgtR = 1.0 + 0.5 * Math.random();
    this.tgtOrb = CIRCLE_RADIUS + 1.2 * (Math.random() - 0.5);
    this.isEyeOpen = Math.random() < eyeRatio;
    if(Math.random() < ellipseRatio){
      this.isEllipse=true;
      if(Math.random()<0.5){
        this.isTall=true;
      }
      else{
        this.isTall=false;
      }
    }
    else{
      this.isEllipse=false;
    }
    //this.isEllipse = Math.random() < ellipseRatio;
    this.tgtEyeX0 = 0.8 * (Math.random() - 0.5);
    this.tgtEyeY0 = 0.8 * (Math.random() - 0.5);
  }
  shakeEye() {
    this.tgtEyeX1 = 0.8 * (Math.random() - 0.5);
    this.tgtEyeY1 = 0.8 * (Math.random() - 0.5);
  }
  move() {
    if (mouseDragTargetId == this.id) return;
    var ranking = [];
    for (var i = 0; i < elements.length; i++) {
      let exElement = elements[i];
      let dx = exElement.x - this.x;
      let dy = exElement.y - this.y;
      let d = Math.sqrt(dx * dx + dy * dy);
      ranking.push({
        d: d,
        dx: dx,
        dy: dy
      });
    }

    ranking.sort(function(a, b) {
      return a.d - b.d;
    });
    ranking = ranking.slice(0, 3);

    for (var r of ranking) {
      let dx = r.dx;
      let dy = r.dy;
      let d = r.d;
      if (d < 0.001) continue;
      let d2 = d * d;
      let d3 = d * d * d;
      this.velX += 0.08 * dx / d2;
      this.velY += 0.08 * dy / d2;
      this.velX -= 0.15 * dx / d3;
      this.velY -= 0.15 * dy / d3;
    }
  }
  bounce() {
    if (mouseDragTargetId == this.id) {
      //let [wx, wy] = posToWorld(mouseX, mouseY);
      // this.x = wx;
      // this.y = wy;
      this.velX = mouseX / canvas.width * (VIEW_RADIUS * 2) - VIEW_RADIUS;
      this.velY = mouseY / canvas.width * (VIEW_RADIUS * 2) - VIEW_RADIUS;
      return;
    } else {
      this.velX *= 0.9;
      this.velY *= 0.9;
      this.velR *= 0.8;
      let orb = Math.sqrt((this.x * this.x) + (this.y * this.y));
      let dOrb = this.tgtOrb - orb;
      let accOrb = 0.3 * Math.sign(dOrb) * dOrb * dOrb;
      let accX = accOrb * (this.x / orb);
      let accY = accOrb * (this.y / orb);
      let accR = (this.tgtR - this.r) * 0.2;
      this.velX += accX;
      this.velY += accY;
      this.velR += accR;
    }

    const MAX_VEL_SIZE = 0.5;
    let velSize = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
    if (velSize > MAX_VEL_SIZE) {
      this.velX *= MAX_VEL_SIZE / velSize;
      this.velY *= MAX_VEL_SIZE / velSize;
    }
    this.x += this.velX;
    this.y += this.velY;
    this.r += this.velR;

    let eyeA = 0.1;
    this.eyeX0 = ((1.0 - eyeA) * this.eyeX0) + (eyeA * (this.tgtEyeX0 - this.eyeX0));
    this.eyeY0 = ((1.0 - eyeA) * this.eyeY0) + (eyeA * (this.tgtEyeY0 - this.eyeY0));
    this.eyeX1 = ((1.0 - eyeA) * this.eyeX1) + (eyeA * (this.tgtEyeX1 - this.eyeX1));
    this.eyeY1 = ((1.0 - eyeA) * this.eyeY1) + (eyeA * (this.tgtEyeY1 - this.eyeY1));
  }


}

function setup() {
  var len = min(windowWidth,windowHeight);
  var canvas = createCanvas(len, len);
  canvas.parent('canvas');
  for (var i = 0; i < NUM_INITIAL_ELEMENTS; i++) {
    var a = TAU * i / NUM_INITIAL_ELEMENTS;
    elements.push(new Element(
      CIRCLE_RADIUS * Math.cos(a),
      CIRCLE_RADIUS * Math.sin(a)
    ));
  }
  loop();
}


function draw() {
  background("fff"); //'#fff'
  scale(canvas.width / (VIEW_RADIUS * 2), canvas.height / (VIEW_RADIUS * 2));
  translate(VIEW_RADIUS, VIEW_RADIUS);
  noStroke();
  // ellipse(0, 0, 10, 10);
  textSize(1);  
  //text((mouseX-LENGTH/2)/((VIEW_RADIUS * 2) *3), 0, 7); 
  //text((mouseY-LENGTH/2)/((VIEW_RADIUS * 2) *3), 0, 8); 
  let testNode = elements[0];
  testNode.drawBody();
  //print(testNode.x,testNode.y);
  //console.log(elements);
  
  if (elements.length > 0) {
    var numOpenEye = 0;
    for (var element of elements) {
      if (element.isEyeOpen) numOpenEye++;
    }
    if (Math.random() < 0.005 * elements.length) {
      let i = Math.floor(Math.random() * elements.length);
      elements[i].updateBody(numOpenEye < 0.3 * elements.length ? 0.8 : 0.2);
      //elements[i].drawBody();
    }
    if (Math.random() < 0.01 * elements.length) {
      let i = Math.floor(Math.random() * elements.length);
      elements[i].updateEye();
      //elements[i].drawEye();
    }
  }


  for (let element of elements) {
    element.move();
    element.bounce();
  }
  for (let element of elements) {
    element.drawBody();
  }
  for (let element of elements) {
    element.drawEye();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth);
}


function findByWorldPos(x, y) {
  x = (x-LENGTH/2)/((VIEW_RADIUS * 2) *3);
  y = (y-LENGTH/2)/((VIEW_RADIUS * 2) *3);
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    let dx = element.x - x;
    let dy = element.y - y;
    let d2 = dx * dx + dy * dy;
    if (d2 < element.r * element.r) {
      console.log('found', i);
      return i;
    }
  }
  console.log('found no element', x, y);
  return -1;
}

function mousePressed() {
  // mousePressing = true;
  // mouseDragging = false;
  // [wx, wy] = posToWorld(ex, ey);
  let found_index = findByWorldPos(mouseX,mouseY);
  if (found_index >= 0) {
    mouseDragTargetId = elements[found_index].id;
  } else {
    mouseDragTargetId = -1;
  }
}