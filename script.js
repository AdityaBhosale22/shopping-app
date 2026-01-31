let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");

let error = document.getElementById("error");
error.style.color = "red";

document.getElementById("signup").addEventListener("click", ()=>{
    if(fname.value === "" || lname.value === "" || email.value === "" || password.value === "" || confirmPassword.value === ""){
        error.innerText = "All fields are required";
        return;
    }
    else if(password.value == confirmPassword.value){
        let users = JSON.parse(localStorage.getItem("users") ?? "[]");
        let filteredUsers = users.filter((user) => user.email === email.value);

        if(filteredUsers.length > 0){
            error.innerText = "User with this email already exists";
            return;
        }
        else{
            users.push({
                fname: fname.value,
                lname: lname.value,
                email: email.value,
                password: password.value,
                createdAt: new Date().toISOString()
            })
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful!");
            window.location.href = "login.html";
            error.innerText = "";
            lname.value = "";
            fname.value = "";
            email.value = "";
            password.value = "";
            confirmPassword.value = "";
        }
    }
    else{
        error.innerText = "Passwords do not match";
        return;
    }
})