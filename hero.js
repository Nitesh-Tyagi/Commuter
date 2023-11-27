function handleClick (event) {
    let target = event.target.parentNode;

    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }

    target.className = 'tag2';
    let divLogo = document.createElement('div');
    divLogo.className = 'tag_logo';
    divLogo.innerText = '🛺';

    // <div class="tag_logo">🛺</div>
    // <div class="tag_price1">₹ </div>
    // <input type="number" pattern="[0-9]*" maxlength="5" placeholder="XXX" class="tag_price"></input>

    // let divLogo = document.createElement('div');
    // inputText.type = 'text';
    // inputText.maxLength = '2';
    // inputText.placeholder = '';
    // inputText.className = 'tag_logo';

    let divPrice = document.createElement('div');
    divPrice.className = 'tag_price1';
    divPrice.innerText = '₹';

    let inputNumber = document.createElement('input');
    inputNumber.type = 'number';
    inputNumber.pattern = '[0-9]*';
    inputNumber.maxLength = '5';
    inputNumber.placeholder = 'XXX';
    inputNumber.className = 'tag_price';

    // Append new elements to the target element
    target.appendChild(divLogo);
    // target.appendChild(inputText);
    target.appendChild(divPrice);
    target.appendChild(inputNumber);
}

function handleTag (event) {
    let target = event.target;

    if(target.className == 'tag1') {
        // Update the class
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }
        target.className = 'tag';

        // // Create new elements
        // let divLogo = document.createElement('div');
        // divLogo.className = 'tag_logo';
        // divLogo.innerText = '🛺';

        // // <div class="tag_logo">🛺</div>
        // // <div class="tag_price1">₹ </div>
        // // <input type="number" pattern="[0-9]*" maxlength="5" placeholder="XXX" class="tag_price"></input>

        // // let divLogo = document.createElement('div');
        // // inputText.type = 'text';
        // // inputText.maxLength = '2';
        // // inputText.placeholder = '';
        // // inputText.className = 'tag_logo';

        // let divPrice = document.createElement('div');
        // divPrice.className = 'tag_price1';
        // divPrice.innerText = '₹';

        // let inputNumber = document.createElement('input');
        // inputNumber.type = 'number';
        // inputNumber.pattern = '[0-9]*';
        // inputNumber.maxLength = '5';
        // inputNumber.placeholder = 'XXX';
        // inputNumber.className = 'tag_price';

        // // Append new elements to the target element
        // target.appendChild(divLogo);
        // // target.appendChild(inputText);
        // target.appendChild(divPrice);
        // target.appendChild(inputNumber);
    }
    else if(target.className == 'tag') {
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }

        target.className = 'tag1';

        
        let vehicles = ['🛺','🚕','🚌'];
        for(let i=0;i<3;i++) {
            let inner = document.createElement('div');
            inner.className = 'tag_logo1';
            inner.innerText = vehicles[i];
            inner.addEventListener("click", handleClick);
            console.log(inner);

            target.appendChild(inner);
        }

        // console.log(target);
    }
    else if(target.className == 'tag2') {
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }

        target.className = 'tag';

        // console.log(target);
    }
}

export function addHeroTagEventListeners () {
    let right = document.getElementById("hero").querySelector('.right');
    let tags = Array.from(right.children).filter(child => child.tagName === 'DIV');
    // console.log(tags);
    if (tags) {
        for (let i = 0; i < tags.length; i++) {
            // Apply CSS transition to each tag
            tags[i].style.transition = 'background-color 1s, box-shadow 0.8s';
            // tags[i].style.transition = 'box-shadow 1s';
            tags[i].addEventListener('touchstart', handleTouchStart.bind(tags[i]), false);
            tags[i].addEventListener('touchend', handleTouchEnd.bind(tags[i]), false);
        }
        
        let touchStartTime;
        
        function handleTouchStart(event) {
            // Check if the event target is this div
            if (event.target !== this) return;
            touchStartTime = Date.now();
            // Start changing the background color to red
            // console.log('Touch started');

            // if(this.style.backgroundColor == '#DA6C78') console.log("tag1");
            // console.log("Background : ",this.className);
            if(this.className == 'tag') this.style.boxShadow = 'inset 0 0 30px 20px #c64453';
            else this.style.backgroundColor = '#c64453';

            // box-shadow: inset 0 0 0 20px blue;
        }
        
        function handleTouchEnd(event) {
            // Check if the event target is this div
            if (event.target !== this) return;
            let touchDuration = Date.now() - touchStartTime;
        
            // console.log('Touch ended. Duration:', touchDuration);
            if (touchDuration < 500) {
                // Reset the background color if the touch was less than 2 seconds
                this.style.backgroundColor = ''; // Replace with original color if needed
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
