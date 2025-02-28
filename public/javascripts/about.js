gsap.from(".about img", {
    opacity: 0,
    duration: 0.5,
    ease: "power4.out",
    scrollTrigger: {
        trigger: ".about",
        scroller: "body",
        // markers: true,
        start: "top 50%",
    }
})

gsap.from(".about-h1 span", {
    opacity:0,
    bottom: -60,
    duration: 0.7,
    delay: 0.5,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".about",
        scroller: "body",
        // markers: true,
        start: "top 50%",
    }
})

gsap.from(".about-des h1", {
    opacity:0,
    y: 60,
    duration: 0.3,
    delay: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".about",
        scroller: "body",
        // markers: true,
        start: "top 50%",
    }
})

gsap.from(".about-text", {
    opacity: 0,
    duration: 0.5,
    delay: 1,
    ease: "power4.out",
    scrollTrigger: {
        trigger: ".about",
        scroller: "body",
        // markers: true,
        start: "top 50%",
    }
})