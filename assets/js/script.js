document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. INISIALISASI AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50,
        });
    }

    // --- 2. LOGIKA NAVBAR (Scroll Effect) ---
    const navbar = document.querySelector('.navbar');
    const heroHeader = document.querySelector('.hero-header'); // Cek apakah ada hero header (hanya di index)

    if (navbar && heroHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white', 'shadow-sm');
            } else {
                navbar.classList.remove('bg-white', 'shadow-sm');
            }
        });
    }

    // --- 3. DYNAMIC GALLERY (Index Page) ---
    const galleryItems = [
        { title: "Autumn Collection", category: "Lookbook", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80" },
        { title: "Urban Explorer", category: "Campaign", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
        { title: "Evening Elegance", category: "Style Guide", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80" },
        { title: "Casual Comfort", category: "New Arrivals", image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80" },
        { title: "Street Style", category: "Lookbook", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" },
        { title: "Summer Vibes", category: "Campaign", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80" },
    ];

    const galleryContainer = document.getElementById('gallery-container');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');

    // Hanya jalankan jika container galeri ada (di index.html)
    if (galleryContainer) {
        galleryItems.forEach(item => {
            const galleryCard = `
                <div class="col-md-6 col-lg-4" data-aos="fade-up">
                    <div class="gallery-card" data-bs-toggle="modal" data-bs-target="#galleryModal" data-img-src="${item.image}" data-caption="${item.title} - ${item.category}">
                        <img src="${item.image}" alt="${item.title}" class="gallery-card-img">
                        <div class="gallery-card-overlay">
                            <div class="gallery-card-content">
                                <h5 class="gallery-card-title">${item.title}</h5>
                                <p class="gallery-card-category">${item.category}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            galleryContainer.innerHTML += galleryCard;
        });

        // Event Listener untuk Modal
        const galleryModal = document.getElementById('galleryModal');
        if (galleryModal) {
            galleryModal.addEventListener('show.bs.modal', function (event) {
                const card = event.relatedTarget;
                const imgSrc = card.getAttribute('data-img-src');
                const caption = card.getAttribute('data-caption');
                modalImage.src = imgSrc;
                modalCaption.textContent = caption;
            });
        }
    }

    // --- 4. FORM CONTACT ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // --- 5. LOGIKA PRODUK & PAGINASI (Products Page) ---
    // Data Dummy Produk (Minimal 9 item agar ada 3 halaman)
    const products = [
        { id: 1, name: "Urban Oversized Shirt", category: "MEN", price: "$25.00", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60", rating: 4 },
        { id: 2, name: "Classic Denim Jacket", category: "MEN", price: "$90.00", image: "https://images.unsplash.com/photo-1559582798-678dfc71ccd8?auto=format&fit=crop&w=500&q=60", rating: 5 },
        { id: 3, name: "Minimalist Gold Watch", category: "ACCESSORIES", price: "$250.00", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=500&q=60", rating: 4.5 },
        { id: 4, name: "Summer Floral Dress", category: "WOMEN", price: "$45.00", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=500&q=60", rating: 5 },
        { id: 5, name: "Leather Weekend Bag", category: "ACCESSORIES", price: "$120.00", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=60", rating: 4 },
        { id: 6, name: "Slim Fit Chinos", category: "MEN", price: "$35.00", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=500&q=60", rating: 4 },
        { id: 7, name: "Evening Silk Gown", category: "WOMEN", price: "$150.00", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=500&q=60", rating: 5 },
        { id: 8, name: "Casual Sneakers", category: "MEN", price: "$60.00", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=60", rating: 3.5 },
        { id: 9, name: "Aviator Sunglasses", category: "ACCESSORIES", price: "$15.00", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=60", rating: 4 },
        { id: 10, name: "Striped Polo Shirt", category: "MEN", price: "$30.00", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=500&q=60", rating: 4 }
    ];

    const itemsPerPage = 3; 
    let currentPage = 1;
    let currentCategory = 'ALL';
    let searchQuery = '';

    // Helper: Filter Data berdasarkan Kategori & Search
    function getFilteredProducts() {
        return products.filter(product => {
            const matchCategory = currentCategory === 'ALL' || product.category === currentCategory;
            const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchSearch;
        });
    }

    // Fungsi Render Produk
    function renderProducts(page) {
        const productContainer = document.getElementById('product-list');
        const paginationContainer = document.getElementById('pagination');
        
        // Stop jika elemen tidak ditemukan (misal sedang di index.html)
        if (!productContainer || !paginationContainer) return; 

        productContainer.innerHTML = ''; // Reset isi container
        
        // 1. Ambil data yang sudah difilter
        const filteredProducts = getFilteredProducts();

        // 2. Cek jika hasil kosong
        if (filteredProducts.length === 0) {
            productContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h3>No products found</h3>
                    <p class="text-muted">Try adjusting your search or filter.</p>
                </div>`;
            paginationContainer.innerHTML = '';
            return;
        }

        // 3. Hitung Total Page Baru
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        
        // Reset ke page 1 jika page saat ini melebihi total page baru
        if (page > totalPages) page = 1;
        currentPage = page;

        // 4. Slice Data untuk Pagination
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = filteredProducts.slice(start, end);

        // Inject HTML Produk
        paginatedItems.forEach(product => {
            // Generate Bintang
            let starsHtml = '';
            for(let i=1; i<=5; i++) {
                if(i <= product.rating) starsHtml += '<i class="fas fa-star text-warning"></i>';
                else if(i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) starsHtml += '<i class="fas fa-star-half-alt text-warning"></i>';
                else starsHtml += '<i class="far fa-star text-warning"></i>';
            }

            const productCard = `
                <div class="col-md-6 col-lg-4" data-aos="fade-up">
                    <div class="product-card-new h-100">
                        <div class="product-image-container">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid">
                            <div class="product-hover-overlay">
                                <button class="btn btn-light" onclick="alert('Added to Cart: ${product.name}')">Add to Cart</button>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="product-category">${product.category}</div>
                            <h5 class="product-title">${product.name}</h5>
                            <div class="product-price">${product.price}</div>
                            <div class="product-rating">${starsHtml}</div>
                        </div>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productCard;
        });

        // Update Tombol Pagination
        let paginationHtml = '';

        // Tombol Previous
        paginationHtml += `
            <li class="page-item ${page === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changePage(${page - 1}); return false;">Previous</a>
            </li>
        `;

        // Tombol Angka
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `
                <li class="page-item ${i === page ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
                </li>
            `;
        }

        // Tombol Next
        paginationHtml += `
            <li class="page-item ${page === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changePage(${page + 1}); return false;">Next</a>
            </li>
        `;
        
        paginationContainer.innerHTML = paginationHtml;
    }

    // Fungsi Ganti Halaman (Global)
    window.changePage = function(page) {
        const filteredProducts = getFilteredProducts();
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        
        if (page < 1 || page > totalPages) return;
        
        currentPage = page;
        renderProducts(currentPage);
        
        // Scroll ke container produk (bukan ke paling atas halaman)
        const productContainer = document.getElementById('product-list');
        if (productContainer) {
            const offset = 100; // Offset untuk navbar
            const topPos = productContainer.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: topPos, behavior: 'smooth' });
        }
    };

    // Fungsi Ganti Kategori (Global)
    window.filterCategory = function(category) {
        currentCategory = category;
        currentPage = 1; // Reset ke halaman 1 setiap ganti filter
        
        // Update UI Tombol Active
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if(btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        renderProducts(1);
    };

    // Event Listener Search Input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderProducts(1); // Render ulang real-time saat mengetik
        });
    }

    // Jalankan render pertama kali
    renderProducts(currentPage);
});