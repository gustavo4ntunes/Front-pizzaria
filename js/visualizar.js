document.addEventListener("DOMContentLoaded", () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('userId');

    exibirUsuario(userId);

    // Faz a busca dos usuários
    async function exibirUsuario(userId) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8000/api/user/visualizar/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();

                // Seleciona o elemento onde os dados serão exibidos
                const dadosUsuario = document.getElementById('dadosUsuario');

                const dataCriacao = new Date(data.user.created_at);
                const dataFormatada = dataCriacao.toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });

                dadosUsuario.innerHTML = `
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${data.user.name}</h5>
                        <p class="card-text">E-mail: <b>${data.user.email}</b></p>
                        <p class="card-text">Data de Criação: <b>${dataFormatada}</b></p>
                    </div>
                </div>
            `;
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar as informações do usuário.');
        }
    }

    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = 'listar.html'; 
    });
});
