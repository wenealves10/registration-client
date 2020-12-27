const axiosConfig = {
    headers: {
        Authorization: `bearer ${localStorage.getItem('token') || ''}`
    }
}

export default function Users(root) {

    const nameUser = document.createElement('h1');
    const textUser = document.createElement('h3');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const hr = document.createElement('hr');
    nameUser.classList.add('text-info');
    nameUser.classList.add('mt-4');
    table.classList.add('table');
    const nameTh = document.createElement('th');
    const yearTh = document.createElement('th');
    const idTh = document.createElement('th');
    const createTh = document.createElement('th');
    thead.appendChild(idTh);
    thead.appendChild(nameTh);
    thead.appendChild(yearTh);
    thead.appendChild(createTh);
    idTh.innerHTML = 'ID';
    nameTh.innerHTML = 'Name';
    yearTh.innerHTML = 'Year';
    createTh.innerHTML = 'Create';
    table.appendChild(thead);
    table.appendChild(tbody);
    root.appendChild(nameUser);
    root.appendChild(hr);
    root.appendChild(textUser);
    root.appendChild(table);

    axios('http://localhost:3000/users', axiosConfig)
        .then(result => {
            if (result.status == 200) {
                const datas = result.data.data;
                const user = result.data.user;
                nameUser.innerHTML = user.name;
                textUser.innerHTML = 'Users'
                datas.forEach(element => {
                    const tr = document.createElement('tr');
                    const id = document.createElement('td');
                    const name = document.createElement('td');
                    const year = document.createElement('td');
                    const create = document.createElement('td');
                    id.innerHTML = element.id;
                    name.innerHTML = element.name;
                    year.innerHTML = element.year;
                    create.innerHTML = element.create;
                    tr.appendChild(id);
                    tr.appendChild(name);
                    tr.appendChild(year);
                    tr.appendChild(create);
                    tbody.appendChild(tr);
                });

            } else {
                nameUser.innerHTML = 'Precisa fazer o login!';
            }
        }).catch(err => {
            nameUser.innerHTML = 'Erro no Servidor';
        })
}