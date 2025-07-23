
var chosen = null
var chosenbutton = null
var chosenS = null
var chosenSbutton = null
var chosenstabs = null
var chosenSdiv = null

var Tick = 0

const upg = window.UPGRADES
const ach = window.ACHIEVEMENTS
const bya = window.BUYABLES
const player = window.player
const resets = window.RESETS
const stats = window.STATINDEX
const triphase = window.TRIPHASE

const format = window.format
var upgradeinfo = document.getElementById("upgradeinfo")

window.SUBTABNAME = 0
window.TABNAME = 0

function UPDATE() {
  
  var plrprogression = player.progression

  if (chosen != null) {

    if (chosen.id == "tab3") {
      if (chosenS != null) {
        if (chosenS.id == "subtab9") {

          var n = window.UPGRADES.lastdisplay;
          var m = window.UPGRADES.lastdisplay2;
          
          if (n != "NONE") {
            if (m != "NONE") {
              
              var category = window.UPGRADES[String(m)]
              if (category != null) {
                var upgrade = category[String(n)]
                if (upgrade != null) {
                  var bought = upgrade.bought

                  var nam = upgrade.displayName
                  var desc = upgrade.description
                  var effdisplay = upgrade.effectPrefix + format(upgrade.effect(),5) + upgrade.effectSuffix
                  var costdisplay = null
                  if (bought == false) {
                    costdisplay = "Cost: " + String(upgrade.costAmount()) + " " + upgrade.costType
                  } else {
                    costdisplay = effdisplay
                  }

                  upgradeinfo.innerHTML = nam + "<br>" + desc + "<br>" + costdisplay

                }
              }
              
            }
          }
          
          upg.update("efficiencyI","main")
          upg.update("efficiencyII","main")
          upg.update("efficiencyIII","main")
          upg.update("efficiencyIV","main")
          upg.update("efficiencyV","main")

          upg.update("realpowerI","main")
          upg.update("realpowerII","main")
          upg.update("realpowerIII","main")
          upg.update("realpowerIV","main")
          upg.update("realpowerV","main")

          upg.update("capacityI","main")
          upg.update("capacityII","main")
          upg.update("capacityIII","main")
          upg.update("capacityIV","main")
          upg.update("capacityV","main")
          
        }
      }
    }
    
    if (chosen.id == "tab0") {
      if (chosenS != null) {
        if (chosenS.id == "subtab0") {
          
          document.getElementById("dataDisplay").innerHTML = "Data:<br>" + format(player.data,5)
          bya.update("compressor","data")
          bya.update("compounder","data")
          bya.update("incrementallist","data")
          
        }
        if (chosenS.id == "subtab1") {

          //resetComputation" onclick="window.RESETS.reset(0)" class="btn_buyable buyable unbought">Collapse computation for<br>AMOUNT<br>Significant Data</button></div>

          document.getElementById("computationDisplay").innerHTML = "Computation: " + format(player.computation,5)
          document.getElementById("significantDataDisplay").innerHTML = "Significant Data: " + format(player.significantData,5)
          
          document.getElementById("resetComputation").innerHTML = "Collapse Computation for:<br>" + format(resets.calculateReturn(0),1) + "<br>Significant Data"
          
          bya.update("coProcessor","significantData")
          bya.update("multithreader","significantData")

        }
      }
    }
    
  }

  document.getElementById("primaryDisplayData").innerHTML = format(player.data,5)
  if (plrprogression >= 2) {
    document.getElementById("displayCluster0").style.display = "block"
    document.getElementById("primaryDisplayComputation").innerHTML = format(player.computation,5)
    document.getElementById("primaryDisplaySignificantData").innerHTML = format(player.significantData,5)

    document.getElementById("subtab1div").style.display = "block"
    document.getElementById("UpgradeSet2").style.display = "block"
  } else {
    document.getElementById("displayCluster0").style.display = "none"

      document.getElementById("subtab1div").style.display = "none"
      document.getElementById("UpgradeSet2").style.display = "none"
  }
  if (plrprogression >= 3) {
    document.getElementById("displayCluster1").style.display = "block"
    document.getElementById("subtab2div").style.display = "block"
  } else {
    document.getElementById("displayCluster1").style.display = "none"
    document.getElementById("subtab2div").style.display = "none"
  }

}

