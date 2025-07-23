const Decimal = window.Decimal;

function E(n) {
  
  return new Decimal().fromString(n)
  
}

const player = window.player;
var upgradeinfo = document.getElementById("upgradeinfo")
const format = window.format;

window.BUYABLES = {
  data: {
    
    compressor: {
      displayName: "Compressor",
      description: "Data x 5^n",
      costType: "data",
      costmask: "",
      costAmount: function() {
        var temp = E("50000")
        
        temp = temp.mul(E("5").pow(this.bought))
        
        if (this.bought.gte(E("10"))) {temp = temp.mul(E("5").pow(this.bought.sub(E("4"))))}
        if (this.bought.gte(E("20"))) {temp = temp.mul(E("1e10").pow(this.bought.sub(E("19"))))}
        //if (temp.gte(E("10"))) {temp = temp.mul(E("1e10").pow(this.bought.sub(E("9"))))}
        if (this.bought.gte(E("25"))) {temp = temp.pow(E("2"))}
        
        return temp;
      },
      effectPrefix: "Data x",
      effectSuffix: ".",
      bought: E("0"),
      effect: function() {
        var temp = E("1")
        var base = E("5")
        
        if (window.BUYABLES.data.compounder.bought.gte(E("1"))) {base = base.add(window.BUYABLES.data.compounder.effect())}
        if (this.bought.gte(E("1"))) {temp = base.pow(this.bought)}
        if (window.UPGRADES.main.realpowerII.bought) {temp = temp.mul(window.UPGRADES.main.realpowerII.effect())}
        
        return temp;
      },
      
    },
    
    compounder: {
      displayName: "Compounder",
      description: "Previous buyable base + n",
      costType: "data",
      costmask: "",
      costAmount: function() {
        var temp = E("25000000000000")
        
        temp = temp.mul(E("20").pow(this.bought))
        
        if (this.bought.gte(E("5"))) {temp = temp.mul(E("1e10").pow(this.bought.sub(E("4"))))}
        if (this.bought.gte(E("11"))) {temp = temp.pow(E("2"))}
        
        return temp;
      },
      effectPrefix: "Previous buyable base + ",
      effectSuffix: ".",
      bought: E("0"),
      effect: function() {
        var temp = E("0")
        var base = E("1")
        
        if (window.UPGRADES.main.realpowerI.bought) {base = base.add(window.UPGRADES.main.realpowerI.effect())}
        
        if (this.bought.gte(E("1"))) {temp = this.bought.mul(base)}
        
        if (window.BUYABLES.data.incrementallist.bought.gte(E("1"))) {temp = temp.mul(window.BUYABLES.data.incrementallist.effect())}
        
        if (window.UPGRADES.main.realpowerIII.bought) {temp = temp.mul(window.UPGRADES.main.realpowerIII.effect())}
        
        return temp;
      },
    },
      
    incrementallist: {
      displayName: "Incrementallist",
      description: "Both previous buyables' effect + 10^n %",
      costType: "data",
      costmask: "",
      costAmount: function() {
        var temp = E("2.5e38")
        
        temp = temp.mul(E("1e6").pow(this.bought))
        
        if (this.bought.gte(E("8"))) {temp = temp.pow(E("2"))}
        
        return temp;
      },
      effectPrefix: "Previous buyables effect * ",
      effectSuffix: ".",
      bought: E("0"),
      effect: function() {
        var temp = E("0")
        var base = E("1.1")
        
        if (window.UPGRADES.main.realpowerIV.bought) {base = base.add(window.UPGRADES.main.realpowerIV.effect().mul(E("0.01")))}
        
        if (this.bought.gte(E("1"))) {temp = base.pow(this.bought)}
        
        return temp;
      },
      
    },
    
  },
  significantData: {
    
    coProcessor: {
      displayName: "Co-Processor",
      description: "Computation gain is doubled",
      costType: "significantData",
      costmask: "Significant Data",
      costAmount: function() {
        var temp = E("1")
        
        temp = temp.mul(E("4").pow(this.bought))
        
        return temp;
      },
      effectPrefix: "Computation gain x",
      effectSuffix: ".",
      bought: E("0"),
      effect: function() {
        var temp = E("1")
        var base = E("2")

        if (this.bought.gte(E("1"))) {temp = base.pow(this.bought)}
        
        return temp;
      },
      
    },
    multithreader: {
      displayName: "Multithreader",
      description: "Computation gain is tripled",
      costType: "significantData",
      costmask: "Significant Data",
      costAmount: function() {
        var temp = E("2")
        
        temp = temp.mul(E("4").pow(this.bought))
        
        return temp;
      },
      effectPrefix: "Computation gain x",
      effectSuffix: ".",
      bought: E("0"),
      effect: function() {
        var temp = E("1")
        var base = E("3")

        if (this.bought.gte(E("1"))) {temp = base.pow(this.bought)}
        
        return temp;
      },
      
    },
    
  },
  update: function(n,m) {
    var theme = window.THEME
    var elem = document.getElementById(n)
    var elemdiv = document.getElementById(n + "div")
    if (elem != null) {
      var category = window.BUYABLES[String(m)]
      if (category != null) {
        var upgrade = category[String(n)]
        if (upgrade != null) {
          
          var nam = upgrade.displayName
          var desc = upgrade.description
          var amm = upgrade.bought
          var effdisplay = upgrade.effectPrefix + String(format(upgrade.effect(),5)) + upgrade.effectSuffix
          var costmask = upgrade.costmask
          if (costmask == "") {
            var costdisplay = "Cost: " + String(format(upgrade.costAmount(),5)) + " " + upgrade.costType
          } else {
            var costdisplay = "Cost: " + String(format(upgrade.costAmount(),5)) + " " + costmask
          }
          
          elem.innerHTML = nam + "<br>" + desc + "<br>" + amm + "<br>" + effdisplay + "<br>" + costdisplay
          
          var bought = upgrade.bought
          
            var playercur = player[upgrade.costType]
            if (playercur.gte(upgrade.costAmount())) {
              elem.className = "btn_buyable buyable canbuy " + theme + "_BUYABLE"
            } else {

              if (bought.gte(E("1"))) {
                elem.className = "btn_buyable buyable bought " + theme + "_BUYABLE"
              } else {
                elem.className = "btn_buyable buyable unbought " + theme + "_BUYABLE"
              }
              
            }
            elemdiv.className = "btn_buyable ghost " + theme + "_BUYABLE"
          
        }
      }
    }
  },
  display: function(n,m) {
    var category = window.BUYABLES[String(m)]
    if (category != null) {
      var upgrade = category[String(n)]
      if (upgrade != null) {
        
      }
    }
  },
  buy: function(n,m) {
    var category = window.BUYABLES[String(m)]
    if (category != null) {
      var upgrade = category[String(n)]
      if (upgrade != null) {
        var bought = upgrade.bought
        
        if (player[String(upgrade.costType)].gte(upgrade.costAmount())) {
          
          player[String(upgrade.costType)] = player[String(upgrade.costType)].sub(upgrade.costAmount())
          upgrade.bought = upgrade.bought.add(E("1"))
          
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