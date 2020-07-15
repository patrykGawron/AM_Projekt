function sideNavToTopBar() {
    var x = document.getElementById("mainSidenav");
    if (x.className === "sidenav") {
        x.className += " topbar";
        // document.getElementById("mainText").style.marginTop = "170px";
    } else {
        x.className = "sidenav";
        // document.getElementById("mainText").style.marginTop = "40px";
    }

}