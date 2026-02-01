const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btnLogin = document.getElementById("loginBtn");
const btnSignup = document.getElementById("signupBtn");
const errorMessage = document.getElementById("error");

const generateToken = () => Math.random().toString(36).substring(2, 15);

const handleLogin = () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // 1. Validation
    if (!email || !password) {
        showError("Please fill in all fields");
        return;
    }

    // 2. Data Retrieval
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    if (users.length === 0) {
        showError("No account found. Redirecting to signup...");
        setTimeout(() => window.location.href = "index.html", 1500);
        return;
    }

    // 3. User Verification
    const user = users.find(u => u.email === email);

    if (!user) {
        showError("User not found");
    } else if (user.password !== password) {
        showError("Incorrect password");
    } else {
        // 4. Success Logic
        errorMessage.innerText = "";
        const currentUser = {
            email: user.email,
            token: generateToken()
        };
        
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        
        // Visual feedback
        btnLogin.innerText = "Signing in...";
        btnLogin.style.opacity = "0.7";
        
        setTimeout(() => {
            window.location.href = "profile/index.html";
        }, 800);
    }
};

const showError = (msg) => {
    errorMessage.innerText = msg;
};

// Event Listeners
btnLogin.addEventListener("click", handleLogin);

btnSignup.addEventListener("click", () => {
    window.location.href = "index.html";
});

// Allow "Enter" key to trigger login
document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleLogin();
});