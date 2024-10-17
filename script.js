document.getElementById('popupButton').addEventListener('click', function() {
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    setTimeout(() => {
        popup.style.opacity = 1;
    }, 100); // Delay to allow for opacity transition
});

document.getElementById('close').addEventListener('click', function() {
    const popup = document.getElementById('popup');
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 1000); // Match this duration with CSS transition time
});


const words = [ "Data Science" , "Machine Learning", "Data Analysis", "Django","Python", "Full Stack Development"];
let currentIndex = 0;
const textElement = document.querySelector('.animated-text');

function showNextWord() {
    textElement.style.opacity = 0;  // Hide the text
    setTimeout(() => {
        textElement.textContent = words[currentIndex];
        textElement.style.opacity = 1;  // Show the text
        currentIndex = (currentIndex + 1) % words.length;
    }, 1000);  // Duration of the hide transition
}

setInterval(showNextWord, 2000);  // Change word every 2 seconds
showNextWord();  // Initial call to show the first word
