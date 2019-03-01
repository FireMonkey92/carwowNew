export const openSort = () => {
    document.getElementById("Sort").style.width = "35%";
    document.getElementById("car_chooser").style.opacity = "0.5";
}
export const closeSort = () => {
    document.getElementById("Sort").style.width = "0";
    document.getElementById("car_chooser").style.opacity = "1";

}
export const openFilters = () => {
    document.getElementById("Filters").style.width = "35%";
    document.getElementById("car_chooser").style.opacity = "0.5";

}
export const closeFilters = () => {
    document.getElementById("Filters").style.width = "0";
    document.getElementById("car_chooser").style.opacity = "1";

}
export const openNav = () => {
    document.getElementById("mySidenav").style.width = "35%";
}
export const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
}