document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    const sections = document.querySelectorAll('section:not(#hero)'); // All sections except hero
    const apiCards = document.querySelectorAll('.api-card');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - (document.querySelector('header').offsetHeight || 0); // Adjust for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            // Close nav on mobile after clicking a link
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // Mobile Navigation Toggle
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Intersection Observer for Scroll Reveal Animations
    const observerOptions = {
        root: null, // viewport
        threshold: 0.2, // 20% of element visible
        rootMargin: "0px"
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
        section.classList.add('hidden'); // Add hidden class initially
        sectionObserver.observe(section);
    });

    const cardObserver = new IntersectionObserver(observerCallback, {
        root: null,
        threshold: 0.1, // Less threshold for cards to show faster
        rootMargin: "0px"
    });
    apiCards.forEach(card => {
        card.classList.add('hidden'); // Add hidden class initially
        cardObserver.observe(card);
    });

    // API Category Filtering (Basic)
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterCategory = button.dataset.category;

            apiCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (filterCategory === 'all' || cardCategory === filterCategory) {
                    card.style.display = 'flex'; // Show card
                    // Re-add hidden class for potential re-animation if desired
                    // card.classList.remove('visible');
                    // card.classList.add('hidden');
                    // cardObserver.observe(card); // Re-observe if you want it to fade in again
                } else {
                    card.style.display = 'none'; // Hide card
                }
            });
        });
    });
});