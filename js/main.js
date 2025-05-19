document.addEventListener('DOMContentLoaded', () => {
    setupMobileNav();
    if (document.querySelector('.hero-slideshow')) {
        setupSlideshow();
    }
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    setupSmoothScrolling();
});

function setupMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            const icon = mobileNavToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && !mobileNavToggle.contains(event.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

function setupSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    let isTransitioning = false;
    
    function showSlide(index, direction = null) {
        if (isTransitioning) return;
        isTransitioning = true;

        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.zIndex = 0;
        });

        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        if (direction === 'next' || direction === 'prev') {
            slides[currentSlide].style.zIndex = 1;
            slides[index].style.zIndex = 2;
        }
        
        slides[index].classList.add('active');
        
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
        
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    function nextSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slideCount) {
            newIndex = 0;
        }
        showSlide(newIndex, 'next');
    }

    function prevSlide() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = slideCount - 1;
        }
        showSlide(newIndex, 'prev');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            resetInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            resetInterval();
        });
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (index !== currentSlide) {
                const direction = index > currentSlide ? 'next' : 'prev';
                showSlide(index, direction);
                resetInterval();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    function startInterval() {
        slideInterval = setInterval(nextSlide, 10000);
    }
    
    showSlide(0);
    startInterval();
    
    const heroSection = document.querySelector('.hero-slideshow');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        heroSection.addEventListener('mouseleave', () => {
            startInterval();
        });
    }
}

function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}