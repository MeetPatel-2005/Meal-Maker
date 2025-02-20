// var proteins = document.querySelector(".proteins");
// var veg = document.querySelector(".veg");
// var grains = document.querySelector(".grains");
// var dairy = document.querySelector(".dairy");
// var herbs = document.querySelector(".herbs");
// var i_1 = proteins.querySelector("i");
// var i_2 = veg.querySelector("i");
// var i_3 = grains.querySelector("i");
// var i_4 = dairy.querySelector("i");
// var i_5 = herbs.querySelector("i");

// var drp_1 = document.querySelector(".drp-1")
// var drp_2 = document.querySelector(".drp-2")
// var drp_3 = document.querySelector(".drp-3")
// var drp_4 = document.querySelector(".drp-4")
// var drp_5 = document.querySelector(".drp-5")
// var drpBtn = document.querySelectorAll(".drp-btn")

// proteins.addEventListener("click", () => {
//     drp_1.style.display = drp_1.style.display  === "grid" ? "none" : "grid";
//     i_1.classList.toggle("rotated");
    
// })
// veg.addEventListener("click", () => {
//     drp_2.style.display = drp_2.style.display  === "grid" ? "none" : "grid";
//     i_2.classList.toggle("rotated");
// })
// grains.addEventListener("click", () => {
//     drp_3.style.display = drp_3.style.display  === "grid" ? "none" : "grid";
//     i_3.classList.toggle("rotated");
// })
// dairy.addEventListener("click", () => {
//     drp_4.style.display = drp_4.style.display  === "grid" ? "none" : "grid";
//     i_4.classList.toggle("rotated");
// })
// herbs.addEventListener("click", () => {
//     drp_5.style.display = drp_5.style.display  === "grid" ? "none" : "grid";
//     i_5.classList.toggle("rotated");
// })


// drpBtn.forEach(item => {
//     item.addEventListener('click', () => {
//         item.classList.toggle('selected');
//     });
// });

var proteins = document.querySelector(".proteins");
var veg = document.querySelector(".veg");
var grains = document.querySelector(".grains");
var dairy = document.querySelector(".dairy");
var herbs = document.querySelector(".herbs");

var i_1 = proteins.querySelector("i");
var i_2 = veg.querySelector("i");
var i_3 = grains.querySelector("i");
var i_4 = dairy.querySelector("i");
var i_5 = herbs.querySelector("i");

var drp_1 = document.querySelector(".drp-1");
var drp_2 = document.querySelector(".drp-2");
var drp_3 = document.querySelector(".drp-3");
var drp_4 = document.querySelector(".drp-4");
var drp_5 = document.querySelector(".drp-5");

var drpBtn = document.querySelectorAll(".drp-btn");

var dropdowns = [drp_1, drp_2, drp_3, drp_4, drp_5];
var icons = [i_1, i_2, i_3, i_4, i_5];

function closeAllDropdowns() {
    dropdowns.forEach(drp => drp.style.display = "none");
    icons.forEach(icon => icon.classList.remove("rotated"));
}

function toggleDropdown(dropdown, icon) {
    if (dropdown.style.display === "grid") {
        dropdown.style.display = "none";
        icon.classList.remove("rotated");
    } else {
        closeAllDropdowns();
        dropdown.style.display = "grid";
        icon.classList.add("rotated");
    }
}

proteins.addEventListener("click", () => toggleDropdown(drp_1, i_1));
veg.addEventListener("click", () => toggleDropdown(drp_2, i_2));
grains.addEventListener("click", () => toggleDropdown(drp_3, i_3));
dairy.addEventListener("click", () => toggleDropdown(drp_4, i_4));
herbs.addEventListener("click", () => toggleDropdown(drp_5, i_5));

drpBtn.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('selected');
    });
});
