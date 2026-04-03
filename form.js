const formObject = document.querySelector("form");

formObject.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailField = document.getElementById("email");
    const subjectField = document.getElementById("subject");
    const messageField = document.getElementById("message");

    if(!emailField.value || !subjectField.value || !messageField.value) {
        document.getElementById("error-msg").innerHTML = "Please fill out all the fields!";
    }



    else {
        document.getElementById("error-msg").innerHTML = ""
        formObject.submit();
    }
})