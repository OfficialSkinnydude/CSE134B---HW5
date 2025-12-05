const form = document.getElementById('form');
const errorMessage = document.getElementById('errorMessage');
const hintMessage = document.getElementById('hintMessage');
const fullName = document.getElementById('fullName');
const userEmail = document.getElementById('userEmail');
const userTel = document.getElementById('userTel');
const textArea = document.querySelector('textarea');
const characterCounter = document.getElementById('characterCount');
const formErrorsField = document.getElementById('formErrorsField')
var form_errors = [];
const fields = [fullName,userEmail,userTel,textArea]

fullName.addEventListener('input', () => {
    // This will show the native tooltip if invalid
    fullName.reportValidity();
});

userEmail.addEventListener('input', () => {
    // This will show the native tooltip if invalid
    userEmail.reportValidity();
});

userTel.addEventListener('input', () => {
    // This will show the native tooltip if invalid
    userTel.reportValidity();
    console.log(userTel.reportValidity());
    if(userTel.reportValidity()){
        userTel.style.border = "2px solid lightgreen";
    }
    
});

let hideTimer = null;
let isValid = false;
var counter = 0;
function validateForm(){
    isValid = form.checkValidity();
    console.log(isValid);
    if(!isValid){
        counter++;
        console.log(counter)
        errorMessage.textContent = 'One or more fields have an error';
        errorMessage.style.display = "block";
        if(counter > 2){
            hintMessage.textContent = 'Make sure that you enter valid characters';
            hintMessage.style.display = "block";
        }
        form.reportValidity();
        if(hideTimer) clearTimeout(hideTimer);

        hideTimer = setTimeout(() =>{
            errorMessage.style.display = "none";
            hintMessage.style.display = "none";
        }, 10000);

        formErrors();
        console.log(form_errors);
        return false;
    }
    else{
        errorMessage.style.display = "none";
        hintMessage.style.display = "none";
        return true;
    }
}

function formErrors(){
    fields.forEach(field => {
        if(!field.checkValidity()){
            console.log("ran")
            form_errors.push({
                field: field.name || field.id,
                error: field.validationMessage,
                userInput: field.value
            });
        }
    })
    formErrorsField.value = JSON.stringify(form_errors);
}

textArea.addEventListener("input", function(e){
    const target = e.target;
    const maxLength = target.getAttribute("maxlength");
    const currentLength = maxLength - target.value.length;
    if(currentLength <= 100){
        textArea.style.outlineColor = "#fffdaf";
    }
    else{
        textArea.style.outlineColor = "lightgrey";
    }
    characterCounter.innerHTML = `${currentLength}/${maxLength}`;
})

form.addEventListener('submit', (e) =>{
    if(!validateForm()){
        e.preventDefault();
    }
})