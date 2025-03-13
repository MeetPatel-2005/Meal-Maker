
export const handleSuccess = (msg) => {
    Toastify({
        text: `<span style="font-weight: bold;">✔️ ${msg}</span>
               <div class="toast-timer"></div>`,
        duration: 4000,
        close: true,
        gravity: "top",
        position: "right",
        escapeMarkup: false, // Allows HTML content
        style: {
            background: "#1E1E1E",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
            padding: "15px 20px",
            position: "fixed",
            top: "20px",
            right: "20px",
            left: "auto",
            zIndex: "9999",
            borderBottom: "4px solid transparent",
            backgroundImage: "linear-gradient(to right, #00c851, #007e33)", // Green gradient
            backgroundClip: "padding-box",
        }
    }).showToast();
};

export const handleError = (msg) => {
    Toastify({
        text: `<span style="font-weight: bold;">❌ ${msg}</span>
               <div class="toast-timer"></div>`,
        duration: 4000,
        close: true,
        gravity: "top",
        position: "right",
        escapeMarkup: false, // Allows HTML content
        style: {
            background: "#1E1E1E",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
            padding: "15px 20px",
            position: "fixed",
            top: "20px",
            right: "20px",
            left: "auto",
            zIndex: "9999",
            borderBottom: "4px solid transparent",
            backgroundImage: "linear-gradient(to right, #ff4444, #cc0000)", // Red gradient
            backgroundClip: "padding-box",
        }
    }).showToast();
};







