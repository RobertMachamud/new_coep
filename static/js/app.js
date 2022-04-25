// -------------------------------------------------------------- VARIABLES

// Slide In Menu
const slideInMenu = document.querySelector(".slide-in-navs");
const slideInMenuBg = document.querySelector(".slide-in-bg");
const slideInLinks = document.querySelectorAll(".slide-in-navs nav ul li");

// Menu Button - Lines
const menuFirstLine = document.querySelector(".menu-btn .line.f");
const menuSecndLine = document.querySelector(".menu-btn .line.s");
const menuLastLine = document.querySelector(".menu-btn .line.l");

// About Us
const aboutCont = document.querySelector("#about-us-cont");
const showMoreBtn = document.querySelector(".show-more-bttn");
const memberAboutUs = document.querySelector(".about-us-box.opened");
const textAboutUs = document.querySelector(".about-us-box.closed");

// Slide-Menu open/closed
let slideMenuOpen = false;

// Selected Category Filter
let selectedFilterCategory = null;

// AOS scrolling
AOS.init();


// -------------------------------------------------------------- TOGGLE FUNCTIONS

// Menu Button - Slides in Menu
const toggleSlideInMenu = () => {
    // animates menu lines (to cross)
    menuFirstLine.classList.toggle("to-cross");
    menuSecndLine.classList.toggle("to-cross");
    menuLastLine.classList.toggle("to-cross");
    
    // toggles the menu
    if (slideMenuOpen) {
        slideInMenuBg.classList.add("d-none");
        slideInMenu.classList.remove("slide-ani");
        slideMenuOpen = false;
    }
    else {
        slideInMenuBg.classList.remove("d-none");
        slideInMenu.classList.add("slide-ani");
        slideMenuOpen = true;
    } 
}


// Toggles About Container
const toggleAboutCont = () => {
    aboutCont.classList.toggle("extended");
    // flips the icon
    if (aboutCont.classList.contains("extended")) {
        showMoreBtn.classList.add("flip");
    } else {
        showMoreBtn.classList.remove("flip");
    }
    memberAboutUs.classList.toggle("d-none");
    textAboutUs.classList.toggle("d-none");
}


// Scroll to top Button
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}   


// ---------------------------------------------------- FILTER BY CAR TYPE
        
// Filter Produkte By Car Category
const filterProdukte = (e, category) => {
    let allProductCards = document.querySelectorAll(".card-wrapper");
    
    // removes all d-none classes (reveals all cards)
    const revealAllCards = () => [...allProductCards].forEach(pc => pc.classList.remove("d-none"));
    
    // Changes all Icon imgs to black
    const turnAllIconsBlack = () => {
        let allIconImgs = document.querySelectorAll(".p-filter img");
        allIconImgs.forEach(fi => {
            if (fi.classList.contains("red")) {
                fi.classList.add("d-none");
            } else {
                fi.classList.remove("d-none");
            } 
        });
    }
    
    // Changes clicked icon to red
    const turnClickedIconRed = () => {
        let filterIcons = e.target.parentElement.children;
        [...filterIcons].forEach(fi => fi.classList.toggle("d-none"));
    }   
    
    revealAllCards();
    turnAllIconsBlack();
                
    // returns funciton if user selects same icon that is active
    if (selectedFilterCategory === category) {
        selectedFilterCategory = null;
        return;
    } else {
        turnClickedIconRed();
        selectedFilterCategory = category;

        // all cards not including the filtered category
        let filteredCards = [...allProductCards].filter(c=> c.dataset.category !== category);

        // makes outfiltered cards invisible
        [...filteredCards].forEach(fc => fc.classList.add("d-none"));
    }
}
