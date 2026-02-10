/* =====================================================
   FRAME ANIMATION CONTROLLER
   Smooth scroll-driven frame-by-frame animation
   ===================================================== */

// Configuration
const frameCount = 110; // Total number of frames in your sequence
const canvas = document.getElementById("heroCanvas");
const context = canvas.getContext("2d", {
    alpha: false,           // No transparency needed - better performance
    desynchronized: true    // Lower latency rendering
});

// Set canvas resolution for crisp rendering
canvas.width = 1920;
canvas.height = 1080;

// Animation state
const images = [];
let currentFrame = 0;
let targetFrame = 0;
let scrollLocked = true;
let imagesLoaded = 0;

// UI Elements
const scrollIndicator = document.getElementById("scrollIndicator");
const mainContent = document.getElementById("mainContent");


/* =====================================================
   IMAGE PRELOADING
   Load all frames before animation starts
   ===================================================== */

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    
    // Construct frame filename: frame_0000.webp, frame_0001.webp, etc.
    img.src = `Images/frame_${String(i).padStart(4, '0')}.webp`;
    
    // Track loading progress
    img.onload = () => {
        imagesLoaded++;
        
        // Draw first frame immediately when loaded
        if (i === 0) {
            renderFrame(0);
        }
        
        // Optional: Show loading progress
        if (imagesLoaded === frameCount) {
            console.log('✓ All frames loaded successfully');
        }
    };
    
    img.onerror = () => {
        console.error(`✗ Failed to load frame ${i}`);
    };
    
    images.push(img);
}


/* =====================================================
   FRAME RENDERING
   Draw a specific frame to canvas with quality settings
   ===================================================== */

function renderFrame(index) {
    // Ensure index is within bounds
    index = Math.max(0, Math.min(frameCount - 1, Math.floor(index)));
    
    const img = images[index];
    if (!img || !img.complete) return;
    
    // Clear canvas for clean render
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Image smoothing settings for quality
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    
    // Draw the frame
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}


/* =====================================================
   SMOOTH ANIMATION LOOP
   Interpolate between current and target frame
   ===================================================== */

function animateToTarget() {
    // Smooth easing: gradually move current frame toward target
    const ease = 0.15; // Lower = smoother but slower (0.1 - 0.3 recommended)
    currentFrame += (targetFrame - currentFrame) * ease;
    
    // Render the interpolated frame
    renderFrame(currentFrame);
    
    // Continue loop if not close enough to target
    if (Math.abs(targetFrame - currentFrame) > 0.1) {
        requestAnimationFrame(animateToTarget);
    } else {
        // Snap to exact frame when very close
        currentFrame = targetFrame;
        renderFrame(currentFrame);
        
        // Check if animation completed
        checkAnimationComplete();
    }
}


/* =====================================================
   SCROLL CONTROL
   Handle wheel events to drive frame animation
   ===================================================== */

let isAnimating = false;

window.addEventListener("wheel", (e) => {
    // Prevent default scroll while animation is locked
    if (scrollLocked) {
        e.preventDefault();
    }
    
    // Calculate frame change based on scroll delta
    const scrollSensitivity = 0.5; // Adjust for faster/slower scroll response
    const frameChange = e.deltaY * scrollSensitivity;
    
    // Update target frame
    targetFrame += frameChange > 0 ? 2 : -2;
    targetFrame = Math.max(0, Math.min(frameCount - 1, targetFrame));
    
    // Start smooth animation if not already running
    if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(() => {
            animateToTarget();
            isAnimating = false;
        });
    }
    
}, { passive: false }); // passive: false allows preventDefault()


/* =====================================================
   ANIMATION STATE MANAGEMENT
   Handle transition from locked animation to free scroll
   ===================================================== */

function checkAnimationComplete() {
    // Unlock scroll when animation reaches the end
    if (targetFrame >= frameCount - 1 && scrollLocked) {
        unlockScroll();
    }
    
    // Re-lock if user scrolls back up before content
    if (window.scrollY <= 5 && targetFrame < frameCount - 5) {
        lockScroll();
    }
}

function unlockScroll() {
    scrollLocked = false;
    document.body.style.overflow = "auto";
    
    // Fade in main content
    setTimeout(() => {
        mainContent.classList.add('visible');
    }, 200);
    
    // Hide scroll indicator
    if (scrollIndicator) {
        scrollIndicator.classList.add('hidden');
    }
    
    console.log('🔓 Scroll unlocked - Explore the content!');
}

function lockScroll() {
    scrollLocked = true;
    document.body.style.overflow = "hidden";
    
    // Fade out main content
    mainContent.classList.remove('visible');
    
    // Show scroll indicator
    if (scrollIndicator) {
        scrollIndicator.classList.remove('hidden');
    }
    
    console.log('🔒 Scroll locked - Complete the animation');
}


/* =====================================================
   TOUCH SUPPORT (Mobile/Tablet)
   Handle touch gestures for frame control
   ===================================================== */

let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

canvas.addEventListener('touchmove', (e) => {
    if (scrollLocked) {
        e.preventDefault();
        
        const touchDelta = touchStartY - e.touches[0].clientY;
        const frameChange = touchDelta * 0.1; // Adjust sensitivity
        
        targetFrame += frameChange > 0 ? 1 : -1;
        targetFrame = Math.max(0, Math.min(frameCount - 1, targetFrame));
        
        touchStartY = e.touches[0].clientY;
        
        if (!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(() => {
                animateToTarget();
                isAnimating = false;
            });
        }
    }
}, { passive: false });


/* =====================================================
   KEYBOARD NAVIGATION (Optional Enhancement)
   Use arrow keys to control frames
   ===================================================== */

window.addEventListener('keydown', (e) => {
    if (scrollLocked) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            targetFrame = Math.min(frameCount - 1, targetFrame + 3);
            if (!isAnimating) {
                isAnimating = true;
                animateToTarget();
                isAnimating = false;
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            targetFrame = Math.max(0, targetFrame - 3);
            if (!isAnimating) {
                isAnimating = true;
                animateToTarget();
                isAnimating = false;
            }
        }
    }
});


/* =====================================================
   INITIALIZATION
   ===================================================== */

// Ensure first frame renders on load
window.addEventListener('load', () => {
    if (images[0] && images[0].complete) {
        renderFrame(0);
    }
});

console.log('🎬 Frame animation initialized');
console.log(`📊 ${frameCount} frames loaded`);
console.log('🖱️  Scroll to begin...');