function updateVisuals() {
  
  Tick += 1
  if (chosen != null) {
    if (chosenS != null) {

      if (chosen.id == "tab0") {
        if (chosenS.id == "subtab1") {
              document.getElementById("spinner").style.backgroundPosition = String(Tick) + "px " + String(Tick) + "px"
              document.getElementById("spinner2").style.backgroundPosition = String(Tick) + "px " + String(Tick) + "px"
              document.getElementById("spinner3").style.backgroundPosition = String(Tick) + "px " + String(Tick) + "px"
              document.getElementById("spinner4").style.backgroundPosition = String(Tick) + "px " + String(Tick) + "px"
              document.getElementById("spinner5").style.backgroundPosition = String(Tick) + "px " + String(Tick) + "px"
              
              document.getElementById("spinner").style.rotate = String(Math.sin(Tick/300*3.14)*10) + "deg"
              document.getElementById("spinner2").style.rotate = String(22.5+Math.sin(0.785+Tick/300*3.14)*10) + "deg"
              document.getElementById("spinner3").style.rotate = String(45+Math.sin(1.57+Tick/300*3.14)*10) + "deg"
              document.getElementById("spinner4").style.rotate = String(67.5+Math.sin(2.355+Tick/300*3.14)*10) + "deg"
              document.getElementById("spinner5").style.rotate = String(90+Math.sin(3.14+Tick/300*3.14)*10) + "deg"
        }
      }

    }
  }

}

function updateAchievements() {
    ach.update("datacollector","main")
    ach.update("datacollector2","main")
    ach.update("datacollector3","main")
    ach.update("datacollector4","main")
    ach.update("datacollector5","main")
    ach.update("computationspecialist1","main")
    ach.update("computationspecialist2","main")
    ach.update("computationspecialist3","main")
    ach.update("computationspecialist4","main")
    ach.update("computationspecialist5","main")
}

window.TABS = {
  choose: function(tabN,subtab) {
    var theme = window.THEME
    if (subtab == true) {
      window.SUBTABNAME = tabN
      if (chosenSdiv != null) {
        chosenSdiv = null
      }
      if (chosenS != null) {
        chosenS.style.display = "none"
        chosenS = null
      }
      if (chosenSbutton != null) {
        chosenSbutton.className = "btn_stabinner "+theme+"_SUBTABBTNINNER"
        chosenSbutton = null
      }
      chosenS = document.getElementById("subtab" + tabN)
      chosenSbutton = document.getElementById("subtab" + tabN + "button")
      chosenSdiv = document.getElementById("subtab" + tabN + "div")
    } else {
      window.TABNAME = tabN
      if (chosen != null) {
        chosen.style.display = "none"
        chosen = null
      }
      if (chosenbutton != null) {
        chosenbutton.className = "btn_tabinner "+theme+"_TABBTNINNER"
        chosenbutton = null
      }
      if (chosenstabs != null) {
        chosenstabs.style = "display:none"
      }

      chosen = document.getElementById("tab" + tabN)
      chosen.style.display = "block"
      chosenbutton = document.getElementById("tab" + tabN + "button")
      chosenbutton.className = "btn_tabinner chosen "+theme+"_TABBTNINNER"
      chosenstabs = document.getElementById("stabs" + tabN)
      chosenstabs.style = "display:default"
    }

    if (chosenS != null) {
      chosenS.style.display = "block"
    }
    if (chosenSbutton != null) {
      chosenSbutton.className = "btn_stabinner chosen "+theme+"_SUBTABBTNINNER"
    }
    if (chosenSdiv != null) {
      chosenSdiv.style.display = "block"
    }
    
    if (subtab == false) {
      if (tabN == 0) {this.choose("0",true)}
      if (tabN == 1) {this.choose("3",true)}
      if (tabN == 2) {this.choose("8",true)}
      if (tabN == 3) {this.choose("9",true)}
      if (tabN == 4) {this.choose("10",true)}
    }

  }
}

document.addEventListener("DOMContentLoaded", function() {
  window.TABS.choose("0", false)
  window.TABS.choose("0", true)
  UPDATE();
  setInterval(UPDATE, 200);
  setInterval(updateVisuals, 16);
  setInterval(updateAchievements, 5000);
});