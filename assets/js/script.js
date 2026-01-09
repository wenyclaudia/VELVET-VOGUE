/* ========================================
   CUSTOM JAVASCRIPT - VELVET & VOGUE
========================================
*/

// --- 1. AOS (Animate on Scroll) Initialization ---
document.addEventListener("DOMContentLoaded", function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,       // Animation duration (ms)
            easing: 'ease-in-out', // Easing function
            once: true           // Animate only once
        });
    }
});

// --- 2. Gallery Modal Logic ---
function openGallery(imageSrc, captionText) {
    const modalElement = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const modalCap = document.getElementById('modalCaption');

    if (modalElement && modalImg && modalCap) {
        // Set image and caption
        modalImg.src = imageSrc;
        modalCap.innerText = captionText;

        // Show Modal (Bootstrap 5)
        const myModal = new bootstrap.Modal(modalElement);
        myModal.show();
    }
}

// --- 3. Contact Form Validation (Improved) ---
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const inputs = contactForm.querySelectorAll("input, textarea");
        let isValid = true;

        // Clear previous validation states
        inputs.forEach(input => {
            input.classList.remove('is-invalid');
        });

        // Check each input
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                isValid = false;
                input.classList.add('is-invalid');
            }
        });

        if (isValid) {
            // Simulate successful submission
            alert("Message sent successfully! (Simulation)");
            contactForm.reset();
        } else {
            // Optionally, you could show a general error message here
        }
    });
}