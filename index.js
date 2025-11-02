// --- CERTIFICATIONS CAROUSEL ---
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    let slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsNav = document.querySelector('.carousel-nav');

    let slidesPerView = getSlidesPerView();
    let slideCount = slides.length;
    let totalPages = Math.ceil(slideCount / slidesPerView);
    let currentPage = 0;

    function getSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    };

    function setupCarousel() {
        slidesPerView = getSlidesPerView();
        totalPages = Math.ceil(slideCount / slidesPerView);

        // Reset dots
        dotsNav.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.addEventListener('click', () => moveToPage(i));
            dotsNav.appendChild(dot);
        }

        moveToPage(0); // Go to first page
    }

    const dots = () => Array.from(dotsNav.children);

    const moveToPage = pageIndex => {
        if (pageIndex < 0) pageIndex = 0;
        if (pageIndex >= totalPages) pageIndex = totalPages - 1;

        const slideWidth = slides[0].getBoundingClientRect().width;
        const newLeft = -pageIndex * (slideWidth * slidesPerView);
        track.style.transform = `translateX(${newLeft}px)`;
        currentPage = pageIndex;
        updateNav();
    };

    const updateNav = () => {
        dots().forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
        prevButton.style.display = currentPage === 0 ? 'none' : 'flex';
        nextButton.style.display = (currentPage === totalPages - 1 || totalPages === 0) ? 'none' : 'flex';
    };

    prevButton.addEventListener('click', e => {
        moveToPage(currentPage - 1);
    });

    nextButton.addEventListener('click', e => {
        moveToPage(currentPage + 1);
    });

    window.addEventListener('resize', setupCarousel);

    // Initial setup
    setupCarousel();
});


