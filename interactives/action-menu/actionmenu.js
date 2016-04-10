/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function onClickPizza() {
  var dropDownMenu = document.getElementById("dropdownMenu");
  dropDownMenu.style.display = 'none';

  document.getElementById("confirmationText").innerHTML = "Pizza ordered!";
 }

function onClickTV() {
  var dropDownMenu = document.getElementById("dropdownMenu");
  dropDownMenu.style.display = 'none';

  document.getElementById("confirmationText").innerHTML = "TV turned on!";
}

function onClickNuclearAttack() {
  var dropDownMenu = document.getElementById("dropdownMenu");
  dropDownMenu.style.display = 'none';

  document.getElementById("confirmationText").innerHTML = "Nuclear attack launched!";
}

function onClickWater() {
  var dropDownMenu = document.getElementById("dropdownMenu");
  dropDownMenu.style.display = 'none';

  document.getElementById("confirmationText").innerHTML = "Water boiled!";
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  
}
