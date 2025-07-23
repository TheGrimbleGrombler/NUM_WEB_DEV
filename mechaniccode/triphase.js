const Decimal = window.Decimal;

function E(n) {
  
  return new Decimal().fromString(n)
  
}

const upg = window.UPGRADES
const ach = window.ACHIEVEMENTS
const bya = window.BUYABLES
const player = window.player
const cmp = window.COMPUTATION

const format = window.format
var upgradeinfo = document.getElementById("upgradeinfo")

//The Tri-Phase, A system revolving around 3 resources which each have upgrades to boost the game in ways specific to each of them while simultaneously revolving in their own boosting of one-another's production.

window.TRIPHASE = {

    triphaseLogic: function() {

        if (player.progression >= 3) {
            
            this.gainCirca()
            this.gainForma()
            this.gainEntra()

        }

    },

    gainCirca: function() {

        var temp = E("1")



        temp = temp.div(E("60"))
        player.circa = player.circa.add(temp)

    },

    gainForma: function() {

        var temp = E("1")



        temp = temp.div(E("60"))
        player.forma = player.forma.add(temp)

    },

    gainEntra: function() {

        var temp = E("1")



        temp = temp.div(E("60"))
        player.entra = player.entra.add(temp)

    },

}