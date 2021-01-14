import { ValidateEmail } from './ValidateEmailName';
import { ValidateLogin } from './ ValidatePassword';

const axiosConfig = {
    headers: {
        Authorization: `bearer ${localStorage.getItem('token') || ''}`
    }
}
 
export default function Login(Email, Password) {
    const email = ValidateEmail(Email);
    const password = ValidateLogin(Password);
    if (email != false && password != false) {
        axios.post('http://localhost:3003/user/login', {
            email,
            password
        }).then(resp => {
            if (resp.status == 200) {
                let token = resp.data.token;
                localStorage.setItem('token', token);
                axiosConfig.headers.Authorization = `bearer ${localStorage.getItem('token')}`;
                window.location.href = "index.html";
            }
        }).catch(err => {
            alert('Senha ou Email incorreto!!!');
            window.location.reload();
        })
    } else {
        alert('Senha ou E-mail Vazios');
        window.location.reload();
    }
}