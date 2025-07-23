const Decimal = window.Decimal;

function E(n) {
  
  return new Decimal().fromString(n)
  
}

const player = window.player;
var upgradeinfo = document.getElementById("upgradeinfo")

window.UPGRADES = {
  
  lastdisplay: "NONE",
  lastdisplay2: "NONE",
  
  main: {
    efficiencyI: {
      displayName: "Efficiency - I",
      description: "Double Data gain",
      image: "Assets/Eff1.png",
      costType: "data",
      costAmount: function() {
        var temp = E("10")
        
        return temp;
      },
      effectPrefix: "Currently: Data x",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("1")
        if (this.bought == true) {temp = E("2")}
        return temp;
      },
    },
    efficiencyII: {
      displayName: "Efficiency - II",
      description: "Data gain is tripled",
      image: "Assets/Eff2.png",
      costType: "data",
      costAmount: function() {
        var temp = E("25")
        
        return temp;
      },
      effectPrefix: "Currently: Data x",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("1")
        if (this.bought == true) {temp = E("3")}
        return temp;
      },
    },
    efficiencyIII: {
      displayName: "Efficiency - III",
      description: "Data gain is quadrupled",
      image: "Assets/Eff3.png",
      costType: "data",
      costAmount: function() {
        var temp = E("100")
        
        return temp;
      },
      effectPrefix: "Currently: Data x",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("1")
        if (this.bought == true) {temp = E("4")}
        return temp;
      },
    },
    efficiencyIV: {
      displayName: "Efficiency - IV",
      description: "Data gain boosts itself at a reduced rate",
      image: "Assets/Eff4.png",
      costType: "data",
      costAmount: function() {
        var temp = E("500")
        
        return temp;
      },
      effectPrefix: "Currently: Data x",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("1")
        if (this.bought == true) {temp = player.data.add(E("1")).pow(E("0.25"))}
        if (temp.gte(E("1e100"))) {temp = E("1e100").add(temp.sub(E("1e100")).pow(E("0.05")))}
        return temp;
      },
    },
    efficiencyV: {
      displayName: "Efficiency - V",
      description: "Data gain is slightly exponentiated.",
      image: "Assets/Eff5.png",
      costType: "data",
      costAmount: function() {
        var temp = E("5000")
        
        return temp;
      },
      effectPrefix: "Currently: Data ^",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("1")
        if (this.bought == true) {temp = E("1.1")}
        return temp;
      },
    },
    
    
    realpowerI: {
      displayName: "Breakthrough - I",
      description: "Add 1 to the compounder base",
      image: "Assets/Rp1.png",
      costType: "data",
      costAmount: function() {
        var temp = E("2.5e32")
        
        return temp;
      },
      effectPrefix: "Currently: Compounder base +",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("0")
        if (this.bought == true) {temp = E("1")}
        return temp;
      },
    },
    realpowerII: {
      displayName: "Breakthrough - II",
      description: "For each compressor, +10% to their effect multiplicatively.",
      image: "Assets/Rp2.png",
      costType: "data",
      costAmount: function() {
        var temp = E("5e38")
        
        return temp;
      },
      effectPrefix: "Currently: x",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("1")
        var factor = window.BUYABLES.data.compressor.bought;
        
        
        if (this.bought) {
          if (factor.gte(E("1"))) {temp = E("1.1").pow(factor)}
        }
        
        return temp;
      },
    },
    realpowerIII: {
      displayName: "Breakthrough - III",
      description: "For each compounder, +20% to their effect multiplicatively.",
      image: "Assets/Rp3.png",
      costType: "data",
      costAmount: function() {
        var temp = E("1e43")
        
        return temp;
      },
      effectPrefix: "Currently: x",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("1")
        var base = E("1.1")
        var factor = window.BUYABLES.data.compounder.bought;
        
        
        if (this.bought) {
          if (factor.gte(E("1"))) {temp = base.pow(factor)}
        }
        
        return temp;
      },
    },
    realpowerIV: {
      displayName: "Breakthrough - IV",
      description: "For each level of incrementallist, +3 to its base.",
      image: "Assets/Rp4.png",
      costType: "data",
      costAmount: function() {
        var temp = E("5e57")
        
        return temp;
      },
      effectPrefix: "Currently: x",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("1")
        var base = E("3")
        var factor = window.BUYABLES.data.incrementallist.bought;
        
        
        if (this.bought) {
          if (factor.gte(E("1"))) {temp = factor.mul(base)}
        }
        
        return temp;
      },
    },
    realpowerV: {
      displayName: "Breakthrough - V",
      description: "Unlock Computation",
      image: "Assets/Rp5.png",
      costType: "data",
      costAmount: function() {
        var temp = E("1e103")
        
        return temp;
      },
      effectPrefix: "Active: ",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("0")
        if (this.bought) {temp = E("1")}
        return temp;
      },
    },
    
    
    capacityI: {
      displayName: "Capacity - I",
      description: "Square the computation cap",
      image: "Assets/Cap1.png",
      costType: "significantData",
      costAmount: function() {
        var temp = E("25")
        
        return temp;
      },
      effectPrefix: "Currently: Computation cap ^",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("1")
        if (this.bought == true) {temp = E("2")}
        return temp;
      },
    },
    capacityII: {
      displayName: "Capacity - II",
      description: "Square the computation cap again.",
      image: "Assets/Cap2.png",
      costType: "significantData",
      costAmount: function() {
        var temp = E("250")
        
        return temp;
      },
      effectPrefix: "Currently: Computation cap ^",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("1")
        if (this.bought == true) {temp = E("2")}
        return temp;
      },
    },
    capacityIII: {
      displayName: "Capacity - III",
      description: "Increase the computation cap by 80 OoMs",
      image: "Assets/Cap3.png",
      costType: "significantData",
      costAmount: function() {
        var temp = E("1000")
        
        return temp;
      },
      effectPrefix: "Currently: Computation cap *",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("1")
        if (this.bought == true) {temp = E("1e80")}
        return temp;
      },
    },
    capacityIV: {
      displayName: "What is this? A clicker game?",
      description: "Computation collapses automatically at maximum",
      image: "Assets/Cap4.png",
      costType: "significantData",
      costAmount: function() {
        var temp = E("2500")
        
        return temp;
      },
      effectPrefix: "Currently: ",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("0")
        if (this.bought == true) {temp = E("1")}
        return temp;
      },
    },
    capacityV: {
      displayName: "Capacity - V",
      description: "Unlock the Tri-Phase",
      image: "Assets/Cap5.png",
      costType: "significantData",
      costAmount: function() {
        var temp = E("10000")
        
        return temp;
      },
      effectPrefix: "Currently: ",
      effectSuffix: ".",
      bought: false,
      effect: function() {
        var temp = E("0")
        if (this.bought == true) {temp = E("1")}
        return temp;
      },
    },
  },
  update: function(n,m) {
    var theme = window.THEME
    var elem = document.getElementById(n)
    if (elem != null) {
      var category = window.UPGRADES[String(m)]
      if (category != null) {
        var upgrade = category[String(n)]
        if (upgrade != null) {
          var bought = upgrade.bought
          
          if (bought == true) {
            elem.className = "upgrade bought " + theme + "_UPGRADE"
          } else {
            var playercur = player[upgrade.costType]
            if (playercur.gte(upgrade.costAmount())) {
              elem.className = "upgrade canbuy " + theme + "_UPGRADE"
            } else {
              elem.className = "upgrade unbought " + theme + "_UPGRADE"
            }
          }
          
        }
      }
    }
  },
  display: function(n,m) {
    
    window.UPGRADES.lastdisplay = n;
    window.UPGRADES.lastdisplay2 = m;
    
    var category = window.UPGRADES[String(m)]
    if (category != null) {
      var upgrade = category[String(n)]
      if (upgrade != null) {
        var bought = upgrade.bought
        
        var nam = upgrade.displayName
        var desc = upgrade.description
        var effdisplay = upgrade.effectPrefix + String(window.format(upgrade.effect(),5)) + upgrade.effectSuffix
        var costdisplay = null
        if (bought == false) {
          costdisplay = "Cost: " + String(upgrade.costAmount()) + " " + upgrade.costType
        } else {
          costdisplay = effdisplay
        }
        
        upgradeinfo.innerHTML = nam + "<br>" + desc + "<br>" + costdisplay
        
      }
    }
  },
  buy: function(n,m) {
    var category = window.UPGRADES[String(m)]
    if (category != null) {
      var upgrade = category[String(n)]
      if (upgrade != null) {
        var bought = upgrade.bought
        
        if (bought == false) {
          
          if (player[String(upgrade.costType)].gte(upgrade.costAmount())) {
            
            upgrade.bought = true
            player[String(upgrade.costType)] = player[String(upgrade.costType)].sub(upgrade.costAmount())
            
          }
          
        }
        
      }
    }
  }
}

/* UPGRADE FORMAT

    UPGRADE NAME IN CODE: {
      displayName: "",
      description: "",
      image: "",
      costType: "",
      costAmount: function() {
        var temp = E("")
        
        return temp;
      },
      effectPrefix: "Currently: ___",
      effectSuffix: "",
      bought: false,
      effect: function() {
        var temp = E("1")
        if (this.bought == true) {temp = E("2")} //Example
        return temp;
      },
    }
  }


*/