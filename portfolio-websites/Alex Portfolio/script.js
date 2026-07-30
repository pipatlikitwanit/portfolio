document.addEventListener("DOMContentLoaded", () => {

    // ==================== 1. TYPEWRITER EFFECT ====================
    const typingText = document.querySelector(".typing-text");
    const words = ["Mobile App Developer", "Frontend Developer", "Computer Science Student"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingText) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();


    // ==================== 2. MOBILE MENU TOGGLE ====================
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");

    function toggleMenu() {
        sidebar.classList.toggle("active");
        sidebarOverlay.classList.toggle("active");
        
        const icon = menuToggle.querySelector("i");
        if (sidebar.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", toggleMenu);
    }

    // เมื่อกดคลิกที่ลิงก์ในมือถือ ให้ปิด Sidebar อัตโนมัติ
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 992) {
                toggleMenu();
            }
        });
    });


    // ==================== 3. SCROLLSPY & REVEAL ====================
    const sections = document.querySelectorAll("section");
    const backToTopBtn = document.getElementById("backToTopBtn");
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 120;

        reveals.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;

        // Auto Active Left Sidebar Menu
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });

        // Back to Top Button visibility
        if (backToTopBtn) {
            if (scrollPosition > 400) {
                backToTopBtn.classList.add("active");
            } else {
                backToTopBtn.classList.remove("active");
            }
        }

        // Trigger Scroll Reveal
        revealOnScroll();
    });

    // Run reveal on initial load
    revealOnScroll();
const modal = document.getElementById("imageModal");
    const fullImage = document.getElementById("fullImage");
    const zoomableImages = document.querySelectorAll(".zoomable");
    const closeModal = document.querySelector(".modal-close");

    if (modal && fullImage) {
        zoomableImages.forEach(img => {
            img.addEventListener("click", function() {
                modal.style.display = "block";
                fullImage.src = this.src;
            });
        });

        if (closeModal) {
            closeModal.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

});