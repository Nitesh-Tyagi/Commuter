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
        console.log('Slider at 0% position');

        // Set a timeout to move back to -42% after 3 seconds
        setTimeout(() => {
            slider.style.transform = 'translateX(-42%)';
            console.log('Slider automatically returned to -42% position');
        }, 2500); // 3000 milliseconds = 3 seconds

    } else {
        slider.style.transform = 'translateX(-42%)';
        console.log('Slider at -42% position');
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
