const topElement = document.getElementById("top");
const heroElement = document.getElementById("hero");
const topSVG = document.getElementById("top_bg");
const leftExpand = document.getElementById("leftExpand");
const expand = document.getElementById("expand");
// Get all the "col" elements
const cols = document.querySelectorAll('.col');
const heading = document.getElementById("heading");
let heroContent;
var topIsActive = 0;

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","September","October","November","December"];


topSVG.addEventListener('mousedown', function(event) {
    let top1,top2;
    if(heroElement.innerHTML!="") heroContent = heroElement.innerHTML;
    if(topSVG) {
            top1 = topSVG.getElementById("ellipse1");
            top2 = topSVG.getElementById("ellipse2");
    }
    setTimeout(function () {
        if(topElement.style.height=='60px') {
            topElement.style.height = '220px';
            topSVG.style.transition = 'height 1.2s';
            topElement.style.zIndex = '1';
            topElement.style.transition = 'height 1.2s';

            heroElement.style.height = '0px';
            heroElement.style.marginTop = '260px';
            heroElement.style.transition = 'height 1s, margin-top 1.2s';
        
            if(topSVG && top1 && top2){
                top1.style.transition = 'rx 1.2s, ry 1.2s';
                top2.style.transition = 'rx 1.2s, ry 1.2s';
                top1.setAttribute("rx","400");
                top2.setAttribute("rx","400");
                top1.setAttribute("ry","400");
                top2.setAttribute("ry","400");
            }
            
            setTimeout(function () {
                heroElement.innerHTML="";
                setTimeout(function() {
                    leftExpand.style.opacity = '1';
                    expand.style.opacity = '1';
                }, 400);
            }, 100);
        }
        else {

            topElement.style.height = '60px';
            topSVG.style.transition = 'height 1s';
            topElement.style.zIndex = '0';
            topElement.style.transition = 'height 1s';
            leftExpand.style.opacity = '0';
            expand.style.opacity = '0';
            heroElement.style.height = '140px';
            heroElement.style.marginTop = '100px';
            heroElement.style.transition = 'height 1.2s, margin-top 1.2s';

            if(topSVG && top1 && top2){
                top1.style.transition = 'rx 1s, ry 1s';
                top2.style.transition = 'rx 1s, ry 1s';
                top1.setAttribute("rx","115.829");
                top1.setAttribute("ry","122.327");
                top2.setAttribute("rx","115.829");
                top2.setAttribute("ry","122.327");
            }

            setTimeout(function () {
                heroElement.innerHTML = heroContent;
            }, 690);
        }
    },500);
    console.log(topSVG);
})

topSVG.addEventListener("load", function () {
    console.log("SVG LOADED");
});

// ------------------------------------------------------

function daysInMonth (month, year) { // 2,2023
    return new Date(year, month, 0).getDate();
}

function prevMonth (month, year) {
    if(month==1) {
        month = 12;
        year --;
    } 
    else {
        month --;
    }

    return [month, year];
}

function digit (n) {
    if(n<10) return '0'+n;
    return ''+n;
}



function fillCalendar () {
    let day = new Date();
    day.setDate(1);
    // day.setMonth(1);
   // console.log(day);
    // console.log(day.getDay());

    const prev = prevMonth(day.getMonth(),day.getFullYear());

    let curLength = daysInMonth(day.getMonth(),day.getFullYear());
    let prevLength = daysInMonth(prev[0],prev[1]);

    // console.log(day, curLength);
    // console.log(prev[0],prev[1], prevLength);

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
            if(dd==curLength) dd=1
        }
    }
    // console.log(grid);
    // console.log(day.getDay()-1);
    // console.log(grid[0][day.getDay()-1]);

    // console.log("COL",cols.length);
    // Iterate over the "col" elements
    let key = 1;
    for (let i = 0; i < cols.length; i++) {
        const spans = cols[i].querySelectorAll('span');
        
        // console.log("SPAN",spans.length);

        for (let j = 1; j < spans.length; j++) {
            // if (j > 0) { // Skip the first two spans (day and old)
                if(grid[i][j-1]=='01') key = 1-key;

                // if(key && (j==1 || j==5)){
                if((j==1 && grid[i][j-1]>10) || ((j==5 && grid[i][j-1]<10))){
                    spans[j].classList.add("old");
                }
                spans[j].textContent = grid[i][j-1];
            // }
        }
    }
}

function fillHeading (day) {
    // console.log(day);
    // console.log(day.getDay());
    // console.log(day.getDate());

    // console.log(months[day.getMonth()-1]);
    // console.log(day.getFullYear());

    let end = "th";
    if(day.getDate()%10 == 1) end = "st";
    else if(day.getDate()%10 == 2) end = "nd";
    else if(day.getDate()%10 == 3) end = "rd";

    let left = heading.childNodes[1];
    let right = heading.childNodes[3];
    
    left.innerText = weekday[day.getDay()] + " " + day.getDate() + end;
    right.innerText = months[day.getMonth()-1] + " " + day.getFullYear();
    // console.log(left.innerText,right.innerText);
}

let day = new Date();
fillCalendar();
fillHeading(day);


// -----------------------------------------------------------------------


document.getElementById('calendar').addEventListener('click', function(event) {
    // Check if the clicked element is a span
    if (event.target.tagName === 'SPAN' && !event.target.classList.contains("old")) {
        // Perform action here
        day.setDate(Number(event.target.innerText));
        
        let arr = document.getElementsByClassName("active");
        if(arr[0]) arr[0].classList.remove("active");

        event.target.classList.add("active");
        // console.log('Span clicked:', event.target.innerText);
        // console.log(day);
        fillHeading(day);

        cur_date = document.getElementById("cur_date");
        cur_date.innerText = digit(day.getDate()) + " " + months[day.getMonth()-1];
    }
});
