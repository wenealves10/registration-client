const axiosConfig = {
    headers: {
        Authorization: `bearer ${localStorage.getItem('token') || ''}`
    }
}

export default function Users(root) {

    // created elements
    const nameUser = document.createElement('h1');
    const textUser = document.createElement('h3');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const hr = document.createElement('hr');
    const nameTh = document.createElement('th');
    const yearTh = document.createElement('th');
    const idTh = document.createElement('th');
    const createTh = document.createElement('th');
    const actionTh = document.createElement('th');

    // atributos classes
    nameUser.classList.add('text-info');
    nameUser.classList.add('mt-4');
    table.classList.add('table');

    // AppendChild
    thead.appendChild(idTh);
    thead.appendChild(nameTh);
    thead.appendChild(yearTh);
    thead.appendChild(createTh);
    thead.appendChild(actionTh);
    table.appendChild(thead);
    table.appendChild(tbody);
    root.appendChild(nameUser);
    root.appendChild(hr);
    root.appendChild(textUser);
    root.appendChild(table);

    // InnerHtml
    idTh.innerHTML = 'ID';
    nameTh.innerHTML = 'Name';
    yearTh.innerHTML = 'Year';
    createTh.innerHTML = 'USERID';
    actionTh.innerHTML = 'Action';

    axios('http://localhost:3000/users', axiosConfig)
        .then(result => {
            if (result.status == 200) {

                const datas = result.data.data;
                const user = result.data.user;
                nameUser.innerHTML = user.name;
                textUser.innerHTML = 'Users';
                
                datas.forEach(element => {

                    // created Elements
                    const tr = document.createElement('tr');
                    const id = document.createElement('td');
                    const name = document.createElement('td');
                    const year = document.createElement('td');
                    const create = document.createElement('td');
                    const action = document.createElement('td');
                    const deleteBtn = document.createElement('button');
                    const updateBtn = document.createElement('button');

                    // InnerHTML
                    id.innerHTML = element.id;
                    name.innerHTML = element.name;
                    year.innerHTML = element.year;
                    create.innerHTML = element.create;
                    deleteBtn.innerHTML = 'Apagar';
                    updateBtn.innerHTML = 'Atualizar';

                    // Attribute 
                    tr.setAttribute('data-id',element.id);
                    tr.setAttribute('data-name',element.name);
                    tr.setAttribute('data-year',element.year);
                    tr.setAttribute('data-create',element.create);

                    // AppendChild
                    tr.appendChild(id);
                    tr.appendChild(name);
                    tr.appendChild(year);
                    tr.appendChild(create);
                    tr.appendChild(action);
                    action.appendChild(deleteBtn);
                    action.appendChild(updateBtn);
                    tbody.appendChild(tr);

                    // Css ClassList
                    deleteBtn.classList.add('mr-2')
                    deleteBtn.classList.add('btn');
                    deleteBtn.classList.add('btn-danger');
                    updateBtn.classList.add('ml-2');
                    updateBtn.classList.add('btn');
                    updateBtn.classList.add('btn-info');

                    // AddEventListener
                    deleteBtn.addEventListener('click',function(event){
                        deleteUser(tr);
                    });
                    updateBtn.addEventListener('click',function(event){
                        updateUser(tr);
                    })
                });

            } else {
                nameUser.innerHTML = 'Precisa fazer o login!';
            }
        }).catch(err => {
            nameUser.innerHTML = 'Erro no Servidor';
        })

        // Function AddEventListener
        function deleteUser(trUser) {
            let id = trUser.getAttribute('data-id')
            if (id != undefined && !isNaN(id)) {
                axios.delete('http://localhost:3000/user/' + id, axiosConfig).then(response => {
                    if (response.status == 200) {
                        alert('Apagado com Sucesso')
                        window.location.reload()
                    }
                }).catch(err => {
                    alert('Ocorreu um erro na hora de apagar!')
                })
            }
        }
        function updateUser(trUser) {
            let id = trUser.getAttribute('data-id');
            let userid = trUser.getAttribute('data-create');
            let name = trUser.getAttribute('data-name');
            let year = trUser.getAttribute('data-year');
            document.getElementById('idUpdate').value = id;
            document.getElementById('dataUpdate').value = userid;
            document.getElementById('userUpdate').value = name;
            document.getElementById('yearUpdate').value = year;
        }

        // Create Update Users
        let buttonSend = document.querySelector('#btnCreate');
        buttonSend.addEventListener('click', function (e) {
            let name = document.querySelector('#userCreate').value;
            let year = document.querySelector('#yearCreate').value;
            if (name != undefined && year != undefined) {
                let users = {
                    name,
                    year
                }
                axios.post('http://localhost:3000/user/create', users, axiosConfig).then(response => {
                    if (response.status == 200) {
                        alert('Enviado com sucesso!');
                        window.location.reload();
                    }
                }).catch(err => {
                    alert('Ocorreu um erro!');
                    window.location.reload();
                });
            }
        });

        let buttonSendEdit = document.querySelector('#btnUpdate');
        buttonSendEdit.addEventListener('click', function (e) {
            let id = document.querySelector('#idUpdate').value;
            let name = document.querySelector('#userUpdate').value;
            let year = document.querySelector('#yearUpdate').value;

            let users = {
                name,
                year
            }

            axios.put('http://localhost:3000/user/' + id, users, axiosConfig).then(response => {
                if (response.status == 200) {
                    alert('Atualizado com sucesso!');
                    window.location.reload();

                }
            }).catch(err => {
                alert('Ocorreu um erro!');
                window.location.reload();
            })
        });



}