// flower1-animation.js
document.addEventListener('DOMContentLoaded', function () {
    const flower1 = document.getElementById('flower1');
    const revealWidth = 504; // Width of the image

    // Set initial position and opacity
    flower1.style.width = '0';
    flower1.style.opacity = '0';

    // Animate the image
    let width = 0;
    let opacity = 0;

    const animationInterval = setInterval(function () {
        width += 5; // Adjust the step size as needed
        opacity += 0.02; // Adjust the step size as needed
        flower1.style.width = width + 'px';
        flower1.style.opacity = opacity;

        if (width >= revealWidth) {
            clearInterval(animationInterval);
        }
    }, 20); // Adjust the interval as needed
});
