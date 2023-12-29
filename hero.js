import { getTags, getCalendarTag, getDate, putDate, getCalendarTotal } from '/data.js';
import { digit, fillCalendar } from '/calendar.js';
import { getUser, putUser } from './data.js';
import { fillTop } from './top.js';

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","September","October","November","December"];

async function valuechange(logo, num, target, key) {
    let day = document.getElementById('cur_date').innerText;
    day = Number(day[0]+day[1]);

    let date = getDate(day);

    let oldValue = Number(target), value = 0;
    if(!key){
        oldValue = target.oldValue;
        value = Number(target.value);
    }

    if(num==0) {
        date.tag1 = logo;
        date.tag1_price = date.tag1_price - oldValue + value; 
    }
    else if(num==1) {
        date.tag2 = logo;
        date.tag2_price = date.tag2_price - oldValue + value;
    }
    else if(num==2) {
        date.tag3 = logo;
        date.tag3_price = date.tag3_price - oldValue +value;
    }

    putDate(date)
    .then(response => {
        let user = getUser();
        user.total = user.total - oldValue + value;

        putUser(user)
        .then(response => {
            fillTop();
            let total1 = document.getElementById("total1");
            total1.innerText = "₹ " + getCalendarTotal(day);

            fillCalendar();

            if(!key) target.oldValue = target.value;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// F to fill hero component : tags + left total1
export async function fillHero (n) {
    let total1 = document.getElementById("total1");
    total1.innerText = "₹ " + getCalendarTotal(n);

    let date = getDate(n);

    let right = document.getElementById('hero');
    let tags = right.querySelector('.right').children;

    for(let i=0;i<3;i++) {
        while (tags[i].firstChild) {
            tags[i].removeChild(tags[i].firstChild);
        }

        tags[i].num = i;
    }

    date.tag1 != 0 ? fillTag2(tags[0],date.tag1,date.tag1_price,date.tag1_price) : fillTag(tags[0]);
    date.tag2 != 0 ? fillTag2(tags[1],date.tag2,date.tag2_price,date.tag2_price) : fillTag(tags[1]);
    date.tag3 != 0 ? fillTag2(tags[2],date.tag3,date.tag3_price,date.tag3_price) : fillTag(tags[2]);
}

// async F to fill hero->tabs
// return none
export async function fillTabs () {
    // let tags = getTags(); // get data from tags/data.js
    
    getCalendarTag()
    .then(response => {
        let tags = response;
        let tabs = document.getElementById('tabs');
        let fields = tabs.querySelectorAll('.field');
        // console.log("TAGS : ",tags);
        for (let i=0; i<3;i++) {
            fields[i].querySelector('.logo').innerText = tags[i+1].logo;
            fields[i].querySelector('.price').innerText = "₹ " + tags[i+1].price;
            fields[i].querySelector('.count').innerText = tags[i+1].count;
            fields[i].querySelector('.amount').innerText = "₹ " + tags[i+1].total;
        }
    }); // get data from calendar/data.js as tag [0,1,2]
    
}

function fillTag2 (target, name, oldPrice, price) {
    let tags = getTags();

    target.className = 'tag2';
    target.name = name;
    let divLogo = document.createElement('div');
    divLogo.className = 'tag_logo';
    divLogo.innerText = tags[name].logo;

    let divPrice = document.createElement('div');
    divPrice.className = 'tag_price1';
    divPrice.innerText = '₹';

    let inputNumber = document.createElement('input');
    inputNumber.type = 'number';
    inputNumber.pattern = '[0-9]*';
    inputNumber.maxLength = '5';
    inputNumber.placeholder = 'XXX';
    inputNumber.value = price;
    inputNumber.className = 'tag_price';
    inputNumber.oldValue = oldPrice;


    valuechange(name, target.num, inputNumber, 0);
    inputNumber.addEventListener('blur', function() {
        valuechange(name, target.num, inputNumber, 0);
    });

    target.appendChild(divLogo);
    target.appendChild(divPrice);
    target.appendChild(inputNumber);
}

function fillTag (target) {
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }
    target.className = 'tag';
    target.name = 0;
    // valuechange(name, target.num, 0);
}

function handleClick (event) {
    let tags = getTags();
    let logo = event.target.innerText;
    for(let i=0;i<4;i++){
        if(logo === tags[i].logo){
            logo = i;
            break;
        }
    }
    let target = event.target.parentNode;

    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }

    fillTag2(target,logo,0,tags[logo].price);
}

function handleTag (event) {
    let tags = getTags();
    let target = event.target;

    if(target.className == 'tag1') {
        fillTag(target);
    }
    else if(target.className == 'tag') {
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }

        target.className = 'tag1';

        for(let i=0;i<3;i++) {
            let inner = document.createElement('div');
            inner.className = 'tag_logo1';
            inner.innerText = tags[i+1].logo;
            inner.addEventListener("click", handleClick);

            target.appendChild(inner);
        }
    }
    else if(target.className == 'tag2') {
        let text = target.children[2];
        // console.log("text : ",text.oldValue);
        valuechange(target.name,target.num,Number(text.oldValue), 1)
        .then (response => {
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }
            
    
            fillTag(target);
        })
        .catch(error => {
            console.error('Error:', error);
        }); 
    }
}

export function addHeroTagEventListeners () {
    let right = document.getElementById("hero").querySelector('.right');
    let tags = Array.from(right.children).filter(child => child.tagName === 'DIV');
    if (tags) {
        for (let i = 0; i < tags.length; i++) {
            // Apply CSS transition to each tag
            tags[i].style.transition = 'background-color 1s, box-shadow 0.8s';
            tags[i].addEventListener('touchstart', handleTouchStart.bind(tags[i]), false);
            tags[i].addEventListener('touchend', handleTouchEnd.bind(tags[i]), false);
        }
        
        let touchStartTime;
        
        function handleTouchStart(event) {
            // Check if the event target is this div
            if (event.target !== this) return;
            touchStartTime = Date.now();
            if(this.className == 'tag') this.style.boxShadow = 'inset 0 0 30px 20px #c64453';
            else this.style.backgroundColor = '#c64453';
        }
        
        function handleTouchEnd(event) {
            // Check if the event target is this div
            if (event.target !== this) return;
            let touchDuration = Date.now() - touchStartTime;
        
            if (touchDuration < 500) {
                // Reset the background color if the touch was less than 0.5 seconds
                this.style.backgroundColor = '';
                this.style.boxShadow = '';
            }
        
            if (touchDuration >= 500) {
                this.style.backgroundColor = '';
                this.style.boxShadow = '';
                handleTag(event);
            }
        }        
    }
}
