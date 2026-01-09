/* ========================================
   JAVASCRIPT CUSTOM - VELVET & VOGUE
========================================
*/

// --- 1. INISIALISASI ANIMASI (AOS) ---
// Mengecek apakah library AOS sudah dimuat, lalu menjalankannya
document.addEventListener("DOMContentLoaded", function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800, // Durasi animasi (ms)
            easing: 'ease-in-out',
            once: true // Animasi hanya jalan sekali
        });
    }
});

// --- 2. LOGIKA GALERI (POIN 2 UAS) ---
function openGallery(imageSrc, captionText) {
    // Ambil elemen modal
    var modalElement = document.getElementById('galleryModal');
    var modalImg = document.getElementById('modalImage');
    var modalCap = document.getElementById('modalCaption');

    if (modalElement && modalImg && modalCap) {
        // Set gambar & caption
        modalImg.src = imageSrc;
        modalCap.innerText = captionText;

        // Tampilkan Modal (Bootstrap 5)
        var myModal = new bootstrap.Modal(modalElement);
        myModal.show();
    }
}

// --- 3. VALIDASI FORM KONTAK (SEDERHANA) ---
// Hanya jalan jika ada elemen <form> di halaman tersebut (misal di contact.html)
var contactForm = document.querySelector("form");
if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Mencegah reload halaman
        
        // Ambil data input
        var inputs = contactForm.querySelectorAll("input, textarea");
        var isFilled = true;

        inputs.forEach(function(input) {
            if(input.value.trim() === "") {
                isFilled = false;
            }
        });

        if (!isFilled) {
            alert("Harap lengkapi semua kolom!");
        } else {
            alert("Pesan berhasil terkirim! (Simulasi)");
            contactForm.reset(); // Kosongkan form
        }
    });
}