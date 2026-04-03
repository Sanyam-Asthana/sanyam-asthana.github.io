const formObject = document.querySelector("form");
const popupObject = document.getElementById("submit-popup");

function isEmailValid(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
}

formObject.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailField = document.getElementById("email");
    const subjectField = document.getElementById("subject");
    const messageField = document.getElementById("message");

    if(!emailField.value || !subjectField.value || !messageField.value) {
        document.getElementById("error-msg").innerHTML = "Please fill out all the fields!";
    }
    else if(!isEmailValid(emailField.value)) {
        document.getElementById("error-msg").innerHTML = "Please enter a valid email!";
        console.log("Invalid email provided: " + emailField.value);
    }
    else {
        document.getElementById("error-msg").innerHTML = ""
        popupObject.showModal();
    }
})

popupObject.addEventListener("click", (e) => {
    popupObject.close();
})