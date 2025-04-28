
const register = document.querySelector(".register");
const signin = document.querySelector(".signin");
import { handleSuccess, handleError } from "./utils.js";

// GSAP Animations for Toggle
register.addEventListener("click", () => {
    let t1 = gsap.timeline();
    t1.to(".part2", { x: "100%", duration: 1.2, ease: "power4.out" });
    t1.to(".toggle", { x: "-100%", duration: 0.6, ease: "power4.out", delay: -0.9 });
    t1.to(".part1", { x: "100%", duration: 1.4, ease: "power3.out", delay: -0.9 });
});

signin.addEventListener("click", () => {
    let t2 = gsap.timeline();
    t2.to(".part1", { x: "0%", duration: 1.4, ease: "power4.out" });
    t2.to(".toggle", { x: "0%", duration: 0.6, ease: "power4.out", delay: -0.9 });
    t2.to(".part2", { x: "0%", duration: 1.4, ease: "power3.out", delay: -0.9 });
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
            console.log("✅ Redirecting to localhost:3000...");
            window.location.replace("http://localhost:3000/home");  // Immediate redirect
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
            console.log("✅ Redirecting to localhost:3000...");
            window.location.replace("http://localhost:3000/home");  // Immediate redirect
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

// Handle Forget Password
async function handleForgetPassword(event) {
    event.preventDefault();
    const email = document.getElementById("forgotEmail").value;
    if (!email) {
        handleError("Please enter your email!");
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/forget-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();
        if (result.success) {
            handleSuccess(result.msg);
            document.querySelector(".forgot-password").style.display = "none";
            document.querySelector(".reset-password").style.display = "block";
        } else {
            handleError(result.msg);
        }
    } catch (error) {
        console.error(error);
        handleError("Error in requesting password reset.");
    }
}

// Handle Reset Password
async function handleResetPassword(event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const newPassword = document.getElementById("newPassword").value;
    
    if (!newPassword) {
        handleError("New password is required!");
        return;
    }
    
    try {
        const response = await fetch(`${baseUrl}/reset-password?token=${token}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: newPassword })
        });
        
        const result = await response.json();
        if (result.success) {
            handleSuccess(result.message);
            setTimeout(() => {
                window.location.replace("http://localhost:3000/home");
            }, 2000);
        } else {
            handleError(result.message);
        }
    } catch (error) {
        handleError("Something went wrong. Try again later.");
    }
}

// Forgot Password Link Handling
const forgotPasswordForm = document.querySelector(".forgot-password");
const loginForm = document.querySelector(".login");
const backToLoginButton = document.getElementById("backToLogin");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");

if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "http://localhost:3000/forget-password";
    });
}

// const register = document.querySelector(".register");
// const signin = document.querySelector(".signin");
// import { handleSuccess, handleError } from "./utils.js";

// register.addEventListener("click", () => {
//     let t1 = gsap.timeline();
//     t1.to(".part2", {
//         x: "100%",
//         duration: 1.2,
//         ease: "power4.out",
//     });
//     t1.to(".toggle", {
//         x: "-100%",
//         duration: 0.6,
//         ease: "power4.out",
//         delay: -0.9
//     });
//     t1.to(".part1", {
//         x: "100%",
//         duration: 1.4,
//         ease: "power3.out",
//         delay: -0.9
//     });
// });

// signin.addEventListener("click", () => {
//     let t2 = gsap.timeline();
//     t2.to(".part1", {
//         x: "0%",
//         duration: 1.4,
//         ease: "power4.out",
//     });
//     t2.to(".toggle", {
//         x: "0%",
//         duration: 0.6,
//         ease: "power4.out",
//         delay: -0.9
//     });
//     t2.to(".part2", {
//         x: "0%",
//         duration: 1.4,
//         ease: "power3.out",
//         delay: -0.9
//     });
// });

// const baseUrl = "http://localhost:7000/auth";

// fetch('/auth/reset-password', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ token, password })
// })
// .then(response => response.json())  // Parse JSON response
// .then(data => {
//     alert(data.msg);  // Show success message
//     if (data.success && data.redirectUrl) {
//         setTimeout(() => {
//             window.location.href = data.redirectUrl;  // Redirect to "/ls"
//         }, 2000);  // Redirect after 2 seconds
//     }
// })
// .catch(error => console.error('Fetch Error:', error));

// // Handle Signup
// async function handleSignup(event) {
//     event.preventDefault();
//     const name = document.getElementById("signupUsername").value;
//     const email = document.getElementById("signupEmail").value;
//     const password = document.getElementById("signupPassword").value;

//     if (!name || !email || !password) {
//         handleError("Name, email, and password are required!");
//         return;
//     }

//     try {
//         const response = await fetch(`${baseUrl}/signup`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name, email, password })
//         });

//         const result = await response.json();
//         if (result.success) {
//             handleSuccess(result.message);
//             setTimeout(() => window.location.href = 'http://localhost:7000/', 1000);
//         } else {
//             handleError(result.message);
//         }
//     } catch (error) {
//         console.error(error);
//         handleError("Signup failed!");
//     }
    
// }

// // Handle Login
// async function handleLogin(event) {
//     event.preventDefault();
//     const email = document.getElementById("loginEmail").value;
//     const password = document.getElementById("loginPassword").value;

//     if (!email || !password) {
//         handleError("Email and password are required!");
//         return;
//     }

//     try {
//         const response = await fetch(`${baseUrl}/login`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         });

//         const result = await response.json();
//         if (result.success) {
//             localStorage.setItem("token", result.jwtToken);
//             localStorage.setItem("loggedInUser", result.name);
//             handleSuccess(result.message);
//             setTimeout(() => window.location.href = 'http://localhost:7000/', 1000);
//         } else {
//             handleError(result.message);
//         }
//     } catch (error) {
//         console.error(error);
//         handleError("Login failed!");
//     }
    
// }

// // Attach event listeners
// document.getElementById("signupForm").addEventListener("submit", handleSignup);
// document.getElementById("loginForm").addEventListener("submit", handleLogin);

// async function handleForgetPassword(event) {
//     event.preventDefault();
//     const email = document.getElementById("forgotEmail").value;
//     if (!email) {
//         alert("Please enter your email!"); // Change this to toastify or custom error handler
//         return;
//     }

//     try {
//         const response = await fetch(`http://localhost:7000/forget-password`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email }),
//         });

//         const result = await response.json();
//         if (result.success) {
//             alert(result.msg); // Change this to toastify or custom success handler
//             document.querySelector(".forgot-password").style.display = "none";
//             document.querySelector(".reset-password").style.display = "block";
//         } else {
//             alert(result.msg);
//         }
//     } catch (error) {
//         console.error(error);
//         alert("Error in requesting password reset.");
//     }
// }

// // Handle Reset Password Form Submission
// async function handleResetPassword(event) {
//     event.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get("token");
//     const newPassword = document.getElementById("newPassword").value;
    
//     if (!newPassword) {
//         handleError("New password is required!");
//         return;
//     }
    
//     try {
//         const response = await fetch(`${baseUrl}/reset-password?token=${token}`, {
//             method: "POST",
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ password: newPassword })
//         });
        
//         const result = await response.json();
//         if (result.success) {
//             handleSuccess(result.message);
//             setTimeout(() => {
//                 window.location.href = 'http://localhost:7000/';
//             }, 2000);
//         } else {
//             handleError(result.message);
//         }
//     } catch (error) {
//         handleError("Something went wrong. Try again later.");
//     }
// }

// const forgotPasswordForm = document.querySelector(".forgot-password");
// const loginForm = document.querySelector(".login");
// const backToLoginButton = document.getElementById("backToLogin");

// // Get the forgot password link element
// const forgotPasswordLink = document.getElementById("forgotPasswordLink");

// // Check if the element exists before adding an event listener
// if (forgotPasswordForm) {
//     forgotPasswordForm.addEventListener("click", function(event) {
//         event.preventDefault(); // Prevent default link behavior
//         window.location.href = "http://localhost:3000/forget-password"; // Change URL as needed
//     });
// }


