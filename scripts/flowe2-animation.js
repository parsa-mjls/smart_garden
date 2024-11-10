// flower2-animation.js
document.addEventListener('DOMContentLoaded', function () {
    const flower2 = document.getElementById('flower2');
    const revealHeight = 332; // Height of the image

    // Set initial position and opacity
    flower2.style.height = '0';
    flower2.style.opacity = '0';

    // Animate the image
    let height = 0;
    let opacity = 0;

    const animationInterval = setInterval(function () {
        height += 5; // Adjust the step size as needed
        opacity += 0.02; // Adjust the step size as needed
        flower2.style.height = height + 'px';
        flower2.style.opacity = opacity;

        if (height >= revealHeight) {
            clearInterval(animationInterval);
        }
    }, 30); // Adjust the interval as needed
});
