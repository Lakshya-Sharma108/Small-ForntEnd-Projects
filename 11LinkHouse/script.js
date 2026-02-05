
// ENHANCED LINK HOUSE - IMPROVED JAVASCRIPT


// DOM Elements
const infoBanner = document.querySelector(".info");
const infoClose = document.querySelector(".info-close");
const aboutSection = document.querySelector(".about");
const aboutClose = document.querySelector(".about-close");
const projectCards = document.querySelectorAll(".parentBox");
const scrollToTopBtn = document.querySelector(".scroll-to-top");

// Project Data
const projectsData = [
    {
        "title": "RagRekha",
        "description": "A home for music that flows through rhythm and emotion. Discover playlists, moods, and sounds that truly resonate with your soul.",
        "tags": ["Music", "Streaming", "UI/UX"]
    },
    {
        "title": "Weather",
        "description": "Real-time weather updates with clear forecasts and essential details. Stay prepared with accurate conditions, anytime, anywhere.",
        "tags": ["Weather", "API", "Real-time"]
    },
    {
        "title": "Portfolio",
        "description": "A personal portfolio showcasing my projects, skills, and work experience. Built to highlight real-world development and problem-solving abilities.",
        "tags": ["Portfolio", "Web Dev", "Responsive"]
    },
    {
        "title": "Quote-of-the-day",
        "description": "Words have weight when chosen well. This project brings a single quote each day to inspire clarity, reflection, and quiet motivation.",
        "tags": ["Quotes", "Daily", "Inspiration"]
    },
];


// INFO BANNER CLOSE FUNCTIONALITY
infoClose.addEventListener("click", () => {
    infoBanner.style.animation = "slideOut 0.5s ease-out forwards";
    setTimeout(() => {
        infoBanner.style.display = "none";
    }, 500);
});

// CSS Animation for slide out
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(-100px);
        }
    }
`;
document.head.appendChild(style);


// PROJECT CARDS CLICK FUNCTIONALITY
projectCards.forEach((card, index) => {
    card.addEventListener("click", (e) => {
        // Don't trigger if clicking on the link directly
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }

        const projectName = card.getAttribute('data-project');
        
        // Find matching project data
        const projectInfo = projectsData.find(project => 
            project.title.replace(/-/g, '-') === projectName.replace(/-/g, '-')
        );

        if (projectInfo) {
            displayProjectDetails(projectInfo);
            
            // Smooth scroll to about section
            setTimeout(() => {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
        }
    });

    // Add ripple effect on click
    // card.addEventListener('mousedown', createRipple);
});


// DISPLAY PROJECT DETAILS
function displayProjectDetails(project) {
    aboutSection.style.display = "block";
    
    // Populate content
    document.querySelector(".project-name").textContent = project.title;
    document.querySelector(".project-description").textContent = project.description;
    
    // Create and display tags
    const tagsContainer = document.querySelector(".project-tags");
    tagsContainer.innerHTML = '';
    
    if (project.tags && project.tags.length > 0) {
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'project-tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
    }
}


// CLOSE ABOUT SECTION
aboutClose.addEventListener("click", () => {
    aboutSection.style.animation = "scaleOut 0.4s ease-out forwards";
    setTimeout(() => {
        aboutSection.style.display = "none";
        aboutSection.style.animation = "";
    }, 400);
});

// Add scale out animation
style.textContent += `
    @keyframes scaleOut {
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
`;


// RIPPLE EFFECT
function createRipple(event) {
    const card = event.currentTarget;
    const ripple = document.createElement('span');
    
    const diameter = Math.max(card.clientWidth, card.clientHeight);
    const radius = diameter / 2;
    
    const rect = card.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');
    
    const rippleElement = card.querySelector('.ripple');
    if (rippleElement) {
        rippleElement.remove();
    }
    
    card.appendChild(ripple);
}

// Ripple CSS
style.textContent += `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;


// SCROLL TO TOP FUNCTIONALITY
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ANIMATED COUNTER FOR STATS
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 1000 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for counter animation
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}


// FOOTER YEAR UPDATE
document.getElementById("year").textContent = new Date().getFullYear();


// LAZY LOADING FOR IMAGES
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease-in';
            
            // Simulate loading
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);
            
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('.box img').forEach(img => {
    imageObserver.observe(img);
});


// PARALLAX EFFECT ON SCROLL
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.header, .info');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});


// KEYBOARD NAVIGATION
document.addEventListener('keydown', (e) => {
    // ESC key to close about section
    if (e.key === 'Escape' && aboutSection.style.display === 'block') {
        aboutClose.click();
    }
    
    // ESC key to close info banner
    if (e.key === 'Escape' && infoBanner.style.display !== 'none') {
        infoClose.click();
    }
});


// DYNAMIC GREETING BASED ON TIME
function updateGreeting() {
    const hour = new Date().getHours();
    const infoParagraph = document.querySelector('.info p');
    let greeting = 'Hi!';
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning! ☀️';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon! 🌤️';
    } else if (hour >= 17 && hour < 22) {
        greeting = 'Good evening! 🌆';
    } else {
        greeting = 'Hello there! 🌙';
    }
    
    if (infoParagraph) {
        const currentText = infoParagraph.innerHTML;
        const newText = currentText.replace(/^(Good morning! ☀️|Good afternoon! 🌤️|Good evening! 🌆|Hello there! 🌙|Hi!)/, greeting);
        infoParagraph.innerHTML = newText;
    }
}

updateGreeting();


// SMOOTH REVEAL ON SCROLL
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});


// LOADING ANIMATION COMPLETE
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


// PERFORMANCE OPTIMIZATION

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const optimizedScroll = debounce(() => {
    // Scroll-based operations here
}, 10);

window.addEventListener('scroll', optimizedScroll);


// CONSOLE MESSAGE
console.log('%cLink House - Improved Version 2.0', 'color: #ffdd95; font-size: 20px; font-weight: bold;');
console.log('%cCreated with ❤ by Lakshaya Awasthi', 'color: #ff9500; font-size: 14px;');
console.log('%cExplore the code and enjoy!', 'color: #ffd60a; font-size: 12px;');