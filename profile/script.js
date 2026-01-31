let user = localStorage.getItem("currentUser");
if (user) {
    let users = JSON.parse(localStorage.getItem("users") ?? "[]");
    let currentUser = JSON.parse(user);

    const fnameInput = document.getElementById("fname");
    const lnameInput = document.getElementById("lname");
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const oldPasswordInput = document.getElementById("oldPassword");
    const newPasswordInput = document.getElementById("newPassword");
    const changePasswordBtn = document.getElementById("updatePasswordBtn");

    let userIndex = users.findIndex((u) => u.email === currentUser.email);

    if (userIndex !== -1) {

        fnameInput.value = users[userIndex].fname;
        lnameInput.value = users[userIndex].lname;

        editBtn.addEventListener("click", () => {

            fnameInput.disabled = false;
            lnameInput.disabled = false;

            fnameInput.focus();
            saveBtn.disabled = false;
            editBtn.disabled = true;

            saveBtn.style.display = "inline";
        });

        saveBtn.addEventListener('click', () => {

            users[userIndex].fname = fnameInput.value;
            users[userIndex].lname = lnameInput.value;

            localStorage.setItem("users", JSON.stringify(users));

            currentUser.fname = fnameInput.value;
            currentUser.lname = lnameInput.value;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            fnameInput.disabled = true;
            lnameInput.disabled = true;

            saveBtn.disabled = true;
            editBtn.disabled = false;

            alert('Name saved successfully!');
        });

        changePasswordBtn.addEventListener("click", () => {
            if (oldPasswordInput.value === "" || newPasswordInput.value === "") {
                alert("All fields are required");
                return;
            }
            else if (oldPasswordInput.value !== users[userIndex].password) {
                alert("Old password is incorrect");
                return;
            }
            else {
                users[userIndex].password = newPasswordInput.value;
                localStorage.setItem("users", JSON.stringify(users));
                currentUser.password = newPasswordInput.value;
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                alert("Password updated successfully!");
                oldPasswordInput.value = "";
                newPasswordInput.value = "";
            }
        })

        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            alert("You have been logged out.");
            window.location.href = "../login.html";
        });
    }
}
else {
    alert("Please login to access your profile");
    window.location.href = "../login.html";
}
