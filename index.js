import { animateTop, animateHero } from '/animations.js';
import { fillCalendar, fillHeading, setActive, setInactive } from '/calendar.js';

// const body = document.querySelector('body');
// const topElement = document.getElementById("top");
// const heroElement = document.getElementById("hero");
// const topSVG = document.getElementById("top_bg");
// const leftExpand = document.getElementById("leftExpand");
// const expand = document.getElementById("expand");
// Get all the "col" elements
// const cols = document.querySelectorAll('.col');
// const heading = document.getElementById("heading");
// let heroContent;
// var topIsActive = 0;

// const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
// const months = ["January","February","March","April","May","June","July","September","October","November","December"];


// topSVG.addEventListener('mousedown', animateTop(event));


// --------------------------------------------------------------------------------------------------------------------

document.getElementById("top_bg").addEventListener('click', animateTop);

// attachHeroEventListeners();
document.getElementById("hero_bg").getElementById("innerCircle").addEventListener('click', animateHero);
document.getElementById("hero_bg").getElementById("outerCircle").addEventListener('click', animateHero);

// --------------------------------------------------------------------------------------------------------------------

let day = new Date();
fillCalendar();
fillHeading(day);

// --------------------------------------------------------------------------------------------------------------------

document.getElementById('calendar').addEventListener('click', (event) => setActive(event, day));

document.getElementById('pageBackground').addEventListener('click', setInactive);