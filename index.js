import { readConfig, getAll } from '/data.js';
import { animateTop, animateHero } from '/animations.js';
import { fillCalendar, fillHeading, setActive, setInactive } from '/calendar.js';
import { addTopTagEventListeners, fillTop } from '/top.js';
import { fillTabs, addHeroTagEventListeners } from '/hero.js';


await readConfig(); // Call F to read ENV data from config data
await getAll(); // Call F to get data and then fill into variables in data.js
await fillTop(); // Call F to get data from user/data.js and fill into top component
await fillTabs(); // Call F to get data from calendar,tags/data.js and fill the tabs in hero component

// --------------------------------------------------------------------------------------------------------------------

// Add event listeners to top,hero component for animation
document.getElementById("top_bg").addEventListener('click', animateTop);
document.getElementById("hero_bg").getElementById("innerCircle").addEventListener('click', animateHero);
document.getElementById("hero_bg").getElementById("outerCircle").addEventListener('click', animateHero);

// Add event listeners to tags in top,hero component for tag changes
await addTopTagEventListeners();
await addHeroTagEventListeners();

// --------------------------------------------------------------------------------------------------------------------

// Create date variable to use as main in all calendar+hero functionality
let day = new Date();


await fillCalendar();
await fillHeading(day);


// --------------------------------------------------------------------------------------------------------------------

document.getElementById('calendar').addEventListener('click', (event) => setActive(event, day));

document.getElementById('pageBackground').addEventListener('click', setInactive);