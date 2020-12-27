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
        axios.post('http://localhost:3000/user/sign',{
            name,
            email,
            password
        },axiosConfig).then((result) => {
            if(result.status == 200){
                alert(`${result.data.user.name} usuário adicionado com sucesso`);
                document.location.reload(false);
            }else{
                alert('Erro ao cadastrar!!');
                document.location.reload(false);
            }
        }).catch((err) => {
            alert('Erro ao cadastrar!!');
            document.location.reload(false);
        });
    }else{
        alert('Senhas diferentes ou Email inválido!!');
        document.location.reload(false);
    }  
}