const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const popUp = document.querySelector('.popup');
const inputs = document.querySelectorAll('input');

const showError = (input, msg) => {
    // argument input przechowuje inputy
    // argument msg - nasze placeholdery
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text')
    formBox.classList.add('error')
    errorMsg.textContent = msg;

}

const clearError = input => {
    const formBox = input.parentElement;
    formBox.classList.remove('error')

}

const checkForm = inputs => {
    inputs.forEach(el => {
        if (el.value === '') {
            showError(el, el.placeholder)
        } else {
            clearError(el);
        }
    })

}

sendBtn.addEventListener('click', e => {
    e.preventDefault();
    checkForm(inputs);
    checkLength(username, 3)
    checkLength(password, 8)
    checkPass(pass, pass2)
    checkEmail(email)
    checkErrors();
})

clearBtn.addEventListener('click', e => {
    e.preventDefault();
    // [username, pass, pass2, email].forEach(el => el.value ='');
    inputs.forEach(el => {el.value = ''
    clearError(el)});
})

const checkLength = (input, min) => {
    if(input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min. ${min} znaków`);
    }
}

const checkPass = (pass1, pass2) => {
    if(pass1.value !== pass2.value) {
        showError(pass2, 'Hasła do siebie nie pasują.')
    }
}

const checkEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
        
        if (re.test(email.value)) {
            clearError(email)
        } else {
            showError(email, 'E-mail jest niepoprawny.')
        }
}

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.form-box');
    let errorCount = 0;

    allInputs.forEach(el => {
        if (el.classList.contains('error')) {
            errorCount++
        }
    })

    if(errorCount === 0) {
        popUp.classList.add('show-popup')
    }
}