//declare all your variables in the global scope
let playButton; // to play the sounds
let myFont; 
let newFont;
let textArray1 = []; //store the x & y positions of all the points along the curves in the text
let volar = [];
let index = 0;
let r = 0; 
let audioDropdown;
let selectedOption;
let selectedColor;
let dings, announcement,crowd, siren, performance;
const selectedAudio = []; //the variable that stores the audio
let xPosSlider; //to manipulate the x position of the where the inputted text will appear
let yPosSlider; //to manipulate the y position of the where the inputted text will appear
const size = 420; //the font size
let colorDropdown; // the variable that will store the series of colors that the background can be changed into
// const palette = ['#EE352E', '#00933C', '#0039A6', '#FCCC0A', '#FF6319', '#A7A9AC', '#996633', '#6CBE45'];
const palette = ['#000000', '#FFFFFF'];
let saveButton;
let offset;
let vol;
let selectedLabel = ""; 
let firstName ='';
let lastName = '';
let controlsContainer;
let firstNameDiv, lastNameDiv, modeDiv, soundsDiv;

function preload() {
dings = loadSound("/audio/dings.mp3");
announcement = loadSound("/audio/announcement.mp3");
crowd = loadSound("/audio/crowd.mp3");
siren = loadSound("/audio/siren.mp3");
performance = loadSound("/audio/broadway.m4a");
diner = loadSound("/audio/diner-chatter.mp3")
selectedAudio.push(dings, siren, crowd, announcement, performance, diner);
myFont = loadFont('/typeface/NimbusSanL-Bold.ttf');
newFont = loadFont('/typeface/label.otf');
}

function setup() {
  createCanvas(1000, 2000/3); //set the bounds of the canvas to the postcard dimensions
  textAlign(CENTER, CENTER); 
  textWrap(WORD);

  controlsContainer = createDiv('');
  controlsContainer.class("controlsContainer");

  firstNameDiv = createDiv('');
  firstNameDiv.parent(controlsContainer)
  let firstNameLabel = createElement('h6', `Recipient's First Name`);
  firstNameLabel.addClass("Instruction");
  firstNameLabel.parent(firstNameDiv);
  let input = createInput();
  input.style("height","40px");
  input.changed(updateText); //callback function that will keep reading the input dialog box to see if there is new information
  input.class("dropdown");
  input.parent(firstNameDiv);

  lastNameDiv = createDiv('');
  lastNameDiv.parent(controlsContainer);
  let lastNamelabel = createElement('h6', `Recipient's Last Name`);
  lastNamelabel.addClass("Instruction");
  lastNamelabel.parent(lastNameDiv);
  let input2 = createInput();
  input2.style("height","40px");
  input2.changed(updateText2); //callback function that will keep reading the input dialog box to see if there is new information
  input2.class("dropdown");
  input2.parent(lastNameDiv);


  modeDiv = createDiv('');
  modeDiv.parent(controlsContainer);
  let radioLabel = createElement('h6','Pick a mode');
  radioLabel.addClass("Instruction");
  radioLabel.parent(modeDiv);
  radio = createRadio();
  radio.option(1);
  radio.option(2);
  radio.option(3);
  radio.option(4);
  radio.class("myRadio");
  radio.parent(modeDiv);
    

  soundsDiv = createDiv('');
  soundsDiv.parent(controlsContainer);
  let dropButton = createElement('h6', 'Pick a sound');
  dropButton.addClass("Instruction");
  dropButton.parent(soundsDiv);
  audioDropdown = createSelect();
  audioDropdown.option("Subway Turnstiles", 1);
  audioDropdown.option("Manhattan Sirens", 2);
  audioDropdown.option("Union Square Winter Market", 3);
  audioDropdown.option("MTA Transit Announcement", 4);
  audioDropdown.option("Streetside Performances", 5);
  audioDropdown.option("Diner Time Rush Hour", 6);
  audioDropdown.class("dropdown"); 
  updateAudio();
  audioDropdown.changed(updateAudio); // Call the updateAudio function when the dropdown selection changes
  audioDropdown.parent(soundsDiv);


  colorsDiv = createDiv('');
  colorsDiv.parent(controlsContainer);
  let subButton = createElement('h6', 'Pick a subway color');
  subButton.addClass("Instruction");
  subButton.parent(colorsDiv);

  colorDropdown = createSelect(colorToHex); //the DOM element that allows you to choose one option from a range of available options, in this case the color of the background
  // colorDropdown.position(width/2+640-120, height+180);
  colorDropdown.option("Purple");
  colorDropdown.option("Green");
  colorDropdown.option("Blue");
  colorDropdown.option("Yellow");
  colorDropdown.option("Orange");
  colorDropdown.option("Gray");
  colorDropdown.option("Brown");
  colorDropdown.option("Lime");
  colorDropdown.option("Red");
  colorDropdown.class("dropdown");
  colorDropdown.parent(colorsDiv);
  colorDropdown.changed(updateTextColor); //if the option that was initially selected changes, then the .changed operator calls the function to deal with it
  updateTextColor();


  playDiv = createDiv('');
  playDiv.parent(controlsContainer);
  let playLabel = createElement('h6', 'Play');
  playLabel.parent(playDiv);
  playLabel.style("color", "#F7F7FF");
  playLabel.addClass("Instruction");
  //create a button that will control the play and pause states of the audio stored in variable 'selectedAudio'
  playButton = createButton('  ▶ '); 
  playButton.mousePressed(toggleSong); //callback function that will be accessed the minute the mouse is pressed
  playButton.size(45,45);
  playButton.class("myButton"); //adding style to an html element requires assigning it a class so that the css can point to it and decorate it however
  playButton.parent(playDiv);
  textFont(myFont); 

  saveDiv = createDiv('');
  saveDiv.parent(controlsContainer);
  let saveLabel = createElement('h6', 'Save');
  saveLabel.style("color", "#F7F7FF");
  saveLabel.addClass("Instruction");
  saveLabel.parent(saveDiv);
  saveButton = createButton('Save Postcard');
  saveButton.addClass("saveButton");
  saveButton.mousePressed(takeSnapshot);
  saveButton.parent(saveDiv);

  amp = new p5.Amplitude(); //initialize amp object with the library that deals with analysing amplitude 
}

