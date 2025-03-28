// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; } // Loop back to the first slide
    if (n < 1) { slideIndex = slides.length; } // Loop to the last slide
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all slides
    }
    slides[slideIndex - 1].style.display = "block"; // Show the current slide
}

// Play sound and add visual effects when a key is pressed
function playSound(event) {
    // Only target keys on the active slide
    const activeSlide = document.querySelector(".mySlides:not([style*='display: none'])");
    const audio = activeSlide.querySelector(`audio[data-key="${event.keyCode}"]`);
    const key = activeSlide.querySelector(`.key[data-key="${event.keyCode}"]`);

    if (!audio) return; // Exit if no audio is linked to the key
    audio.currentTime = 0; // Rewind to the start for consecutive plays
    audio.play(); // Play the audio

    key.classList.add('playing'); // Add visual effect
}

// Remove the "playing" class after the transition ends
function removeTransition(event) {
    if (event.propertyName !== 'transform') return; // Only listen for 'transform'
    this.classList.remove('playing'); // Remove the effect
}

// Add event listeners for keys
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

// Listen for keydown events on the entire window
window.addEventListener('keydown', playSound);

