/* ========================================
   CUSTOM JAVASCRIPT - VELVET & VOGUE
   REFACTORED FOR SINGLE-PAGE STRUCTURE
========================================
*/

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. AOS (Animate on Scroll) Initialization ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // --- 2. Dynamic Gallery Rendering ---
    renderGallery();

    // --- 3. Contact Form Validation ---
    setupContactForm();

    // --- 4. Navbar Active Link On Scroll ---
    // Bootstrap's ScrollSpy is now handling this automatically
    // via attributes in the HTML (body tag). We add a manual
    // script to handle smooth scrolling.
    setupSmoothScrolling();

});


// ========== DYNAMIC GALLERY LOGIC ==========

const galleryData = [
    {
        id: 1,
        title: "Summer Vibes",
        category: "Collection",
        imageUrl: "assets/img/medium/img1.png",
        largeImageUrl: "assets/img/large/img1.png",
    },
    {
        id: 2,
        title: "Urban Street Style",
        category: "Lookbook",
        imageUrl: "assets/img/medium/img2.png",
        largeImageUrl: "assets/img/large/img2.png",
    },
    {
        id: 3,
        title: "Elegant Evening Wear",
        category: "Campaign",
        imageUrl: "assets/img/medium/img3.png",
        largeImageUrl: "assets/img/large/img3.png",
    },
    {
        id: 4,
        title: "Casual Comfort",
        category: "New Arrivals",
        imageUrl: "https://placehold.co/600x400/DAC0A3/000000?text=Casual",
        largeImageUrl: "https://placehold.co/1200x800/DAC0A3/000000?text=Casual",
    },
    {
        id: 5,
        title: "Modern Professional",
        category: "Workwear",
        imageUrl: "https://placehold.co/600x400/1B4242/FFFFFF?text=Modern",
        largeImageUrl: "https://placehold.co/1200x800/1B4242/FFFFFF?text=Modern",
    },
    {
        id: 6,
        title: "Autumn Layers",
        category: "Collection",
        imageUrl: "https://placehold.co/600x400/5C5470/FFFFFF?text=Autumn",
        largeImageUrl: "https://placehold.co/1200x800/5C5470/FFFFFF?text=Autumn",
    }
];

function renderGallery() {
    const galleryContainer = document.getElementById("gallery-container");
    if (!galleryContainer) return;

    let galleryHTML = "";
    galleryData.forEach((item, index) => {
        galleryHTML += `
            <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="gallery-card" onclick="openGallery('${item.largeImageUrl}', '${item.title}')">
                    <img src="${item.imageUrl}" alt="${item.title}" class="gallery-card-img">
                    <div class="gallery-card-overlay">
                        <div class="gallery-card-content">
                            <h5 class="gallery-card-title">${item.title}</h5>
                            <p class="gallery-card-category">${item.category}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    galleryContainer.innerHTML = galleryHTML;
}

// ========== MODAL LOGIC (for Gallery) ==========

function openGallery(imageSrc, captionText) {
    const modalElement = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const modalCap = document.getElementById('modalCaption');

    if (modalElement && modalImg && modalCap) {
        modalImg.src = imageSrc;
        modalCap.innerText = captionText;
        const myModal = new bootstrap.Modal(modalElement);
        myModal.show();
    }
}


// ========== CONTACT FORM ==========

function setupContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Basic validation check
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill out all fields.");
            return;
        }

        // Simulate successful submission
        alert("Message sent successfully! (This is a simulation)");
        contactForm.reset();
    });
}


// ========== UTILITIES ==========

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}