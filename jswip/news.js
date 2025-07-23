var tick = 0;

var newstexts = [
  "Lab-Grown Meta Bacteria Causes Evolution Of Laser-Zebras",
  "Wow so rizzy",
  "Back in my day we didnt have videogames",
  "Rat Infestation Causes Child Labor Spike",
  "Study Finds League Of Legends May Reduce Neural Activity Levels",
  "Lunatic Causes Asteroid Mining Accident Totalling 8.4Qd In Damages",
  "Study Finds Pineapple On Pizza May Cure Cancer",
  "The One Piece Is Real",
  "Chicken jockey",
  "Man's Consciousness Merges With Star In Freak Accident",
  "These news tips are generally pointless to read",
  "Does anyone even read these?"
]

function Random(m) {
  return Math.floor(m*Math.random());
}

var current = 3

var textbox = document.getElementById("newsText")

function news() {
  tick += 1;
  
  textbox.style.left = String(100 - tick/10) + "%"
  textbox.innerHTML = newstexts[current]
  
  if (tick >= 2000) {
    tick = 0
    current = Random(3)
  }
  
  document.getElementById("background").style.backgroundPosition = String(tick/5)+"px "+String(tick/5)+"px"
  
}

document.addEventListener("DOMContentLoaded", function() {
  news();
  setInterval(news, 16);
});