document.getElementById("form_selecao_data").addEventListener("submit", testeCalendario);

function testeCalendario(event) {
    event.preventDefault() // previne o comportamento padrão do formulário

    const data_recebida = document.getElementById("data").value

    if (data_recebida) {
        console.log(`data recebida: ${data_recebida}`)
        alert(`A data selecionada é ${data_recebida}`)
    } else {
        alert("Por favor selecione uma data")
    }
}