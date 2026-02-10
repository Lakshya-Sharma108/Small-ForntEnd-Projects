/* =====================================================
   PREMIUM PORTFOLIO - INTERACTIVE FEATURES
   Apple-level Polish & Interactions
   ===================================================== */

'use strict';

/* =====================================================
   CONFIGURATION
   ===================================================== */

const CONFIG = {
    frameCount: 110,
    scrollSensitivity: 0.5,
    smoothingFactor: 0.15,
    cursorMagnetStrength: 0.3,
};

/* =====================================================
   CANVAS & FRAME ANIMATION
   ===================================================== */

class FrameAnimation {
    constructor() {
        this.canvas = document.getElementById('heroCanvas');
        this.context = this.canvas.getContext('2d', {
            alpha: false,
            desynchronized: true,
        });
        
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        
        this.images = [];
        this.currentFrame = 0;
        this.targetFrame = 0;
        this.scrollLocked = true;
        this.isAnimating = false;
        
        this.preloadImages();
        this.setupEventListeners();
    }
    
    preloadImages() {
        for (let i = 0; i < CONFIG.frameCount; i++) {
            const img = new Image();
            img.src = `Images/frame_${String(i).padStart(4, '0')}.webp`;
            
            img.onload = () => {
                if (i === 0) this.renderFrame(0);
            };
            
            img.onerror = () => console.error(`Failed to load frame ${i}`);
            
            this.images.push(img);
        }
    }
    
    renderFrame(index) {
        index = Math.max(0, Math.min(CONFIG.frameCount - 1, Math.floor(index)));
        const img = this.images[index];
        
        if (!img || !img.complete) return;
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = true;
        this.context.imageSmoothingQuality = 'high';
        this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    }
    
    animateToTarget() {
        this.currentFrame += (this.targetFrame - this.currentFrame) * CONFIG.smoothingFactor;
        this.renderFrame(this.currentFrame);
        
        if (Math.abs(this.targetFrame - this.currentFrame) > 0.1) {
            requestAnimationFrame(() => this.animateToTarget());
        } else {
            this.currentFrame = this.targetFrame;
            this.renderFrame(this.currentFrame);
            this.checkAnimationComplete();
        }
    }
    
    handleWheel(e) {
        if (this.scrollLocked) e.preventDefault();
        
        const frameChange = e.deltaY * CONFIG.scrollSensitivity;
        this.targetFrame += frameChange > 0 ? 2 : -2;
        this.targetFrame = Math.max(0, Math.min(CONFIG.frameCount - 1, this.targetFrame));
        
        if (!this.isAnimating) {
            this.isAnimating = true;
            requestAnimationFrame(() => {
                this.animateToTarget();
                this.isAnimating = false;
            });
        }
    }
    
    checkAnimationComplete() {
        if (this.targetFrame >= CONFIG.frameCount - 1 && this.scrollLocked) {
            this.unlockScroll();
        }
        
        if (window.scrollY <= 5 && this.targetFrame < CONFIG.frameCount - 5) {
            this.lockScroll();
        }
    }
    
    unlockScroll() {
        this.scrollLocked = false;
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            document.getElementById('mainContent').classList.add('visible');
            document.getElementById('heroContent').style.opacity = '0';
        }, 200);
        
        const scrollIndicator = document.getElementById('scrollIndicator');
        if (scrollIndicator) scrollIndicator.classList.add('hidden');
    }
    
    lockScroll() {
        this.scrollLocked = true;
        document.body.style.overflow = 'hidden';
        document.getElementById('mainContent').classList.remove('visible');
        
        const scrollIndicator = document.getElementById('scrollIndicator');
        if (scrollIndicator) scrollIndicator.classList.remove('hidden');
    }
    
    setupEventListeners() {
        window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
        
        // Touch support
        let touchStartY = 0;
        this.canvas.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        this.canvas.addEventListener('touchmove', (e) => {
            if (this.scrollLocked) {
                e.preventDefault();
                const touchDelta = touchStartY - e.touches[0].clientY;
                this.targetFrame += touchDelta > 0 ? 1 : -1;
                this.targetFrame = Math.max(0, Math.min(CONFIG.frameCount - 1, this.targetFrame));
                touchStartY = e.touches[0].clientY;
                
                if (!this.isAnimating) {
                    this.isAnimating = true;
                    requestAnimationFrame(() => {
                        this.animateToTarget();
                        this.isAnimating = false;
                    });
                }
            }
        }, { passive: false });
    }
}

