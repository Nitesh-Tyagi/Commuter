import { getUser, putUser, getTags, putTags} from '/data.js';

function updateUser () {
    let userData = getUser();

    let expand = document.getElementById('expand');
    let fields = expand.querySelectorAll('.field')
    
    userData.username = fields[0].querySelector('.text').value;
    userData.password = fields[1].querySelector('.text').value;
    userData.budget = fields[2].querySelector('.text').value;
    
    putUser(userData)
    .then(response => {
        fillTop();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Get the slider element
const slider = document.getElementById('slider');

let isDragging = false;
let startX, startTranslateX;

// Function to update the slider's position
function updateSliderPosition(currentX) {
    let dx = currentX - startX;
    // Convert the delta movement (dx) to a percentage of the slider's parent width
    let percentageDelta = (dx / slider.parentElement.offsetWidth) * 100;
    let newTranslateX = startTranslateX + percentageDelta;
    // Limit the slider's movement between -42% and 0%
    newTranslateX = Math.max(-42, Math.min(newTranslateX, 0));
    slider.style.transform = `translateX(${newTranslateX}%)`;
    return newTranslateX;
}

// Function to handle the end of dragging
function onDragEnd(newTranslateX) {
    let snapThreshold = -21; // Midpoint between -42 and 0
    if (newTranslateX > snapThreshold) {
        slider.style.transform = 'translateX(0%)';
        updateUser();
        saveTags();
        // console.log('Slider at 0% position');

        // Set a timeout to move back to -42% after 3 seconds
        setTimeout(() => {
            slider.style.transform = 'translateX(-42%)';
            // console.log('Slider automatically returned to -42% position');
        }, 2500); // 3000 milliseconds = 3 seconds

    } else {
        slider.style.transform = 'translateX(-42%)';
        // console.log('Slider at -42% position');
    }
    isDragging = false;
}


// Initialize drag for mouse and touch
function initDrag(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const transformMatrix = window.getComputedStyle(slider).transform;
    startTranslateX = transformMatrix !== 'none' ? parseFloat(transformMatrix.split(',')[4]) / slider.parentElement.offsetWidth * 100 : -42;
}

// Handle mouse and touch events
slider.addEventListener('mousedown', initDrag);
slider.addEventListener('touchstart', initDrag);

// Handle movement (mouse and touch)
function handleMove(e) {
    if (!isDragging) return;
    let currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    updateSliderPosition(currentX);
}

document.addEventListener('mousemove', handleMove);
document.addEventListener('touchmove', handleMove);

// End dragging (mouse and touch)
function endDrag(e) {
    if (isDragging) {
        let currentX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
        let newTranslateX = updateSliderPosition(currentX);
        onDragEnd(newTranslateX);
    }
}

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

// F to handle changes in tags in top component
// change tag class
// create+append / destroy children
export function handleTag (event) {
    let target = event.target;

    if(target.className == 'tag') {
        target.className = 'tag1';
        target.backgroundColor = '#A2B6F2';

        let inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.maxLength = '2';
        inputText.placeholder = '';
        inputText.className = 'tag_logo';

        let divPrice = document.createElement('div');
        divPrice.className = 'tag_price1';
        divPrice.innerText = '₹';

        let inputNumber = document.createElement('input');
        inputNumber.type = 'number';
        inputNumber.pattern = '[0-9]*';
        inputNumber.maxLength = '5';
        inputNumber.placeholder = 'XXXX';
        inputNumber.className = 'tag_price';

        target.appendChild(inputText);
        target.appendChild(divPrice);
        target.appendChild(inputNumber);

    }
    // else if(target.className == 'tag1') {
    //     while (target.firstChild) {
    //         target.removeChild(target.firstChild);
    //     }
    
    //     target.className = 'tag';
    // }
} 

// F to add event listeners to tags in top component
// return none
export function addTopTagEventListeners () {
    let tags = Array.from(document.getElementById("leftExpand").children).filter(child => child.tagName === 'DIV');
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
            if(this.className == 'tag') this.style.boxShadow = 'inset 0 0 30px 20px #5E76BF';
            else this.style.backgroundColor = '#5E76BF';
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
                // handle tags children + tag class
                handleTag(event);
            }
        }        
    }
}

function fillTag1( target, logo, price) {
    if(target.className=='tag') {
        target.className = 'tag1';
        target.backgroundColor = '#A2B6F2';

        let inputLogo = document.createElement('input');
        inputLogo.type = 'text';
        inputLogo.maxLength = '2';
        inputLogo.placeholder = '';
        inputLogo.className = 'tag_logo';
        inputLogo.value = logo;

        let divPrice = document.createElement('div');
        divPrice.className = 'tag_price1';
        divPrice.innerText = '₹';

        let inputNumber = document.createElement('input');
        inputNumber.type = 'number';
        inputNumber.pattern = '[0-9]*';
        inputNumber.maxLength = '5';
        inputNumber.placeholder = 'XXXX';
        inputNumber.className = 'tag_price';
        inputNumber.value = price;

        target.appendChild(inputLogo);
        target.appendChild(divPrice);
        target.appendChild(inputNumber);
    }
    else {
        let children = target.children;
        children[0].value = logo;
        children[2].value = price;
    }
}

function fillTags () {
    let tagsData = getTags();
    let tags = document.getElementById('leftExpand').children;

    for(let i=0;i<3;i++){
        fillTag1(tags[i], tagsData[i+1].logo, tagsData[i+1].price);
    }
}

function saveTags () {
    let tagsData = getTags();
    let tags = document.getElementById('leftExpand').children;

    for(let i=0;i<3;i++){
        let children = tags[i].children;
        tagsData[i+1].logo = children[0].value;
        tagsData[i+1].price = children[2].value;
    }

    putTags(tagsData)
    .then(response => {
        fillTop();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
 
// async F to gather data from variable user/data.js
// fill into top component
// return none
export async function fillTop () {
    let userData = getUser();
    

    let top = document.getElementById('top');

    let left = top.querySelector('.left');
    left.innerText = userData.username;

    let right = top.querySelector('.right');
    let total = right.querySelector('#total');
    let budget = right.querySelector('#budget');
    total.innerText = userData.total;
    budget.innerText = '/ ' + userData.budget;

    let expand = document.getElementById('expand');
    let fields = expand.querySelectorAll('.field')

    fields[0].querySelector('.text').value = userData.username;
    fields[1].querySelector('.text').value = userData.password;
    fields[2].querySelector('.text').value = userData.budget;
    right = userData.total;

    fillTags();
}