var tl = gsap.timeline();
var menu = document.querySelector(".nav i");
var close = document.querySelector(".full i");

// burger menu Animation
tl.to(".full", {
  right: 0,
  duration: 0.4,
  ease: "power4.out",
})
.from(".full i", {
  opacity: 0,
  duration: 0.2,
  ease: "power4.out",
})
.from(".full li", {
  opacity: 0,
  x: 150,
  duration: 0.3,
  stagger: 0.2,
  ease: "power4.out",
});

tl.pause();

menu.addEventListener("click", () => {
  tl.play();
});
close.addEventListener("click", () => {
  tl.reverse();
});



// navbar Animation
gsap.from(".nav img",{
  opacity:0,
  duration:0.7,
  ease:"power4.out",
  y: -70
});
gsap.from(".nav-links li", {
  opacity:0,
  duration:0.7,
  ease:"power4.out",
  y: -70,
  stagger: 0.2,
  delay: 0.2
});
