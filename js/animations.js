const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

// Get all elements that should be animated
const hiddenElements = document.querySelectorAll('.hidden');
const slideLeftElements = document.querySelectorAll('.slide-in-left');
const slideRightElements = document.querySelectorAll('.slide-in-right');

// Observe all elements
hiddenElements.forEach((el) => observer.observe(el));
slideLeftElements.forEach((el) => observer.observe(el));
slideRightElements.forEach((el) => observer.observe(el));
