const Decimal = window.Decimal;
var tick = 1;
export { tick };

function E(n) {
  
  return new Decimal().fromString(n)
  
}

var ScrollX = 0;
var ScrollY = 0;
var ScrollVelX = 0;
var ScrollVelY = 0;
var DOCLOADED = false

var WDown = false;
var ADown = false;
var SDown = false;
var DDown = false;

var timespeed = E("1")

window.format = function(m,e) {
  var n = m.toFixed(e)

  var mag = n.log10()
  var base = n.div(E("10").pow(mag.floor()))

  if (mag.gte(E("6"))) {
    var basestr = String(base)
    if (basestr.length < 4) {
      basestr = basestr.padEnd(2,".").padEnd(4, "0");
    }
    return basestr.slice(0,4) + "e" + String(mag)
  } else {
    return String(base.floor())
  }
  
}

window.player = {
  data: E("0"),
  dataBest: E("0"),
  simulationTier: E("0"),
  simulationTierBest: E("0"),
  progression: 1,
  computation: E("0"),
  computationMax: E("1e5"),
  computationBest: E("0"),
  significantData: E("0"),
  significantDataBest: E("0"),
  circa: E("0"),
  forma: E("0"),
  entra: E("0"),
  circaBest: E("0"),
  formaBest: E("0"),
  entraBest: E("0")
};

var player = window.player

// A function to calculate the speed of time
function gettimespeed() {
  var temp = E("1")
  
  return temp
}

// Un-NaNs any values that it deems fit upon loading.
function unNaN() {
  
  function checkbuyable(m,n) {
    if (isNaN(window.BUYABLES[n][m].bought)) {window.BUYABLES.data[m].bought = E("0")}
  }
  
  //if (isNaN(player.data)) {player.data = E("0")}
  //if (isNaN(player.dataBest)) {player.dataBest = E("0")}
  //if (isNaN(player.simulationTier)) {player.simulationTier = E("0")}
  //if (isNaN(player.simulationTierBest)) {player.simulationTierBest = E("0")}
  //if (isNaN(player.progression)) {player.progression = 1}
  //if (isNaN(player.computation)) {player.computation = E("0")}
  //if (isNaN(player.computationBest)) {player.computationBest = E("0")}
  //if (isNaN(player.significantData)) {player.significantData = E("0")}
  //if (isNaN(player.significantDataBest)) {player.significantDataBest = E("0")}
  //if (isNaN(player.computationMax)) {player.computationMax = E("1e5")}
  //if (isNaN(player.circa)) {player.circa = E("0")}
  //if (isNaN(player.circaBest)) {player.circaBest = E("0")}
  //if (isNaN(player.entra)) {player.entra = E("0")}
  //if (isNaN(player.entraBest)) {player.entraBest = E("0")}
  //if (isNaN(player.forma)) {player.forma = E("0")}
  //if (isNaN(player.formaBest)) {player.formaBest = E("0")}
  
  checkbuyable("compressor","data")
  checkbuyable("compounder","data")
  checkbuyable("incrementallist","data")
  checkbuyable("coProcessor","significantData")
  checkbuyable("multithreader","significantData")
  
}

// General Automation script.
function Automation() {
  
  var UPG = window.UPGRADES
  if (UPG.main.capacityIV.bought == true) {
    if (player.computation.gte(player.computationMax)) {
      window.RESETS.reset(0)
    }
  }
  
}

var GlobalResourceMultiplier = E("1")
var automation1 = true
var automation2 = true

function checkbest() {
  if (player.data.gte(player.dataBest)) {player.dataBest = player.data}
  if (player.simulationTier.gte(player.simulationTierBest)) {player.simulationTierBest = player.simulationTier}

  if (player.computation.gte(player.computationBest)) {player.computationBest = player.computation}
  if (player.significantData.gte(player.significantDataBest)) {player.significantDataBest = player.significantData}

  if (player.circa.gte(player.circaBest)) {player.circaBest = player.circa}
  if (player.forma.gte(player.formaBest)) {player.formaBest = player.forma}
  if (player.entra.gte(player.entraBest)) {player.entraBest = player.entra}
}

