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

window.RESETS = {
    reset: function(n) {

        if (n == 0) { // Computation to SignificantData

            var ret = this.calculateReturn(0)

            if (ret.gte(E("1"))) {
                player.significantData = player.significantData.add(ret)

                player.computation = E("100")
            }

        }

    },
    calculateReturn: function(n) {

        if (n == 0) { // SIGNIFICANTDATA RESET

            var temp = player.computation.log(E("10")).sub(E("4")).floor()

            return temp

        }

    }
}