/* =====================================================
   SCROLL PROGRESS BAR
   ===================================================== */

class ScrollProgress {
    constructor() {
        this.progressBar = document.getElementById('scrollProgress');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            this.progressBar.style.transform = `scaleX(${scrolled / 100})`;
        });
    }
}

/* =====================================================
   SMOOTH SCROLL ANIMATIONS
   ===================================================== */

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px',
        };
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skill-card')) {
                        this.animateSkillBars(entry.target);
                    }
                    
                    // Animate stats
                    if (entry.target.classList.contains('stat-item')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, this.observerOptions);
        
        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(40px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });
        
        // Observe skill cards
        document.querySelectorAll('.skill-card').forEach(card => {
            observer.observe(card);
        });
        
        // Observe stats
        document.querySelectorAll('.stat-item').forEach(stat => {
            observer.observe(stat);
        });
    }
    
    animateSkillBars(card) {
        const progressBars = card.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = `${targetWidth}%`;
            }, 200);
        });
    }
    
    animateCounter(statItem) {
        const counter = statItem.querySelector('.stat-number');
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    }
}

/* =====================================================
   THEME TOGGLE
   ===================================================== */

class ThemeToggle {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }
    
    init() {
        document.body.setAttribute('data-theme', this.currentTheme);
        
        this.themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', this.currentTheme);
            localStorage.setItem('theme', this.currentTheme);
        });
    }
}

/* =====================================================
   CUSTOM CURSOR
   ===================================================== */

class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.cursorFollower = document.getElementById('cursorFollower');
        this.cursorPos = { x: 0, y: 0 };
        this.followerPos = { x: 0, y: 0 };
        
        if (window.innerWidth > 968) {
            this.init();
        }
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursorPos.x = e.clientX;
            this.cursorPos.y = e.clientY;
            
            this.cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
        });
        
        this.animateFollower();
        this.addMagneticEffect();
    }
    
    animateFollower() {
        this.followerPos.x += (this.cursorPos.x - this.followerPos.x) * 0.1;
        this.followerPos.y += (this.cursorPos.y - this.followerPos.y) * 0.1;
        
        this.cursorFollower.style.transform = `translate(${this.followerPos.x - 20}px, ${this.followerPos.y - 20}px)`;
        
        requestAnimationFrame(() => this.animateFollower());
    }
    
    addMagneticEffect() {
        const magneticElements = document.querySelectorAll('a, button, .project-card');
        
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursorFollower.style.width = '60px';
                this.cursorFollower.style.height = '60px';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursorFollower.style.width = '40px';
                this.cursorFollower.style.height = '40px';
            });
        });
    }
}

/* =====================================================
   SMOOTH NAV SCROLLING
   ===================================================== */

class SmoothNav {
    constructor() {
        this.nav = document.getElementById('mainNav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            });
        });
        
        // Nav background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.nav.style.background = 'rgba(0, 0, 0, 0.9)';
            } else {
                this.nav.style.background = 'rgba(0, 0, 0, 0.6)';
            }
        });
    }
}

/* =====================================================
   PARALLAX EFFECTS
   ===================================================== */

class ParallaxEffect {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // Parallax on section backgrounds
            document.querySelectorAll('.section').forEach((section, index) => {
                if (index % 2 === 0) {
                    section.style.transform = `translateY(${scrolled * 0.05}px)`;
                }
            });
        });
    }
}

/* =====================================================
   MOBILE MENU
   ===================================================== */

class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobileMenuToggle');
        this.menu = document.querySelector('.nav-menu');
        this.isOpen = false;
        this.init();
    }
    
    init() {
        this.toggle.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            
            if (this.isOpen) {
                this.menu.style.display = 'flex';
                this.menu.style.flexDirection = 'column';
                this.menu.style.position = 'absolute';
                this.menu.style.top = '80px';
                this.menu.style.left = '0';
                this.menu.style.right = '0';
                this.menu.style.background = 'rgba(0, 0, 0, 0.95)';
                this.menu.style.padding = '2rem';
            } else {
                this.menu.style.display = 'none';
            }
        });
    }
}

/* =====================================================
   INITIALIZATION
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Premium Portfolio...');
    
    new FrameAnimation();
    new ScrollProgress();
    new ScrollAnimations();
    new ThemeToggle();
    new CustomCursor();
    new SmoothNav();
    new ParallaxEffect();
    new MobileMenu();
    
    console.log('✨ All systems ready!');
});