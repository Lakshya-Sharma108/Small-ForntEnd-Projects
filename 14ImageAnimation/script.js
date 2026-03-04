"use strict";

/* ================= CONFIG ================= */
const CONFIG = {
    frameCount: 145,          // total frames
    framePath: "Images",      // folder name
    filePrefix: "frame_",     // frame_0001.webp
    fileExt: ".webp",
    scrollSensitivity: 0.25,  // lower = slower scroll
    smoothing: 0.09           // animation smoothness
};


/* ================= FRAME ANIMATOR ================= */
class FrameAnimator {
    constructor(canvasId, containerClass) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.container = document.getElementsByClassName(containerClass)[0];

        this.images = [];
        this.currentFrame = 0;
        this.targetFrame = 0;
        this.isAnimating = false;

        this.init();
    }

    /* ===== INIT ===== */
    init() {
        this.resizeCanvas();
        this.preloadImages();
        this.bindEvents();

        window.addEventListener("resize", () => this.resizeCanvas());
    }

    /* ===== CANVAS SIZE ===== */
    resizeCanvas() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.renderFrame(0);
    }

    /* ===== PRELOAD FRAMES ===== */
    preloadImages() {
        for (let i = 0; i < CONFIG.frameCount; i++) {
            const img = new Image();
            img.src = `${CONFIG.framePath}/${CONFIG.filePrefix}${String(i).padStart(4, "0")}${CONFIG.fileExt}`;
            this.images.push(img);

            if (i === 0) {
                img.onload = () => this.renderFrame(0);
            }
        }
    }

    /* ===== DRAW FRAME ===== */
    renderFrame(index) {
        index = Math.max(0, Math.min(CONFIG.frameCount - 1, Math.floor(index)));
        const img = this.images[index];
        if (!img || !img.complete) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    }

    /* ===== SMOOTH ANIMATION ===== */
    animate() {
        this.currentFrame += (this.targetFrame - this.currentFrame) * CONFIG.smoothing;
        this.renderFrame(this.currentFrame);
        this.applyZoomEffect();

        if (Math.abs(this.targetFrame - this.currentFrame) > 0.01) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.currentFrame = this.targetFrame;
            this.renderFrame(this.currentFrame);
            this.isAnimating = false;
        }
    }

    /* ===== SCROLL CONTROL ===== */
    handleScroll(e) {
        const rect = this.container.getBoundingClientRect();

        const inside =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

        if (!inside) return; // ignore scroll outside container

        e.preventDefault();

        this.targetFrame += e.deltaY * CONFIG.scrollSensitivity;

        this.targetFrame = Math.max(0, Math.min(CONFIG.frameCount - 1, this.targetFrame));

        if (!this.isAnimating) {
            this.isAnimating = true;
            requestAnimationFrame(() => this.animate());
        }
    }



    /* ===== EVENTS ===== */
    bindEvents() {
        window.addEventListener("wheel", (e) => this.handleScroll(e), { passive: false });
    }



    // Apply zoom effect on scroll
    applyZoomEffect() {
        const maxZoom = 1.6;        // how much zoom at last frame
        const maxTranslate = 50;  // move upward (px)

        const progress = this.currentFrame / (CONFIG.frameCount - 1);

        const scale = 1 + (maxZoom - 1) * progress;
        const translateY = maxTranslate * progress;

        this.canvas.style.transform =
            `scale(${scale}) translateY(${translateY}px)`;
    }
}

/* ================= INIT ================= */
new FrameAnimator("animation-frame", "animation-container");
