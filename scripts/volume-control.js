// Add this JavaScript code in your main-page.js file
document.addEventListener("DOMContentLoaded", function () {
    // Get the circular volume knob and volume slider
    const volumeKnob = document.getElementById("knob");
    const tickContainer = document.getElementById("tickContainer");
    const volumeSlider = document.querySelector(".volume-slider");
    const knobContainer = document.querySelector(".volume-knob-container");

    // Initialize the lastClickedBox variable to null
    let lastClickedBox = null;
    let volume = 0 
    let startingTickAngle = -135;

    // Add mouse event listeners for knob interaction
    volumeKnob.addEventListener(getMouseDown(), startDrag);
    window.addEventListener(getMouseUp(), stopDrag);


    // Function to handle knob interaction
    function handleDrag(event) {
        
            // Calculate the knob rotation angle based on mouse position
            const knobRect = volumeKnob.getBoundingClientRect();
            const knobCenterX = knobRect.left + knobRect.width / 2;
            const knobCenterY = knobRect.top + knobRect.height / 2;
            const mouseX = event.clientX;
            const mouseY = event.clientY;
    
            const deltaX =knobCenterX -mouseX;
            const deltaY =knobCenterY - mouseY;
            const angle = Math.atan2(deltaX, deltaY);
            const degrees = (angle * 180) / Math.PI;
    
            // Limit rotation between -135 and 135 degrees
            const finalAngleInDegrees = -(degrees - 135);
            
            if(finalAngleInDegrees >= 0 && finalAngleInDegrees <= 270)
        {
            volumeKnob.style.transform = `rotate(${finalAngleInDegrees}deg)`; //use dynamic CSS transform to rotate volume knob
            
            //270 degrees maximum freedom of rotation / 100% volume = 1% of volume difference per 2.7 degrees of rotation
            volume = (Math.floor(finalAngleInDegrees / (2.69)));

            const tickHighlightPosition = Math.round((volume * 2.7) / 10); //interpolate how many ticks need to be highlighted

            createTicks(27, tickHighlightPosition); //highlight ticks

        }
            // Update the volume slider's value
            volumeSlider.value = volume;
    
            // Update the lastClickedBox's <h3> text
            if (lastClickedBox) {
                lastClickedBox.querySelector("h3").innerText = `${volume}%`;
            }
        }
    

    // Function to start knob interaction
    function startDrag(e) {
        volumeKnob.style.transition = "none"; // Disable transition during drag
        document.addEventListener(getMouseMove(), handleDrag);
         createTicks(27 , 0);
    }

    // Function to stop knob interaction
    function stopDrag() {
        volumeKnob.style.transition = ""; // Re-enable transition
        document.removeEventListener(getMouseMove(), handleDrag);
    }
    // Get all boxes
    const boxes = document.querySelectorAll(".box");

    // Initialize the lastClickedBox variable to null
    

    // Add a click event listener to each box
    boxes.forEach((box) => {
        box.addEventListener("click", function () {
            // Set the lastClickedBox to the current box
            lastClickedBox = box;

            // Get the associated volume value from the box's <h3>
            const h3 = box.querySelector("h3");
            const currentVolume = parseInt(h3.innerText, 10);

            // Set the volume slider's value to the current volume
            volumeSlider.value = currentVolume;

            // Update the circular volume knob's position based on the volume
            updateVolumeKnobPosition(currentVolume);
        });
    });

    // Add an input event listener to the volume slider
    volumeSlider.addEventListener("input", function () {
        // Update the lastClickedBox's <h3> text
        if (lastClickedBox) {
            lastClickedBox.querySelector("h3").innerText = `${volumeSlider.value}%`;
        }

        // Update the circular volume knob's position
        updateVolumeKnobPosition(volumeSlider.value);
    });

    function updateVolumeKnobPosition(volume) {
        const knobRotation = (volume * 270) / 100; // Calculate knob rotation angle
        volumeKnob.style.transform = `rotate(${knobRotation}deg)`;
        const anotherTrick = (volume * 27) / 100;
        createTicks(27, anotherTrick);
    // Function to update the circular volume knob's position
    }
    function createTicks(numTicks, highlightNumTicks)
    {
    //reset first by deleting all existing ticks
    while(tickContainer.firstChild)
    {
        tickContainer.removeChild(tickContainer.firstChild);
    }

    //create ticks
    for(let i=0;i<numTicks;i++)
    {
        let tick = document.createElement("div");

        //highlight only the appropriate ticks using dynamic CSS
        if(i < highlightNumTicks)
        {
            tick.className = "tick activetick";
        } else {
            tick.className = "tick";
        }

        tickContainer.appendChild(tick);
        tick.style.transform = "rotate(" + startingTickAngle + "deg)";
        startingTickAngle += 10;
    }

    startingTickAngle = -135; //reset
    }

    function detectMobile()
    {
        let result = /(iphone)|(ipod)|(ipad)|(android)|(blackberry)|(windows phone)|(symbian)/i.test(navigator.userAgent);
        
        if(result)
        {
            return "mobile";
        } else {
            return "desktop";
        }
    }

    function getMouseDown()
    {
        if(detectMobile() == "desktop")
        {
            return "mousedown";
        } else {
            return "touchstart";
        }
    }

    function getMouseUp()
    {
        if(detectMobile() == "desktop")
        {
            return "mouseup";
        } else {
            return "touchend";
        }
    }

    function getMouseMove()
    {
        if(detectMobile() == "desktop")
        {
            return "mousemove";
        } else {
            return "touchmove";
        }
    }
});
