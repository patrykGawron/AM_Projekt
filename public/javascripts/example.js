function sideNavToTopBar() {
    var x = document.getElementById("mainSidenav");
    if (x.className === "sidenav") {
        x.className += " topbar";
    } else {
        x.className = "sidenav";
    }
}

function primSchDropdown() {
    var dropdown = document.getElementById("prim-sch");
    if (!window.screen.width < 1024) {
        if (dropdown.className === "dropdown-button") {
            dropdown.className += "active";
            dropdown.style.backgroundColor = "#f1f1f1";
            dropdown.style.color = "black";
            document.getElementById("prim-sch-arrow").style.transform = "rotate(45deg)"
            // document.getElementById("prim-sch-arrow").style.transform = "translate(1,50%)"
        } else {
            dropdown.className = "dropdown-button";
            dropdown.style.backgroundColor = "#111111";
            dropdown.style.color = "#818181";
            document.getElementById("prim-sch-arrow").style.transform = "rotate(-45deg)"
        }
        var dropdownContent = document.getElementsByClassName("dropdown-container1")
        for (var i = 0; i < dropdownContent.length; i += 1) {
            if (dropdownContent[i].style.display === "block") {
                dropdownContent[i].style.display = "none";
            } else {
                dropdownContent[i].style.display = "block";
            }
        }
    }

}
function highSchDropdown() {
    var dropdown = document.getElementById("high-sch");
    if (!window.screen.width < 1024) {
        if (dropdown.className === "dropdown-button") {
            dropdown.className += "active";
            dropdown.style.backgroundColor = "#f1f1f1";
            dropdown.style.color = "black";
        } else {
            dropdown.className = "dropdown-button";
            dropdown.style.backgroundColor = "#111111";
            dropdown.style.color = "#818181";
        }
        var dropdownContent = document.getElementsByClassName("dropdown-container2")
        for (var i = 0; i < dropdownContent.length; i += 1) {
            if (dropdownContent[i].style.display === "block") {
                dropdownContent[i].style.display = "none";
            } else {
                dropdownContent[i].style.display = "block";
            }
        }
    }


}

// var dropdown1 = document.getElementsByClassName("dropdown-button1");
// var dropdown = document.getElementsByClassName("dropdown-button");
// var i;

// for (i = 0; i < dropdow1.length; i++) {
//     dropdown[i].addEventListener("click", function () {
//         this.classList.toggle("active");
//         var dropdownContent = this.nextElementSibling;
//         if (dropdownContent.style.display === "block") {
//             dropdownContent.style.display = "none";
//         } else {
//             dropdownContent.style.display = "block";
//         }
//         console.log("Wysuwanie");
//     });
// }