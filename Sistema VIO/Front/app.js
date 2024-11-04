//document.addEventListener("DOMContentLoaded")

document.getElementById('formulario_registro').addEventListener("submit", createUser)

document.addEventListener('DOMContentLoaded', getAllUsers)

document.addEventListener('DOMContentLoaded', getAllUsersTable)

document.addEventListener('DOMContentLoaded', getAllOrgTable)

function createUser(event) {
  event.preventDefault();

  const name = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  // Requisição da URL BASE para o endpoint de cadastro de usuário
  fetch("http://10.89.240.3:5000/api/v1/user/", {
    // Realiza uma chamada HTTP para o servidor (a rota definida)
    method: "POST",

    headers: {
      // A requisição será em formato JSON
      "Content-Type": "application/json",
    },

    // Transforma os dados do formulário em uma string JSON para serem enviados no corpo da requisição
    body: JSON.stringify({ name, cpf, password, email }),
  })
    .then((response) => {
      //tratamento da resposta do servidor (API)

      if (response.ok) {
        // ok verifica se a resposta foi bem sucedida
        return response.json();
      }

      return response.json().then((err) => {
        //convertendo o erro em formado json
        throw new Error(err.error);
      });
    })
    .then((data) => {
      // Executa a resposta de sucesso

      alert(data.message);
      console.log(data.message);

      //Reseta os campos do formulário
      document.getElementById("formulario_registro").reset();
    })
    .catch((error) => {
      //catch captura qualquer erro que ocorra durande o precesso de requisição

      alert("Error no cadastro: " + error.message);

      console.error("Error: ", error.message);
    });
}


function getAllUsers() {
  fetch('http://10.89.240.3:5000/api/v1/user/', {
    method: "GET",
    headers: {
      "Content-Type": "aplication/json",
    },

  })
    .then((response) => {
      if(response.ok){
        return response.json()
      }
      return response.json().then((err)=> {
        throw new Error(err.error)
      })
    })
      .then((data)=>{ //data = dados em ingles
        const userList = document.getElementById("user-list")
        userList.innerHTML = ''

        data.users.forEach((user)=>{
          const listItem = document.createElement('li')
          listItem.textContent = `Nome: ${user.name}, CPF: ${user.cpf}, Email: ${user.email}`
          userList.appendChild(listItem)
          
        })
      })
        .catch((error)=>{
          alert('Erro ao obter usuário' + error.message)
          console.error('Erro:', error.message)
        })
}

function getAllUsersTable() {
  fetch('http://10.89.240.3:5000/api/v1/user/', {
    method: "GET",
    headers: {
      "Content-Type": "aplication/json",
    },

  })
    .then((response) => {
      if(response.ok){
        return response.json()
      }
      return response.json().then((err)=> {
        throw new Error(err.error)
      })
    })
    .then((data) => {
      const userList = document.getElementById("user-list-tabela")

      userList.innerHTML = ""

      //verifica se há usuários retornados e os adiciona à tabela
      data.users.forEach((usuario) => {

        const tr = document.createElement('tr')
        
        //Cria células para nome, cpf e email
        const tdName = document.createElement('td')
        tdName.textContent = usuario.name
        tr.appendChild(tdName)

        const tdCpf = document.createElement('td')
        tdCpf.textContent = usuario.cpf
        tr.appendChild(tdCpf)

        const tdEmail = document.createElement('td')
        tdEmail.textContent = usuario.email
        tr.appendChild(tdEmail)


        userList.appendChild(tr)

      })
    })
    .catch((error) => {
      alert('Erro ao obter usuários: ' + error.message)
      console.error("Error: ", error.message)
    })
}

function getAllOrgTable() {
  fetch('http://10.89.240.3:5000/api/v1/organizador/', {
    method: "GET",
    headers: {
      "Content-Type": "aplication/json",
    },

  })
    .then((response) => {
      if(response.ok){
        return response.json()
      }
      return response.json().then((err)=> {
        throw new Error(err.error)
      })
    })
    .then((data) => {
      const userList = document.getElementById("org-list-tabela")

      userList.innerHTML = ""

      //verifica se há usuários retornados e os adiciona à tabela
      data.organizadores.forEach((organizador) => {

        const tr = document.createElement('tr')
        
        //Cria células para nome, cpf e email
        const tdName = document.createElement('td')
        tdName.textContent = organizador.nome
        tr.appendChild(tdName)

        const tdFone = document.createElement('td')
        tdFone.textContent = organizador.telefone
        tr.appendChild(tdFone)

        const tdEmail = document.createElement('td')
        tdEmail.textContent = organizador.email
        tr.appendChild(tdEmail)


        userList.appendChild(tr)

      })
    })
    .catch((error) => {
      alert('Erro ao obter Organizadores: ' + error.message)
      console.error("Error: ", error.message)
    })
}