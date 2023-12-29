import { getCalendarTotal } from '/data.js';
import { fillHero } from '/hero.js';

const cols = document.querySelectorAll('.col');
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function daysInMonth (month, year) { // 2,2023
    if(month==1) return 28;
    if(month>7) return 30 + (month)%2;
    return 30 + (month+1)%2;
}

function prevMonth (month, year) {
    if(month==0) {
        month = 11;
        year --;
    } 
    else {
        month --;
    }

    return [month, year];
}

export function digit (n) {
    if(n<10) return '0'+n;
    return ''+n;
}


// F to fill calendar component
export function fillCalendar () {
    let day = new Date();
    day.setDate(1);

    // day.month =>  0-11 ... 12=0

    const prev = prevMonth(day.getMonth(),day.getFullYear());

    let curLength = daysInMonth(day.getMonth(),day.getFullYear());
    let prevLength = daysInMonth(prev[0],prev[1]);

    let grid = new Array(7);
    for(let i=0;i<7;i++) grid[i] = new Array(5);

    grid[day.getDay()-1][0] = digit(day.getDate());
    for(let i=day.getDay()-2;i>=0;i--){
        grid[i][0] = digit(prevLength);
        prevLength--;
    }
    let dd = 2;
    for(let i=day.getDay();i<7;i++){
        grid[i][0] = digit(dd++);
    }
    for(let j=1;j<5;j++){
        for(let i=0;i<7;i++){
            grid[i][j] = digit(dd++);
            if(dd==curLength+1) dd=1
        }
    }
    let key = 1;
    for (let i = 0; i < cols.length; i++) {
        const spans = cols[i].querySelectorAll('span');

        for (let j = 1; j < spans.length; j++) {
                if(spans[j].classList.contains("dot")) spans[j].classList.remove("dot");
                if(grid[i][j-1]=='01') key = 1-key;

                spans[j].textContent = grid[i][j-1];
                if((j==1 && grid[i][j-1]>10) || ((j==5 && grid[i][j-1]<10))){
                    spans[j].classList.add("old");
                }
                // get price total [0,1,2] for date [0-31]
                else if(getCalendarTotal(Number(spans[j].textContent))){
                    spans[j].classList.add("dot");
                }
        }
    }
}

export function fillHeading (day) {

    let end = "th";
    if(day.getDate()%10 == 1) end = "st";
    else if(day.getDate()%10 == 2) end = "nd";
    else if(day.getDate()%10 == 3) end = "rd";

    let left = heading.childNodes[1];
    let right = heading.childNodes[3];
    
    left.innerText = weekday[day.getDay()] + " " + day.getDate() + end;
    right.innerText = months[day.getMonth()] + " " + day.getFullYear();

    let cur_date = document.getElementById("cur_date");
    cur_date.innerText = digit(day.getDate()) + " " + months[day.getMonth()]; 

    fillHero(day.getDate());
}

export function setActive (event, day) {
    // Check if the clicked element is a span
    if (event.target.tagName === 'SPAN' && !event.target.classList.contains("old") && !event.target.classList.contains("day")) {
        // Perform action here
        day.setDate(Number(event.target.innerText));
        
        let arr = document.getElementsByClassName("active");
        if(arr[0]) arr[0].classList.remove("active");
   
        setTimeout( function () {
            event.target.classList.add("active");
            // console.log('Span clicked:', event.target.innerText);
            fillHeading(day);  
        },100);
    }
}

export function setInactive (event) {
    // console.log("clicked");

    let arr = document.getElementsByClassName("active");
    if(arr[0]) arr[0].classList.remove("active");


    // ADD CARD FUNCTIONALITY
}