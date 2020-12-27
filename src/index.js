import './assets/css/styles.css';
import ValidatePassword from './modules/ ValidatePassword';
import Sign from './modules/Sign';
import Login from './modules/Login';


let btnSign = document.querySelector('#btnSign');
let btnLogin = document.querySelector('#btnLogin');

if (btnSign) {
    btnSign.addEventListener('click', function (event) {
        const validatePassword = ValidatePassword('#passwordUser', '#passwordConfirm');
        Sign('#nameUser', '#emailUser', validatePassword);
    });
}
if (btnLogin) {

    btnLogin.addEventListener('click', function (event) {
        Login('#emailLogin', '#passwordLogin');
        alert('Reload');
    });
}