function takeSnapshot() {
  saveCanvas('New Postcard', 'png'); // Save the canvas as a PNG image with the filename "snapshot.png"
}

function updateText() {
  inputText = this.value()[0].toUpperCase(); //the variable inputText was created to store whatever the dialog box receives;
  textArray1 = myFont.textToPoints(inputText, width/2-300, height-180, size, {
    sampleFactor: 0.1,
  });
  firstName = this.value().toUpperCase();
}

function updateTextPosition() {
  textArray1 = myFont.textToPoints(inputText, width/2-300, height-180, size, { //
    sampleFactor: 0.1,
  });
  firstName = this.value().toUpperCase();
}

function updateText2() {
  inputText2 = this.value()[0].toUpperCase();//the variable inputText was created to store whatever the dialog box receives;
  textArray2 = myFont.textToPoints(inputText2, width/2+25, height-180, size, {
    sampleFactor: 0.1,
  });
  lastName = this.value().toUpperCase();
}

function updateTextPosition2() {
  textArray2 = myFont.textToPoints(inputText2, width/2+25, height-180, size, { //
    sampleFactor: 0.1,
  });
  lastName = this.value().toUpperCase();
}

function updateAudio() {
  selectedOption = audioDropdown.value();
  // Stop all currently playing sounds
  for (let i = 0; i < selectedAudio.length; i++) {
    if (selectedAudio[i] && selectedAudio[i].isPlaying()) {
      selectedAudio[i].stop();
    }
  }
 
  // Load and play the selected sound
  switch (selectedOption) {
    case "1":
      selectedLabel = "SUBWAY TURNSTILES";
      index = 0;
      break;
    case "2":
      selectedLabel = "MANHATTAN SIRENS";
      index = 1;
      break;
    case "3":
      selectedLabel = "UNION SQUARE WINTER MARKET";
      index = 2;
      break;
    case "4":
      selectedLabel = "MTA TRANSIT ANNOUNCEMENT";
      index = 3;
      break;
    case "5":
      selectedLabel = "STREETSIDE PERFORMANCES";
      index = 4;
      break;
    case "6":
      selectedLabel = "DINER TIME RUSH HOUR";
      index = 5;
      break;
    default:
      index=0;
      selectedLabel = "SUBWAY TURNSTILES"; // Set to an empty string if no option is selected
      break;
  }


}

function updateTextColor() {
   selectedColor = colorToHex(colorDropdown.value());
}

function colorToHex(colorName) {
  switch (colorName) {
    case "Red":
      return "#EE352E";
    case "Green":
      return "#00933C";
    case "Blue":
      return "#0039A6";
    case "Yellow":
      return "#FCCC0A";
    case "Orange":
      return "#FF6319";
    case "Gray":
      return "#A7A9AC";
    case "Brown":
      return "#996633";
    case "Lime":
      return "#6CBE45";
    case "Purple":
      return "#B933AD";
    default:
      return "#6CBE45";
  }
}

function toggleSong() {
  selectedOption = audioDropdown.value();
    if (selectedAudio[index].isPlaying()) {
      selectedAudio[index].pause();
      playButton.html('▶');
    } else 
      selectedAudio[index].play();
      playButton.html('▶');
  }

