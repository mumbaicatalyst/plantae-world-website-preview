/**
 * Plantae World — Luxury Hybrid Hero Slider Engine
 * Controls alternating 4s videos and Ken Burns stills with pre-buffered, zero-stutter crossfades.
 * Completely autonomous, zero on-screen clutter.
 */
(() => {
  const film = document.getElementById('film');
  const slides = Array.from(document.querySelectorAll('.hero-slide'));

  if (!film || slides.length === 0) return;

  const total = slides.length;
  let current = 0;
  let isTransitioning = false;
  let autoTimer = null;
  let currentSlideDuration = 3000;

  function getSlideDuration(slide) {
    const type = slide.dataset.type;
    // Videos are 4.01s clips. Initiate crossfade at 3.0s with an 800ms transition.
    // Transition completes at 3.8s, pausing the video before it reaches 4.01s.
    // This completely eliminates any loop back or freeze!
    if (type === 'video') return 3000;
    // Stills with Ken Burns drift look best over 4.2s
    return 4200;
  }

  function preheatVideo(video) {
    if (!video) return;
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }

  function goToSlide(nextIndex) {
    if (isTransitioning || nextIndex === current) return;
    isTransitioning = true;
    clearTimeout(autoTimer);

    const outgoingSlide = slides[current];
    const incomingSlide = slides[nextIndex];
    const incomingVideo = incomingSlide.querySelector('video');

    // 1. Pre-roll incoming video so it's rendering frames smoothly before crossfade starts
    if (incomingVideo) {
      preheatVideo(incomingVideo);
    }

    // 2. Crossfade overlap:
    // Outgoing slide keeps `.is-active` AND gains `.is-exiting` (z-index: 1).
    // This guarantees its video playback or Ken Burns animation continues in fluid motion!
    outgoingSlide.classList.add('is-exiting');

    // Incoming slide gains `.is-active` (z-index: 2) and smoothly fades in over 800ms.
    incomingSlide.classList.add('is-active');

    current = nextIndex;
    currentSlideDuration = getSlideDuration(incomingSlide);

    // 3. Post-transition cleanup after incoming slide is 100% opaque (850ms)
    setTimeout(() => {
      // Outgoing slide is now completely covered by incoming slide
      outgoingSlide.classList.remove('is-active', 'is-exiting');

      const prevVideo = outgoingSlide.querySelector('video');
      if (prevVideo) {
        prevVideo.pause();
        prevVideo.currentTime = 0;
      }

      // Reset animation on outgoing image so it can trigger freshly next time
      const prevImg = outgoingSlide.querySelector('.hero-slide-img');
      if (prevImg) {
        prevImg.style.animation = 'none';
        void prevImg.offsetWidth; // Trigger reflow
        prevImg.style.animation = '';
      }

      isTransitioning = false;
      scheduleNext();
    }, 850);
  }

  function scheduleNext() {
    clearTimeout(autoTimer);
    const nextIndex = (current + 1) % total;
    autoTimer = setTimeout(() => {
      goToSlide(nextIndex);
    }, currentSlideDuration);
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight') {
      goToSlide((current + 1) % total);
    } else if (e.key === 'ArrowLeft') {
      goToSlide((current - 1 + total) % total);
    }
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;
    const diffY = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        goToSlide((current + 1) % total);
      } else {
        goToSlide((current - 1 + total) % total);
      }
    }
  }, { passive: true });

  // Dissolve film on scroll (as user scrolls down past hero into content)
  function handleScroll() {
    const t = Math.min(window.scrollY / window.innerHeight, 1);
    film.style.opacity = String(Math.max(1 - t * 1.05, 0));
    film.style.transform = `scale(${1 + t * 0.04})`;

    // Pause video when scrolled far down to preserve system resources
    const activeVideo = slides[current].querySelector('video');
    if (activeVideo) {
      if (t > 0.95 && !activeVideo.paused) {
        activeVideo.pause();
      } else if (t < 0.5 && activeVideo.paused && !document.hidden) {
        activeVideo.play().catch(() => {});
      }
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Page visibility change (pause when tab hidden)
  document.addEventListener('visibilitychange', () => {
    const activeVideo = slides[current].querySelector('video');
    if (document.hidden) {
      clearTimeout(autoTimer);
      if (activeVideo && !activeVideo.paused) activeVideo.pause();
    } else {
      if (activeVideo && window.scrollY < window.innerHeight * 0.8) {
        activeVideo.play().catch(() => {});
      }
      scheduleNext();
    }
  });

  // Initialize first slide
  let isStarted = false;
  function init() {
    if (isStarted) return;
    isStarted = true;
    const firstSlide = slides[0];
    const firstVideo = firstSlide.querySelector('video');
    if (firstVideo) {
      if (firstVideo.dataset.src && !firstVideo.getAttribute('src')) {
        firstVideo.src = firstVideo.dataset.src;
        firstVideo.load();
      }
      preheatVideo(firstVideo);
    }
    currentSlideDuration = getSlideDuration(firstSlide);
    scheduleNext();
  }

  // Allow external trigger from portal preloader
  window.startHeroSlider = init;
  window.addEventListener('plantae:start-hero', init, { once: true });

  // Auto-start only if intro is NOT deferred
  function autoStart() {
    if (window.__PLANTAE_RUN_INTRO__) {
      return; // Will be started by portal preloader when animation is nearly finished
    }
    init();
  }

  // Start when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoStart);
  } else {
    autoStart();
  }
})();