function scrollgui() {
  
  if (WDown == true) {
    ScrollVelY += 1
  }
  if (SDown == true) {
    ScrollVelY -= 1
  }
  if (ADown == true) {
    ScrollVelX += 1
  }
  if (DDown == true) {
    ScrollVelX -= 1
  }
  
  ScrollX = ScrollX + ScrollVelX
  ScrollY = ScrollY + ScrollVelY
  ScrollVelX *= 0.95
  ScrollVelY *= 0.95
  
}

function updateprogression() {
  
  var progression = 1
  
  var upgs = window.UPGRADES
  var buys = window.BUYABLES
  
  if (upgs.main.realpowerV.bought) {progression = 2}

  if (upgs.main.capacityV.bought) {progression = 3}
  
  if (window.player.progression < progression) {window.player.progression = progression}
  
}

function updateText() {
  var timespeed = gettimespeed()
  gainData()
  window.COMPUTATION.computationLogic()
  Automation()
  checkbest()
  
  tick = tick + 1
   
  scrollgui()
  updateprogression()
}

function gainData(){
  var gain = E("1")
  
  var upgmain = window.UPGRADES.main;
  var buydata = window.BUYABLES.data;
  
  if (upgmain.efficiencyI.bought == true) {gain = gain.mul(upgmain.efficiencyI.effect())}
  if (upgmain.efficiencyII.bought == true) {gain = gain.mul(upgmain.efficiencyII.effect())}
  if (upgmain.efficiencyIII.bought == true) {gain = gain.mul(upgmain.efficiencyIII.effect())}
  if (upgmain.efficiencyIV.bought == true) {gain = gain.mul(upgmain.efficiencyIV.effect())}
  if (upgmain.efficiencyV.bought == true) {gain = gain.pow(upgmain.efficiencyV.effect())}
  
  if (buydata.compressor.bought.gte(E("1"))) {gain = gain.mul(buydata.compressor.effect())}
  
  gain = gain.mul(timespeed)
  
  gain = gain.mul(GlobalResourceMultiplier)
  
  var gain = gain.div(E("60"))
  player.data = player.data.add(gain)
}

export { E };
export { player };
export { timespeed };
export { GlobalResourceMultiplier };

function Sformat(n,m) {
  return window.UPGRADES[m][n].bought
}
function Lformat(n,m,s) {
  if (s != null) {
  window.UPGRADES[m][n].bought = s
  }
}

function save() {
  const dataToSave = {
    player: player,
    
    upg0_1: Sformat("efficiencyI","main"),
    upg0_2: Sformat("efficiencyII","main"),
    upg0_3: Sformat("efficiencyIII","main"),
    upg0_4: Sformat("efficiencyIV","main"),
    upg0_5: Sformat("efficiencyV","main"),

    upg1_1: Sformat("realpowerI","main"),
    upg1_2: Sformat("realpowerII","main"),
    upg1_3: Sformat("realpowerIII","main"),
    upg1_4: Sformat("realpowerIV","main"),
    upg1_5: Sformat("realpowerV","main"),

    upg2_1: Sformat("capacityI","main"),
    upg2_2: Sformat("capacityII","main"),
    upg2_3: Sformat("capacityIII","main"),
    upg2_4: Sformat("capacityIV","main"),
    upg2_5: Sformat("capacityV","main"),
    
    bya0_1: String(window.BUYABLES.data.compressor.bought),
    bya0_2: String(window.BUYABLES.data.compounder.bought),
    bya0_3: String(window.BUYABLES.data.incrementallist.bought),
    bya1_1: String(window.BUYABLES.significantData.coProcessor.bought),
    bya1_2: String(window.BUYABLES.significantData.multithreader.bought),
  };
  localStorage.setItem('gameData', JSON.stringify(dataToSave));
}

function wipe() {
  localStorage.setItem('gameData', null);
}

