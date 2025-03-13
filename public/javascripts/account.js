
const register = document.querySelector(".register");
const signin = document.querySelector(".signin");
import { handleSuccess, handleError } from "./utils.js";

register.addEventListener("click", () => {
    let t1 = gsap.timeline();
    t1.to(".part2", {
        x: "100%",
        duration: 1.2,
        ease: "power4.out",
    });
    t1.to(".toggle", {
        x: "-100%",
        duration: 0.6,
        ease: "power4.out",
        delay: -0.9
    });
    t1.to(".part1", {
        x: "100%",
        duration: 1.4,
        ease: "power3.out",
        delay: -0.9
    });
});

signin.addEventListener("click", () => {
    let t2 = gsap.timeline();
    t2.to(".part1", {
        x: "0%",
        duration: 1.4,
        ease: "power4.out",
    });
    t2.to(".toggle", {
        x: "0%",
        duration: 0.6,
        ease: "power4.out",
        delay: -0.9
    });
    t2.to(".part2", {
        x: "0%",
        duration: 1.4,
        ease: "power3.out",
        delay: -0.9
    });
});

const baseUrl = "http://localhost:3000/auth";

// Handle Signup
async function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        handleError("Name, email, and password are required!");
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();
        if (result.success) {
            handleSuccess(result.message);
            setTimeout(() => window.location.href = 'http://localhost:3000/', 1000);
        } else {
            handleError(result.message);
        }
    } catch (error) {
        console.error(error);
        handleError("Signup failed!");
    }
    
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        handleError("Email and password are required!");
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (result.success) {
            localStorage.setItem("token", result.jwtToken);
            localStorage.setItem("loggedInUser", result.name);
            handleSuccess(result.message);
            setTimeout(() => window.location.href = 'http://localhost:3000/', 1000);
        } else {
            handleError(result.message);
        }
    } catch (error) {
        console.error(error);
        handleError("Login failed!");
    }
    
}

// Attach event listeners
document.getElementById("signupForm").addEventListener("submit", handleSignup);
document.getElementById("loginForm").addEventListener("submit", handleLogin);
