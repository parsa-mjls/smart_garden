    const volumeKnob = document.getElementById("knob");
    const tickContainer = document.getElementById("tickContainer");
    const volumeValue = document.getElementById("volumeValue");
    let volume = 0 
    let startingTickAngle = -135;
    

    
    volumeKnob.addEventListener(getMouseDown(), startDrag);
    window.addEventListener(getMouseUp(), stopDrag);
     
    
    // Function to start drag
    function startDrag(e) {
        volumeKnob.style.transition = "none"; // Disable transition during drag
        document.addEventListener(getMouseMove(), handleDrag);
         createTicks(27 , 0);
    }

    // Function to handle drag
    function handleDrag(e) {
        

        const knobRect = volumeKnob.getBoundingClientRect();
        const knobCenterX = knobRect.left + knobRect.width / 2;
        const knobCenterY = knobRect.top + knobRect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const deltaX =knobCenterX -mouseX;
        const deltaY =knobCenterY - mouseY;
        const angle = Math.atan2(deltaX, deltaY);
        const degrees = (angle * 180) / Math.PI;

        // Limit rotation between -135 and 135 degrees
        const finalAngleInDegrees = -(degrees - 135); //knob is already starting at -135 degrees due to visual design so 135 degrees needs to be subtracted to compensate for the angle offset, negative value represents clockwise direction

        //only allow rotate if greater than zero degrees or lesser than 270 degrees
        if(finalAngleInDegrees >= 0 && finalAngleInDegrees <= 270)
        {
            volumeKnob.style.transform = `rotate(${finalAngleInDegrees}deg)`; //use dynamic CSS transform to rotate volume knob
            
            //270 degrees maximum freedom of rotation / 100% volume = 1% of volume difference per 2.7 degrees of rotation
            volume = (Math.floor(finalAngleInDegrees / (2.69)));

            const tickHighlightPosition = Math.round((volume * 2.7) / 10); //interpolate how many ticks need to be highlighted

            createTicks(27, tickHighlightPosition); //highlight ticks

        }

        // Map degrees to volume percentage
        
        volumeValue.textContent = `${Math.round(volume)}%`;
        
    }

    // Function to stop drag
    function stopDrag() {
        volumeKnob.style.transition = ""; // Re-enable transition
        document.removeEventListener(getMouseMove(), handleDrag);
    }


    //dynamically create volume knob "ticks"
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
        const result = /(iphone)|(ipod)|(ipad)|(android)|(blackberry)|(windows phone)|(symbian)/i.test(navigator.userAgent);
        
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

    