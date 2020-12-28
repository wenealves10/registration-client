import './assets/css/styles.css';
import ValidatePassword from './modules/ ValidatePassword';
import Sign from './modules/Sign';
import Login from './modules/Login';
import Users from './modules/Users';

let btnSign = document.querySelector('#btnSign');
let btnLogin = document.querySelector('#btnLogin');
let root = document.querySelector('#root');

if (root) {
    Users(root);
}
 
if (btnSign) {
    btnSign.addEventListener('click', function (event) {
        const validatePassword = ValidatePassword('#passwordUser', '#passwordConfirm');
        Sign('#nameUser', '#emailUser', validatePassword);
    });
}

if (btnLogin) {
    btnLogin.addEventListener('click', function (event) {
        Login('#emailLogin', '#passwordLogin');
    });
}
