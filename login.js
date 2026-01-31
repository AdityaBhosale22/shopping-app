let email = document.getElementById("email");
let password = document.getElementById("password");
let btnLogin = document.getElementById("loginBtn");

let error = document.getElementById("error");
error.style.color = "red";

function generateToken() {
    return Math.random().toString(36).substr(2);
}

btnLogin.addEventListener("click", () => {
    if (email.value == "" || password.value == "") {
        error.innerText = "All fields are required";
        return;
    } else {
        let users = JSON.parse(localStorage.getItem("users") ?? "[]");
        if (users.length > 0) {
            let filteredUsers = users.filter((user) => user.email === email.value);
            if (filteredUsers.length > 0) {
                let object = filteredUsers[0];
                if (object.password === password.value) {
                    localStorage.setItem("currentUser", JSON.stringify({
                        email: email.value,
                        password: password.value,
                        token: generateToken()
                    }));
                    alert("Login successful!");
                    window.location.href = "profile/index.html";
                    error.innerText = "";
                    email.value = "";
                    password.value = "";
                }
                else {
                    error.innerText = "Incorrect password";
                }
            }
            else {
                error.innerText = "User not found";
            }
        }
        else {
            error.innerText = "No users registered";
            window.location.href = "signup.html";
        }
    }
});
