window.THEME = "default"
var THEMEHASTICKED = false
var PREVIOUSTHEME = "default"

window.UPDATETHEME = function() {
    var theme = window.THEME
    var list = document.getElementsByClassName("uiborderWhite")
    for (let i = 0; i < list.length; i++) {
        list[i].className = "uiborderWhite " + theme + "_LARGEBORDER"
    }
    var list = document.getElementsByClassName("btn_reset")
    for (let i = 0; i < list.length; i++) {
        list[i].className = "btn_reset ghost " + theme + "_RESET"
    }
    var list = document.getElementsByClassName("btn_tab")
    for (let i = 0; i < list.length; i++) {
        list[i].className = "btn_tab ghost " + theme + "_TABBTN"
    }
    var list = document.getElementsByClassName("btn_tabinner")
    for (let i = 0; i < list.length; i++) {
        list[i].className = "btn_tabinner " + theme + "_TABBTNINNER"
    }
    var list = document.getElementsByClassName("btn_stab")
    for (let i = 0; i < list.length; i++) {
        list[i].className = "btn_stab " + theme + "_SUBTABBTN"
    }
    var list = document.getElementsByClassName("btn_stabinner")
    for (let i = 0; i < list.length; i++) {
        list[i].className = "btn_stabinner " + theme + "_SUBTABBTNINNER"
    }
    var list = document.getElementsByClassName("btn_buyable")
    for (let i = 0; i < list.length; i++) {
        list[i].className = "btn_buyable ghost " + theme + "_BUYABLE"
    }
    var list = document.getElementsByClassName("spinner")
    for (let i = 0; i < list.length; i++) {
        list[i].className = "spinner spinner" + theme
    }
    var list = document.getElementsByClassName("gradient-bar")
    for (let i = 0; i < list.length; i++) {
        list[i].className = "gradient-bar gradient-bar-" + theme
    }

    document.getElementById("BODY").className = "BODY" + theme
    document.getElementById("MAINDIV").className = "MAIN_" + theme
    document.getElementById("background").className = "generalBackground" + theme

    THEMEHASTICKED = true
    PREVIOUSTHEME = theme
}
function CHECKTHEME() {
    var theme = window.THEME
    var dropdown = document.getElementById("SITE_THEME_SELECT")
    var value = dropdown.options[dropdown.selectedIndex].value
    if (value != theme) {
        window.THEME = value
        window.UPDATETHEME()
    }
}

document.addEventListener("DOMContentLoaded", function() {
  setInterval(CHECKTHEME,1000)
  window.UPDATETHEME()
});