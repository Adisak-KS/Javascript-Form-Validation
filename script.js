const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

// แสดงข้อความแสดงข้อผิดพลาดของ Input
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// แสดงข้อความแสดงความสำเร็จของ Input
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// ตรวจสอบว่าอีเมลถูกต้องหรือไม่
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input, 'อีเมลถูกต้อง');
    } else {
        showError(input, 'อีเมลไม่ถูกต้อง');
    }
}

// ตรวจสอบฟิลด์ที่ต้องการ
function checkRequired(inputArr) {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `กรุณากรอกข้อมูล ${getFieldName(input)}`);
        } else {
            showSuccess(input);
        }
    });
}

// ตรวจสอบความยาวของ Input
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} ต้องมีความยาว ${min} ตัวอักษร`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} ต้องมีความยาวไม่เกิน ${max} ตัวอักษร`);
    } else {
        showSuccess(input);
    }
}

// รับชื่อฟิลด์
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่
function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'รหัสผ่านไม่ตรงกัน !!');
    } else {
        showSuccess(input2);
    }
}

// ตรวจสอบ form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 6, 15);
    checkLength(password, 8, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});
