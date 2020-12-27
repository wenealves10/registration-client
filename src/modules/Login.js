import {
    ValidateEmail
} from './ValidateEmailName';
import {
    ValidateLogin
} from './ ValidatePassword';
const axiosConfig = {
    headers: {
        Authorization: `bearer ${localStorage.getItem('token') || ''}`
    }
}

export default function Login(Email, Password) {
    const email = ValidateEmail(Email);
    const password = ValidateLogin(Password);
    if (email != false && password != false) {
        axios.post('http://localhost:3000/user/login', {
            email,
            password
        }).then(resp => {
            if (resp.status) {
                let token = resp.data.token;
                localStorage.setItem('token', token);
                axiosConfig.headers.Authorization = `bearer ${localStorage.getItem('token')}`;
                alert('Usuário Logado!!');
                document.location.reload(false);
            } else {
                alert('Senha ou Email icorreto!!!');
                document.location.reload(false);
            }
        }).catch(err => {
            alert('Erro ao Logar');
            document.location.reload(false);
        })
    } else {
        alert('Senha ou Email Vazios');
        document.location.reload(false);
    }
}
