window.addEventListener("load", sidenVises);
let liv;
let point;

const blue1 = document.querySelector("#blue_container");
const blue2 = document.querySelector("#blue_container2");
const blue3 = document.querySelector("#blue_container3");

const red1 = document.querySelector("#red_container");
const red2 = document.querySelector("#red_container2");
const red3 = document.querySelector("#red_container3");

const tid = document.querySelector("#tid_container");

//gør så elementerne falder random
function ranTal(n) {
  return Math.floor(Math.random() * n) + 1;
}

function sidenVises() {
  console.log("sidenVises");

  //størrelse liv og point
  window.addEventListener("resize", windowResize);
  windowResize();

  //Vis startskærm
  document.querySelector("#startskærm").classList.remove("hide");

  //Gør at man klikke på startknappen
  document.querySelector("#startknap").addEventListener("click", startSpillet);

  //Skjul alle sider undtagen startskærm
  document.querySelector("#gameover").classList.add("hide");
  document.querySelector("#vinder").classList.add("hide");
  document.querySelector("#game").classList.add("hide");
}

function windowResize() {
  console.log("windowResize");
  let widthScreen = document.querySelector("#screen").clientWidth;

  let myFontInProcent1 = 5;
  let myFont1 = (widthScreen / 100) * myFontInProcent1;
  document.querySelector("#livtilbage").style.fontSize = myFont1 + "px";

  let myFontInProcent2 = 3;
  let myFont2 = (widthScreen / 100) * myFontInProcent2;
  document.querySelector("#pointtavle").style.fontSize = myFont2 + "px";
}

function startSpillet() {
  console.log("startSpillet");

  document.querySelector("#gameover").classList.add("hide");
  document.querySelector("#vinder").classList.add("hide");
  document.querySelector("#startskærm").classList.add("hide");
  document.querySelector("#game").classList.remove("hide");

  //nulstil point og udskriv
  point = 0;
  document.querySelector("#pointtavle").textContent = point;

  //reset liv til 3
  liv = 3;
  document.querySelector("#livtilbage").textContent = liv;

  //gør så elementerne falder ned
  blue1.classList.add("fald", "del" + ranTal(4), "pos" + ranTal(7));
  blue2.classList.add("fald", "del" + ranTal(4), "pos" + ranTal(7));
  blue3.classList.add("fald", "del" + ranTal(4), "pos" + ranTal(7));

  red1.classList.add("fald", "del" + ranTal(4), "pos" + ranTal(7));
  red2.classList.add("fald", "del" + ranTal(4), "pos" + ranTal(7));
  red3.classList.add("fald", "del" + ranTal(4), "pos" + ranTal(7));

  //gør så man kan klikke på blå og rød
  blue1.addEventListener("click", blueClickHandler);
  blue2.addEventListener("click", blueClickHandler);
  blue3.addEventListener("click", blueClickHandler);

  red1.addEventListener("click", redClickHandler);
  red2.addEventListener("click", redClickHandler);
  red3.addEventListener("click", redClickHandler);

  //gør så de genstarter
  red1.addEventListener("#animationiteration", genstartredClickHandler);
  red2.addEventListener("#animationiteration", genstartredClickHandler);
  red3.addEventListener("#animationiteration", genstartredClickHandler);

  blue1.addEventListener("#animationiteration", genstartblueClickHandler);
  blue2.addEventListener("#animationiteration", genstartblueClickHandler);
  blue3.addEventListener("#animationiteration", genstartblueClickHandler);

  //start timer
  document.querySelector("#tid_sprite").classList.add("tid");
  tid.addEventListener("animationend", stopSpillet);
}

//blå//

function blueClickHandler() {
  console.log("klik på blå");

  document.querySelector("#fuck").currentTime = 0;

  liv--;
  console.log(liv);
  if (liv > 0) {
    document.querySelector("#fuck").play();
  }

  //får den(sprite) til at dreje rundt og forsvinde.
  this.firstElementChild.classList.add("drej");
  //eventlistener er ALTID på containeren
  this.addEventListener("animationend", genstartblueClickHandler);

  //man mister et liv og får vist antal liv tilbage

  document.querySelector("#livtilbage").textContent = liv;
  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
  }
}

//rød//

