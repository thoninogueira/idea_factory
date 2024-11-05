function gerarIdeia() {
    const input = document.getElementById('startupInput').value.trim();
    const outputDiv = document.getElementById('output');

    // Verificação para evitar entrada vazia
    if (input === "") {
        outputDiv.innerHTML = "Por favor, insira uma ideia ou tema para a startup.";
        return;
    }

    // Mensagem de carregamento
    outputDiv.innerHTML = "Gerando ideia...";

    fetch('http://localhost:5000/gerar_ideia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input })
    })
    .then(response => response.json())
    .then(data => {
        // Exibe o resultado recebido da API
        outputDiv.innerHTML = `<strong>Ideia de Startup:</strong> ${data.ideia}`;
    })
    .catch(error => {
        // Mensagem de erro em caso de falha na requisição
        outputDiv.innerHTML = "Erro ao gerar ideia. Tente novamente.";
        console.error("Erro:", error);
    });
}