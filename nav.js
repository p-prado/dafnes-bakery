/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function makeNavMobile() {
    var transparentNav = document.getElementById("transparent-navigation");
    if (transparentNav.className === "transparent-navigation") {
      transparentNav.className += " responsive";
    } else {
      transparentNav.className = "transparent-navigation";
    }
  }