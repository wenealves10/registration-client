import { ValidateEmail, ValidateName } from './ValidateEmailName';

const axiosConfig = {
    headers: {
        Authorization: `bearer ${localStorage.getItem('token') || ''}`
    }
}
 
export default function Sign(Name, mail, password) {
    const email = ValidateEmail(mail);
    const name = ValidateName(Name);
    if(password != undefined && email != false && name != false){
        axios.post('https://register.api.wenedev.site/user/sign',{
            name,
            email,
            password
        },axiosConfig).then((result) => {
            if(result.status == 200){
                alert(`${result.data.user.name} usuário adicionado com sucesso`);
                window.location.href = "login.html";
            }else{
                alert('Senhas diferentes ou Email inválido!!!');
                window.location.reload();
            }
        }).catch((err) => {
            alert('Erro ao cadastrar!!');
            window.location.reload();
        });
    }else{
        alert('Email ou Senha Vazios');
        window.location.reload();
    }  
}