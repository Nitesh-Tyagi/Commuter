const cols = document.querySelectorAll('.col');
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","September","October","November","December"];

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

export function digit (n) {
    if(n<10) return '0'+n;
    return ''+n;
}



export function fillCalendar () {
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

export function fillHeading (day) {
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

    let cur_date = document.getElementById("cur_date");
    cur_date.innerText = digit(day.getDate()) + " " + months[day.getMonth()-1];  
}

export function setActive (event, day) {
    // Check if the clicked element is a span
    if (event.target.tagName === 'SPAN' && !event.target.classList.contains("old")) {
        // Perform action here
        day.setDate(Number(event.target.innerText));
        
        let arr = document.getElementsByClassName("active");
        if(arr[0]) arr[0].classList.remove("active");
   
        setTimeout( function () {
            event.target.classList.add("active");
            // console.log('Span clicked:', event.target.innerText);
            // console.log(day);
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