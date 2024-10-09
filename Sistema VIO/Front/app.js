document
  .getElementById("formulario_registro")
  .addEventListener("submit", function (event) {
    
    event.preventDefault();

    const name = document.getElementById("nome").value
    const cpf = document.getElementById("cpf").value
    const email = document.getElementById("email").value
    const password = document.getElementById("senha").value

    // Requisição da URL BASE para o endpoint de cadastro de usuário
    fetch("http://localhost:5000/api/v1/user/", {
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

        // alert("Usuário cadastrado com sucesso " + data.user.name);
        alert(data.message)

        console.log("usuario criado: ", data.user);

        //Reseta os campos do formulário
        document.getElementById("formulario_registro").reset()

      })
      .catch((error) => {
        //catch captura qualquer erro que ocorra durande o precesso de requisição

        alert("Error no cadastro: " + error.message);

        console.error("Error: ", error.message);
      });
  });
