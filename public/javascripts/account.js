var register = document.querySelector(".register")
var signin = document.querySelector(".signin")

var t1 = gsap.timeline();

register.addEventListener("click", () => {
    t1.to(".part2",{
        x: "100%",
        duration: 1.2,
        ease: "power4.out",
    })
    t1.to(".toggle", {
        x: "-100%",
        duration: 0.6,
        ease: "power4.out",
        delay: -0.9
    });
    t1.to(".part1", {
        x:"100%",
        duration: 1.4,
        ease: "power3.out",
        delay: -0.9
    })
});

signin.addEventListener("click", () => {
    t1.to(".part1",{
        x: "0%",
        duration: 1.4,
        ease: "power4.out",
    })
    t1.to(".toggle", {
        x: "0%",
        duration: 0.6,
        ease: "power4.out",
        delay: -0.9
    });
    t1.to(".part2", {
        x:"0%",
        duration: 1.4,
        ease: "power3.out",
        delay: -0.9
    })
});