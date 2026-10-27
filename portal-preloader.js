/**
 * Plantae World — Iris Leaf Portal Preloader Engine
 * Defer hero video load & playback until capillary growth animation completes.
 * Respects prefers-reduced-motion and plays once per visit (sessionStorage).
 */
(() => {
  const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const urlParams = new URLSearchParams(window.location.search);
  const forceReplay = urlParams.has('replay') || urlParams.has('intro');
  const alreadySeen = !forceReplay && sessionStorage.getItem('plantae_portal_seen') === 'true';

  // Fallback / skip intro immediately
  if (isReducedMotion || alreadySeen) {
    document.documentElement.classList.add('no-intro');
    document.documentElement.classList.remove('has-intro');
    window.__PLANTAE_RUN_INTRO__ = false;

    // Remove preloader element as soon as DOM is ready
    const dismissPreloader = () => {
      const p = document.getElementById('preloader');
      if (p) {
        p.style.display = 'none';
        p.remove();
      }
      // Start hero video immediately
      window.dispatchEvent(new CustomEvent('plantae:start-hero'));
      if (window.startHeroSlider) window.startHeroSlider();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', dismissPreloader);
    } else {
      dismissPreloader();
    }
    return;
  }

  // Active Intro Mode
  document.documentElement.classList.add('has-intro');
  document.documentElement.classList.remove('no-intro');
  window.__PLANTAE_RUN_INTRO__ = true;

  let masterTl = null;

  function prepMaskPaths() {
    const maskPaths = document.querySelectorAll('.mask-stroke');
    maskPaths.forEach(path => {
      const length = path.getTotalLength ? path.getTotalLength() : 1000;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0
      });
    });
  }

  function drawGradual(selector, duration, ease = "sine.inOut") {
    return gsap.to(selector, {
      strokeDashoffset: 0,
      opacity: 1,
      duration: duration,
      ease: ease
    });
  }

  function playPortalIntro() {
    if (typeof gsap === 'undefined') {
      // Fallback if GSAP is unavailable
      const p = document.getElementById('preloader');
      if (p) p.style.display = 'none';
      window.dispatchEvent(new CustomEvent('plantae:start-hero'));
      if (window.startHeroSlider) window.startHeroSlider();
      return;
    }

    if (masterTl) masterTl.kill();
    prepMaskPaths();

    // Viewport diagonal radius to cleanly clear every screen ratio
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight) * 0.95;

    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Reset initial states
    gsap.set("#preloader", { autoAlpha: 1, pointerEvents: "all", display: "flex" });
    const budY = window.innerHeight / 2 - 66;
    gsap.set("#portal-hole", { attr: { cx: "50%", cy: budY, rx: 0, ry: 0 } });
    gsap.set("#logoStage", {
      scale: 1,
      rotation: 0,
      autoAlpha: 1,
      transformOrigin: "47.5% 24.5%"
    });

    gsap.set(".seed-droplet", { attr: { cy: -25, r: 4.5 }, scaleX: 1, scaleY: 1, autoAlpha: 1 });
    gsap.set(".bud-inner-glow", { autoAlpha: 0, scale: 0.5 });
    gsap.set([".site-header", ".hero-copy"], { autoAlpha: 0, y: 20 });

    masterTl = gsap.timeline();

    // =========================================================================
    // ACT I: UNHURRIED, MEDITATIVE CAPILLARY GROWTH (0.0s -> 2.85s)
    // =========================================================================
    masterTl
      // 1. Seed gently floats down & touches the root base
      .to(".seed-droplet", {
        attr: { cy: 238 },
        scaleY: 1.25,
        scaleX: 0.85,
        duration: 0.55,
        ease: "sine.in"
      }, 0)
      .to(".seed-droplet", {
        scaleY: 0.2,
        scaleX: 1.8,
        autoAlpha: 0,
        duration: 0.15,
        ease: "power1.out"
      }, 0.52)

      // 2. Central Stem rises slowly up the center
      .addLabel("grow", 0.50)
      .add(drawGradual("#m-stem", 1.15, "power1.inOut"), "grow")

      // 3. Large Left Leaf unfurls gradually
      .add(drawGradual("#m-left-vein", 0.95, "power1.out"), "grow+=0.20")
      .add(drawGradual("#m-left-out", 1.15, "sine.inOut"), "grow+=0.25")
      .add(drawGradual("#m-left-in", 1.10, "sine.inOut"), "grow+=0.35")

      // 4. Lower-Right Leaf unfurls in counter-rhythm
      .add(drawGradual("#m-rlow-vein", 0.85, "power1.out"), "grow+=0.45")
      .add(drawGradual("#m-rlow-bot", 1.00, "sine.inOut"), "grow+=0.50")
      .add(drawGradual("#m-rlow-top", 0.95, "sine.inOut"), "grow+=0.60")

      // 5. Upper-Right Leaf branches out mid-stem
      .add(drawGradual("#m-rup-vein", 0.80, "power1.out"), "grow+=0.85")
      .add(drawGradual("#m-rup-bot", 0.95, "sine.inOut"), "grow+=0.90")
      .add(drawGradual("#m-rup-top", 0.95, "sine.inOut"), "grow+=1.00")

      // 6. Top Flower Bud petals trace upward and sweep over the crown
      .add(drawGradual("#m-bud-left", 0.95, "power2.out"), "grow+=1.20")
      .add(drawGradual("#m-bud-in-l", 0.95, "power2.out"), "grow+=1.30")
      .add(drawGradual("#m-bud-in-r", 0.95, "power2.out"), "grow+=1.35")
      .add(drawGradual("#m-bud-right", 1.25, "power2.out"), "grow+=1.25")

    // =========================================================================
    // ACT II: LIVING BREATH & PRE-TRIGGER HERO VIDEO (2.65s -> 3.05s)
    // =========================================================================
      .addLabel("breathe", 2.65)
      .to(".bud-inner-glow", {
        autoAlpha: 1,
        scale: 1.15,
        duration: 0.40,
        ease: "sine.inOut"
      }, "breathe")
      .to("#logoStage", {
        scale: 1.05,
        duration: 0.40,
        ease: "sine.inOut"
      }, "breathe")

      // Defer loading and playing hero video until animation is nearly finished (2.70s)
      .call(() => {
        window.dispatchEvent(new CustomEvent('plantae:start-hero'));
        if (window.startHeroSlider) window.startHeroSlider();
      }, null, 2.70)

    // =========================================================================
    // ACT III: FAST, FLUID IRIS LEAF PORTAL EXPANSION (3.05s -> 4.30s)
    // =========================================================================
      .addLabel("portalDive", 3.05)
      // 1. Camera dives through flower bud center smoothly and decisively (1.20s)
      .to("#logoStage", {
        scale: 36,
        duration: 1.20,
        ease: "power2.inOut",
        force3D: true
      }, "portalDive")
      // Dissolve emblem lines as the aperture takes over the viewport
      .to("#logoStage", {
        autoAlpha: 0,
        duration: 0.40,
        ease: "power1.in"
      }, "portalDive+=0.65")

      // 2. Simultaneously expand the transparent aperture across the screen in perfect lockstep
      .to("#portal-hole", {
        attr: {
          rx: maxRadius,
          ry: maxRadius * 1.15
        },
        duration: 1.20,
        ease: "power2.inOut"
      }, "portalDive")

      // 3. Floating Header & Hero copy glide into place as portal reveals the grounds
      .to(".site-header", {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out"
      }, "portalDive+=0.60")
      .to(".hero-copy", {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out"
      }, "portalDive+=0.70")

      // 4. Complete preloader transition & cleanup
      .to("#preloader", {
        autoAlpha: 0,
        duration: 0.30,
        ease: "power1.out",
        onComplete: () => {
          gsap.set("#preloader", { pointerEvents: "none", display: "none" });
          gsap.set("#film", { clearProps: "all" });
          document.documentElement.classList.remove('has-intro');
          document.documentElement.classList.add('no-intro');
          sessionStorage.setItem('plantae_portal_seen', 'true');
        }
      }, "portalDive+=1.05");
  }

  // Helper to allow replaying from console or debug links
  window.replayIntro = function() {
    sessionStorage.removeItem('plantae_portal_seen');
    window.__PLANTAE_RUN_INTRO__ = true;
    document.documentElement.classList.add('has-intro');
    document.documentElement.classList.remove('no-intro');
    playPortalIntro();
  };

  // Launch immediately on DOMContentLoaded without waiting for external assets
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', playPortalIntro);
  } else {
    playPortalIntro();
  }
})();
