var toggleMenu = function(e) {
    e.preventDefault();
    $("#page-content-wrapper").toggleClass("toggled");
    $("#sidebar-wrapper").toggleClass("toggled");
    $(".sidebar-nav").toggleClass("toggled");
    $("#wrapper").toggleClass("toggled");
    $("#sidebar-overlay").toggleClass("toggled");
};

$("#menu-toggle").click(toggleMenu);

$("#sidebar-overlay").click(toggleMenu);
