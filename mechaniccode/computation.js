const Decimal = window.Decimal;

function E(n) {
  
  return new Decimal().fromString(n)
  
}

const upg = window.UPGRADES
const ach = window.ACHIEVEMENTS
const bya = window.BUYABLES
const player = window.player

const format = window.format
var upgradeinfo = document.getElementById("upgradeinfo")

//Computation, A system based around a gradual increase that eventually culminates enough that it reaches its variable cap that then lets you reset for another currency in the same tab, Significant Data. Think replicanti from Antimatter Dimensions.

window.COMPUTATION = {

    computationLogic: function() {

      this.calculateComputationMax()
      this.gainComputation()

    },

    gainComputation: function() {

        if (player.computation.sub(E("100")).lt(E("0"))) {player.computation = E("100")}

        var gain = player.computation.div(E("10"))

        if (bya.significantData.coProcessor.bought.gte(E("1"))) {gain = gain.mul(bya.significantData.coProcessor.effect())}
        if (bya.significantData.multithreader.bought.gte(E("1"))) {gain = gain.mul(bya.significantData.multithreader.effect())}

        gain = gain.div(E("60"))
        player.computation = player.computation.add(gain)

        if (player.computation.gte(player.computationMax)) {player.computation = player.computationMax}

    },

    calculateComputationMax: function() {

      var temp = E("1e5")


      
      if (upg.main.capacityI.bought == true) {temp = temp.pow(upg.main.capacityI.effect())}
      if (upg.main.capacityII.bought == true) {temp = temp.pow(upg.main.capacityII.effect())}



      if (upg.main.capacityIII.bought == true) {temp = temp.mul(upg.main.capacityIII.effect())}
      player.computationMax = temp

    }

}