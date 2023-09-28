const divs = document.querySelectorAll(".form-input");
const user_password_input = Array.from(divs).find(div => div.id === "password").querySelector("input");
const user_password_error = Array.from(divs).find(div => div.id === "password").querySelector(".error");
const button = document.querySelector("button");

const nameRegExp = /\w{2,}/;
// const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

let pass;
let pass_confirm;

//check if the input is valid according to pattern
function isValid(e, regExp) {
    return (regExp.test(e.value)) ? "valid" : "invalid";
}
//check if the 2 pass are same
function isPassSame(pass, pass_confirm) {
    if (user_password_input.className === "invalid") return;
    return (pass !== pass_confirm) ? "invalid" : "valid";
}
//show error if invalid input
function showError(input, error) {
    if (input.className === "invalid") {
        switch (input.id) {
            case "user-email":
                error.textContent = "Invalid Email Format";
                break;

            case "user-password":
                error.textContent = "Password does not meet the requirements below";
                break;

            case "user-confirm":
                error.textContent = "Password does not match";
                user_password_input.className = "invalid";
                break;
        }
    }
    else if (input.className === "valid") {
        if (input.id === "user-confirm") {
            user_password_input.className = isValid(user_password_input, passRegExp);
        }
        error.textContent = "";
        return;
    }

    if (input.value.length === 0) {
        if (input.id === "phone-number") {}
        else {
            input.className = "invalid";
            error.textContent = "Please fill the blank";
        }
        
        if (input.className === "valid") {
            error.textContent = "";
        }
    }
}
//check if input is blank
function ifBlank(input, error, blank) {
    if (blank === 0) {
        if (input.id === "user-confirm") {
            user_password_input.className = isValid(user_password_input, passRegExp);
            
            if (user_password_input.value.length === 0) {
                user_password_input.className = "";
            }
        }
        input.className = "";
        error.textContent = "";
    }
}

divs.forEach(div => {
    const input = div.querySelector("input");
    const error = div.querySelector("span.error");

    input.addEventListener("input", (e) => {
        switch (e.target.id) {
            case "last-name":
            case "first-name":
                input.className = isValid(e.target, nameRegExp);
                showError(input, error);
                if (e.target.value.length === 0) {input.className = ""};
                break;

            case "user-email":
                ifBlank(input, error, e.target.value.length);
                break;
            
            // case "phone-number":
            //     input.className = isValid(e.target, phoneRegExp);
            //     if (e.target.value.length === 0) {input.className = ""};
            //     break;

            case "user-password":
                pass = e.target.value;
                ifBlank(input, error, e.target.value.length);
                break;

            case "user-confirm":
                pass_confirm = e.target.value;
                ifBlank(input, error, e.target.value.length);
                break;
        }
    });

    input.addEventListener("blur", (e) => {
        switch (e.target.id) {
            case "user-email":
                input.className = isValid(e.target, emailRegExp);
                showError(input, error);
                ifBlank(input, error, e.target.value.length);
                break;

            case "user-password":
                input.className = isValid(e.target, passRegExp);
                showError(input, error);
                ifBlank(input, error, e.target.value.length);
                break;

            case "user-confirm":
                input.className = isPassSame(pass, pass_confirm);
                showError(input, error);
                ifBlank(input, error, e.target.value.length);
                break;
        }
    });


});

// button.addEventListener("click", (e) => {
//     e.target.disabled = false;
//     divs.forEach(div => {
//         const input = div.querySelector("input");
//         const error = div.querySelector("span.error");

//         if (input.value.length === 0) {
//             showError(input, error);
//         }
//         if (input.className === "invalid") {
//             e.target.disabled = true;
//         }
//         else if (input.className === "valid") {
//             e.target.removeAtrribute("disabled");
//         }
//     });

    
// console.log(e.target.disabled);
// });