function redClickHandler() {
  console.log("klik på rød");

  document.querySelector("#yes").currentTime = 0;
  document.querySelector("#yes").play();

  //får sprite til at dreje rundt og forsvinde.
  this.firstElementChild.classList.add("drej");
  //Containeren lytter til hvornår sprite er færdig med .drej og kalder genstartredClickHandler funktionen
  this.addEventListener("animationend", genstartredClickHandler);

  //gør så man får et point og udskriver/viser antal point
  point++;
  document.querySelector("#pointtavle").textContent = point;
}

//gør så fald-animationen genstarter når man klikker på elementerne

function genstartblueClickHandler() {
  console.log("genstartblueClickHandler");
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  this.classList.add("fald");
  this.classList.add("pos" + ranTal(7));
}

function genstartredClickHandler() {
  console.log("genstartredClickHandler");

  //fjerner alle classes fra container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";
  //force reflow
  this.offsetLeft;
  //gør så den falder og får random position
  this.classList.add("fald");
  this.classList.add("pos" + ranTal(7));
}

function stopSpillet() {
  console.log("stopSpillet");

  //stop timer
  document.querySelector("#tid_sprite").classList.remove("tid");
  tid.removeEventListener("animationend", stopSpillet);

  //fjern alt på container og sprite

  red1.classList = "";
  document.querySelector("#red_sprite").classList = "";
  red2.classList = "";
  document.querySelector("#red_sprite2").classList = "";
  red3.classList = "";
  document.querySelector("#red_sprite3").classList = "";

  blue1.classList = "";
  document.querySelector("#blue_sprite").classList = "";
  blue2.classList = "";
  document.querySelector("#blue_sprite2").classList = "";
  blue3.classList = "";
  document.querySelector("#blue_sprite3").classList = "";

  //fjern funktioner

  red1.removeEventListener("#animationend", genstartredClickHandler);
  red1.removeEventListener("#animationiteration", genstartredClickHandler);
  red1.removeEventListener("#mousedown", genstartredClickHandler);

  red2.removeEventListener("#animationend", genstartredClickHandler);
  red2.removeEventListener("#animationiteration", genstartredClickHandler);
  red2.removeEventListener("#mousedown", genstartredClickHandler);

  red3.removeEventListener("#animationend", genstartredClickHandler);
  red3.removeEventListener("#animationiteration", genstartredClickHandler);
  red3.removeEventListener("#mousedown", genstartredClickHandler);

  blue1.removeEventListener("#animationend", genstartblueClickHandler);
  blue1.removeEventListener("#animationiteration", genstartblueClickHandler);
  blue1.removeEventListener("#mousedown", genstartblueClickHandler);

  blue2.removeEventListener("#animationend", genstartblueClickHandler);
  blue2.removeEventListener("#animationiteration", genstartblueClickHandler);
  blue2.removeEventListener("#mousedown", genstartblueClickHandler);

  blue3.removeEventListener("#animationend", genstartblueClickHandler);
  blue3.removeEventListener("#animationiteration", genstartblueClickHandler);
  blue3.removeEventListener("#mousedown", genstartblueClickHandler);

  if (liv <= 0) {
    gameOver();
  } else if (point >= 15) {
    levelComplete();
  } else {
    gameOver();
  }
}

function gameOver() {
  console.log("Du tabte");

  document.querySelector("#tabte").play();

  document.querySelector("#game").classList.add("hide");
  //Vis gameoverskærm
  document.querySelector("#gameover").classList.remove("hide");
  //Klik på try again
  document.querySelector("#try_again").addEventListener("click", startSpillet);

  document.querySelector("#tabte").play();
}

function levelComplete() {
  console.log("Du vandt");

  document.querySelector("#vandt").play();

  document.querySelector("#game").classList.add("hide");
  document.querySelector("#vinder").classList.remove("hide");
  document.querySelector("#try_again2").addEventListener("click", startSpillet);
}

// if (liv <= 0) {
//  document.querySelector("#game_over_point").textContent = "Du tabte";
//} else {
//document.querySelector("#game_over_point").textContent = "Du fik kun" + point + "point";
//}

// if (point <= 10) {
// document.querySelector("#vinder_point").textContent = "Du";
//}
