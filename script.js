// Create floating particles
function createParticles() {
    const container = document.body;
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', createParticles);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const section = entry.target;

        if (entry.isIntersecting) {
            section.classList.add('active');

            // Update progress bar
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
            const progress = (scrollPosition / scrollHeight) * 100;
            document.querySelector('.progress-bar').style.width = progress + '%';

            // Update scroll indicator
            if (window.scrollY > 100) {
                document.querySelector('.scroll-indicator').style.opacity = '0';
            }
        }
    });
}, observerOptions);

// Observe all phase sections
document.querySelectorAll('.phase-section').forEach(section => {
    observer.observe(section);
});

// Scroll indicator click to scroll down
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// Parallax effect for phase numbers
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const phaseNumbers = document.querySelectorAll('.phase-number');

    phaseNumbers.forEach((number, index) => {
        const speed = 0.1;
        const offset = index * 0.5;
        number.style.transform = `translateX(-50%) translateY(${scrolled * speed + offset}px)`;
    });
});

// Smooth reveal animation for content
const revealElements = document.querySelectorAll('.timeline-point');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `all 0.6s ease ${index * 0.1}s`;
    revealObserver.observe(element);
});

// Add click interaction to timeline points
document.querySelectorAll('.timeline-point').forEach(point => {
    point.addEventListener('click', () => {
        // Toggle expanded content
        const content = point.querySelector('.content-preview');
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.style.opacity = '1';
        } else {
            // Close all other expanded contents
            document.querySelectorAll('.content-preview').forEach(c => {
                c.style.maxHeight = null;
                c.style.opacity = '1';
            });
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
        }
    });
});

// Keyboard navigation
let currentSection = 0;
const sections = document.querySelectorAll('.phase-section');

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        currentSection = Math.min(currentSection + 1, sections.length - 1);
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        currentSection = Math.max(currentSection - 1, 0);
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
    }
});

// Touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY;

    if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
            // Swipe up - scroll down
            currentSection = Math.min(currentSection + 1, sections.length - 1);
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        } else {
            // Swipe down - scroll up
            currentSection = Math.max(currentSection - 1, 0);
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initial setup - add active class to first section
setTimeout(() => {
    document.querySelector('.phase-section').classList.add('active');
    document.querySelector('.timeline-point').style.opacity = '1';
    document.querySelector('.timeline-point').style.transform = 'translateY(0)';
}, 100);

// Console easter egg
console.log('%c🏛️ Viaggio della Coscienza 🏛️', 'font-size: 24px; font-weight: bold; color: #ffd700;');
console.log('%cBasato su "Fenomenologia dello Spirito" di Georg Wilhelm Friedrich Hegel', 'font-size: 14px; color: #c0c0c0;');
console.log('%cPremi per iniziare il viaggio', 'font-size: 12px; color: #888;');