function load() {
  function loadstat(data,statname) {
    var raw = data.player[statname]
    if (String(raw) == "undefined") {player[statname] = E("0")} else {
      if (statname == "progression") { player[statname] = parseInt(raw) } else {
        var converted = E(raw)
        player[statname] = converted
      }
    }
  }
  const loadedData = JSON.parse(localStorage.getItem('gameData'));
  if (loadedData) {
    
    var playerkeys = Object.keys(player)
    for(var i = 0; i < playerkeys.length; i+=1) {
      loadstat(loadedData,playerkeys[i])
    }
    //player.data = E(String(loadedData.player.data));
    //player.dataBest = E(String(loadedData.player.dataBest));
    //player.simulationTier = E(String(loadedData.player.simulationTier));
    //player.simulationTierBest = E(String(loadedData.player.simulationTierBest));
    //player.computation = E(String(loadedData.player.computation));
    //player.computationMax = E(String(loadedData.player.computationMax));
    //player.computationBest = E(String(loadedData.player.computationBest));
    //player.significantData = E(String(loadedData.player.significantData));
    //player.significantDataBest = E(String(loadedData.player.significantDataBest));

    Lformat("efficiencyI","main",loadedData.upg0_1)
    Lformat("efficiencyII","main",loadedData.upg0_2)
    Lformat("efficiencyIII","main",loadedData.upg0_3)
    Lformat("efficiencyIV","main",loadedData.upg0_4)
    Lformat("efficiencyV","main",loadedData.upg0_5)

    Lformat("realpowerI","main",loadedData.upg1_1)
    Lformat("realpowerII","main",loadedData.upg1_2)
    Lformat("realpowerIII","main",loadedData.upg1_3)
    Lformat("realpowerIV","main",loadedData.upg1_4)
    Lformat("realpowerV","main",loadedData.upg1_5)

    Lformat("capacityI","main",loadedData.upg2_1)
    Lformat("capacityII","main",loadedData.upg2_2)
    Lformat("capacityIII","main",loadedData.upg2_3)
    Lformat("capacityIV","main",loadedData.upg2_4)
    Lformat("capacityV","main",loadedData.upg2_5)
    
    window.BUYABLES.data.compressor.bought = E(String(loadedData.bya0_1))
    window.BUYABLES.data.compounder.bought = E(String(loadedData.bya0_2))
    window.BUYABLES.data.incrementallist.bought = E(String(loadedData.bya0_3))
    window.BUYABLES.significantData.coProcessor.bought = E(String(loadedData.bya1_1))
    window.BUYABLES.significantData.multithreader.bought = E(String(loadedData.bya1_2))
    
    unNaN()
  }
}

document.onkeydown = function (e) {
  /*
   if (e.key == "t") {
    if (gettributesonreset().gte(E("1"))) {
      if (gettributesonreset().gte(E("1234"))) {
        if (achievements.indexOf('Arbitrary1') == -1) {
          achievements.push("Arbitrary1");
        }
      }
    player.tributes = player.tributes.add(gettributesonreset())
    doreset(2)
    }
  }
   if (e.key == "m") {
    if (getmatteronreset().gte(E("1"))) {
    player.matter = player.matter.add(getmatteronreset())
    doreset(1)
    }
  }
   if (e.key == "f") {
    if (getflaresonreset().gte(E("1000"))) {
    player.flares = player.flares.add(getflaresonreset())
    doreset(3)
    }
  }
  */
   if (e.key == "w") {
     WDown = true
    }
   if (e.key == "d") {
     DDown = true
    }
   if (e.key == "s") {
     SDown = true
    }
   if (e.key == "a") {
     ADown = true
    }
};
document.onkeyup = function (e) {
   if (e.key == "w") {
     WDown = false
    }
   if (e.key == "d") {
     DDown = false
    }
   if (e.key == "s") {
     SDown = false
    }
   if (e.key == "a") {
     ADown = false
    }
};
document.addEventListener("DOMContentLoaded", function() {
  if (typeof localStorage.getItem('gameData') !== 'undefined') {load();}
  DOCLOADED = true
  setInterval(updateText, 16);
});
window.addEventListener('beforeunload', function () {
  if (!isNaN(player.data)) {
    save();
  }
});