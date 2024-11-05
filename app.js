function gerarIdeia() {
    const input = document.getElementById('startupInput').value;
    const outputDiv = document.getElementById('output');
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
        outputDiv.innerHTML = `<strong>Ideia de Startup:</strong> ${data.ideia}`;
    })
    .catch(error => {
        outputDiv.innerHTML = "Erro ao gerar ideia. Tente novamente.";
    });
}