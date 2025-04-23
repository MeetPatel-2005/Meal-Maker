gsap.registerPlugin(ScrollTrigger);

// Ensure GSAP is ready and set default ease
gsap.defaults({ ease: "power2.out" });

// Initialize cards to visible state to prevent hiding
gsap.set(".contact-1", { opacity: 1 });

// Timeline for title animation
const titleTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".contact",
    start: "top 80%",
    end: "top 20%",
    toggleActions: "play none none",
    markers: false, // Set to true for debugging
    // onEnter: () => console.log("Title animation started")
  }
});

titleTimeline.from(".contact-title h1", {
  y: 80,
  opacity: 0,
  duration: 0.8,
//   onComplete: () => console.log("Title animation completed")
});

// Timeline for cards fade-in animation
const cardsTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".contact",
    start: "top 70%", // Slightly earlier to ensure visibility
    toggleActions: "play none none none",
    markers: false, // Set to true for debugging
    onEnter: () => {
    //   console.log("Cards animation started");
    //   console.log("Cards detected:", document.querySelectorAll(".contact-1").length);
    }
  }
});

cardsTimeline.fromTo(
  ".contact-1",
  { opacity: 0 },
  {
    opacity: 1,
    duration: 0.5,
    stagger: 0.2,
    onComplete: () => {
    //   console.log("Cards animation completed");
      gsap.set(".contact-1", { clearProps: "opacity" }); // Clear inline styles
    }
  }
);

// Fallback to ensure cards are visible if animation fails
setTimeout(() => {
  gsap.to(".contact-1", { opacity: 1, duration: 0 });
}, 5000);

// Debounced resize handler
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
    // console.log("ScrollTrigger refreshed");
  }, 150);
});

// Clean up on page unload
window.addEventListener("unload", () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf("*");
//   console.log("Animations cleaned up");
});