function nameLabel(){
  push()
  textFont(newFont);
  textAlign(LEFT);
  textSize(15);
  fill(0);
  noStroke();
  text("The sounds of", 30, 30);
  textSize(35);

  let label = selectedLabel;
  let words = label.split(' ');
  let line = '';
  let x = 30;
  let y = 50;
  
  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + ' ';
    let testWidth = textWidth(testLine);
    if (testWidth > 230) { // Adjust the width as needed
      text(line, x, y);
      y += 30; // Adjust the line height as needed
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  text(line, x, y); // Print the remaining text

  textSize(15);
  fill(255);
  text("Captured for", 30, 130);
  text(firstName + ' ' + lastName,100,130);
  pop()
}

function makeChaos(){
  for (let i = 0; i < textArray1.length; i++) {
    push();
    strokeWeight(6);
    stroke(palette[Math.floor(Math.random()*palette.length)]);
    translate(textArray1[i].x, textArray1[i].y);
    rotate(r);
    r++;
    line( offset, offset,-5,  -5);
    pop();
  }

  for (let i = 0; i < textArray2.length; i++) {
    push();
    strokeWeight(6);
    stroke(palette[Math.floor(Math.random()*palette.length)]);
    translate(textArray2[i].x, textArray2[i].y);
    rotate(r);
    r++;
    line(-5, -5, offset, offset);
    pop();
  }

nameLabel()
}

function makeMonster(){
  noFill();
  for(let i = 0; i < textArray1.length;i++){
    push();
    stroke(palette[Math.floor(Math.random()*palette.length)]);
    strokeWeight(5);
  translate(textArray1[i].x, textArray1[i].y);
  rotate(r);
    // r = r+noise(1);
    r++;
    // bezier(-20, -20,30,20+offset,10,10, 20, 20);
    bezier(-20, -20,30,offset,10,10, 20, 20);
    pop();
}

for(let i = 0; i < textArray2.length;i++){
  push();
  stroke(palette[Math.floor(Math.random()*palette.length)]);
  strokeWeight(5);
translate(textArray2[i].x, textArray2[i].y);
rotate(r);
  // r = r+noise(1);
  r++;
  // bezier(-20, -20,30,20+offset,10,10, 20, 20);
  bezier(-20, -20,30,offset,10,10, 20, 20);
  pop();
}

nameLabel()

}

function makeHairlines(){
  for (let i = 0; i < textArray1.length; i++) {
 stroke(palette[Math.floor(Math.random()*palette.length)]);
    push();
    noFill();
    stroke(palette[Math.floor(Math.random()*palette.length)]);
    strokeWeight(5);
    translate(textArray1[i].x, textArray1[i].y);
    rotate(220);
      // r++;
    line( 5, 5, 15, 15+3*(-offset)/2);
    pop();
  }

  for (let i = 0; i < textArray2.length; i++) {
    stroke(palette[Math.floor(Math.random()*palette.length)]);
       push();
       noFill();
       stroke(palette[Math.floor(Math.random()*palette.length)]);
       strokeWeight(5);
       translate(textArray2[i].x, textArray2[i].y);
       rotate(220);
         // r++;
       line( 5, 5, 15, 15+3*(-offset)/2);
       pop();
     }

     nameLabel();
}



function makeJitters(){
  for (let i = 0; i < textArray1.length; i++) {
    push();
    // strokeWeight(2);
    // noFill();
    noStroke();
    fill(palette[Math.floor(Math.random()*palette.length)]);
    circle(textArray1[i].x, textArray1[i].y, offset+random(10,15)*noise(i));
    pop();
}

for (let i = 0; i < textArray2.length; i++) {
  push();
  noStroke();
  fill(palette[Math.floor(Math.random()*palette.length)]);
  circle(textArray2[i].x, textArray2[i].y, offset+random(10,15)*noise(i));
  pop();
}


nameLabel()
}

function backCover(){
  push()
  translate(width/2,height/2)
  beginShape()
  for(let i = 0; i<360; i++){
    let a = map(volar[i], 0,1, 250,2000/3);
    let x = a * cos(i);
    let y = a * sin(i);
  noStroke();
  fill(palette[Math.floor(Math.random()*palette.length)]);
  circle(x, y,10);
  // line(x,y,x+20,y+20)
  // vertex(x, y);
  }
  endShape();
  if(volar.length>360) {
  volar.splice(0,1)
  }
  pop();
  }

function draw() {
// selectedColor = colorDropdown.value();
// background(selectedColor);
background(selectedColor);
vol = amp.getLevel(); //a variable that stores the amplitude values of the playing audio
volar.push(vol);


let val = radio.value();
backCover();
if (val == 1) {
  offset = map(vol,0,1,5,500);
  makeChaos();
}
if (val == 2) {
  offset = map(vol,0,1,20,300);
  makeHairlines();
}
if (val == 3) {
  offset = map(vol,0,1,10,500);
  makeJitters();
}
if (val == 4) {

  offset = map(vol,0,1,20,600);
  makeMonster();
}
nameLabel()
scale(0.5);
}

