// Requisito 6: Array para armazenar itens favoritados no localStorage
// Recupera favoritos salvos ou inicializa array vazio
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Array para manter os agentes da busca atual em memória
let currentAgents = [];

// Requisito 3: Função de busca que consulta API do Valorant
// Função assíncrona para fazer requisições HTTP
async function searchAgents() {
    // Obtém o termo de busca do input e converte para minúsculo
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // Se campo estiver vazio, limpa os resultados
    if (searchTerm.trim() === '') {
        document.getElementById('agentsContainer').innerHTML = '';
        currentAgents = [];
        return;
    }
    
    try {
        // Faz requisição para API do Valorant
        const response = await fetch('https://valorant-api.com/v1/agents/');
        // Converte resposta para JSON
        const data = await response.json();
        // Filtra apenas agentes jogáveis
        const allAgents = data.data.filter(agent => agent.isPlayableCharacter);
        
        // Filtra agentes que correspondem ao termo de busca
        // Busca por nome do agente ou função
        const filteredAgents = allAgents.filter(agent => 
            agent.displayName.toLowerCase().includes(searchTerm) ||
            agent.role.displayName.toLowerCase().includes(searchTerm)
        );
        
        // Salva resultados na variável global
        currentAgents = filteredAgents;
        // Exibe os agentes encontrados
        displayAgents(filteredAgents);
    } catch (error) {
        // Trata erros de requisição
        console.error('Erro ao carregar agentes:', error);
    }
}

// Requisito 5: Função para exibir imagens e informações da API
// Requisito 8: Utiliza Flexbox através das classes Bootstrap
function displayAgents(agents) {
    // Obtém container onde serão exibidos os cards
    const container = document.getElementById('agentsContainer');
    // Limpa conteúdo anterior
    container.innerHTML = '';
    
    // Itera sobre cada agente para criar seu card
    agents.forEach(agent => {
        // Verifica se agente está nos favoritos
        const isFavorited = favorites.includes(agent.uuid);
        
        // Cria HTML do card do agente usando template literals
        const agentCard = `
            <div class="col-md-6 col-lg-4 mx-auto">
                <div class="card agent-card position-relative" onclick="viewAgentDetails('${agent.uuid}')">
                    <!-- Requisito 5: Imagem do agente da API -->
                    <img src="${agent.displayIcon}" class="agent-image" alt="${agent.displayName}">
                    
                    <!-- Requisito 6: Botão para favoritar/desfavoritar -->
                    <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" onclick="event.stopPropagation(); toggleFavorite('${agent.uuid}')">
                        ${isFavorited ? '❤️' : '🤍'}
                    </button>
                    
                    <!-- Requisito 8: Card body usando flexbox -->
                    <div class="card-body">
                        <h5 class="card-title">${agent.displayName}</h5>
                        <p class="card-text">${agent.role.displayName}</p>
                        <small class="text-muted">${agent.description.substring(0, 100)}...</small>
                    </div>
                </div>
            </div>
        `;
        // Adiciona card ao container
        container.innerHTML += agentCard;
    });
}

// Requisito 6: Função para favoritar/desfavoritar itens pesquisados
function toggleFavorite(agentId) {
    // Procura índice do agente no array de favoritos
    const index = favorites.indexOf(agentId);
    // Verifica se já está favoritado
    const isFavorited = index > -1;
    
    // Se já está favoritado, remove dos favoritos
    if (isFavorited) {
        favorites.splice(index, 1);
    } else {
        // Se não está favoritado, adiciona aos favoritos
        favorites.push(agentId);
    }
    
    // Salva alterações no localStorage para persistência
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Atualizar apenas o botão clicado (sem recarregar página)
    const button = event.target;
    if (isFavorited) {
        // Remove classe e muda ícone para não favoritado
        button.classList.remove('favorited');
        button.textContent = '🤍';
    } else {
        // Adiciona classe e muda ícone para favoritado
        button.classList.add('favorited');
        button.textContent = '❤️';
    }
}

// Requisito 7: Função para visualizar todos os itens favoritos
async function showFavorites() {
    // Obtém referências dos containers e botão
    const agentsContainer = document.getElementById('agentsContainer');
    const favoritesContainer = document.getElementById('favoritesContainer');
    const favoritesBtn = document.getElementById('favoritesBtn');
    
    // Verifica se está mostrando favoritos ou busca normal
    if (favoritesContainer.style.display === 'none') {
        // Alternar para mostrar favoritos
        agentsContainer.style.display = 'none';
        favoritesContainer.style.display = 'flex';
        favoritesBtn.textContent = 'Voltar para Home';
        
        // Verifica se há favoritos salvos
        if (favorites.length === 0) {
            // Exibe mensagem quando não há favoritos
            favoritesContainer.innerHTML = '<div class="col-12 text-center text-white"><h3>Nenhum favorito encontrado</h3></div>';
        } else {
            try {
                // Busca dados atualizados da API
                const response = await fetch('https://valorant-api.com/v1/agents/');
                const data = await response.json();
                const allAgents = data.data.filter(agent => agent.isPlayableCharacter);
                
                // Filtra apenas agentes que estão nos favoritos
                const favoriteAgents = allAgents.filter(agent => favorites.includes(agent.uuid));
                
                // Limpa container e adiciona cards dos favoritos
                favoritesContainer.innerHTML = '';
                favoriteAgents.forEach(agent => {
                    // Cria card similar ao da busca, mas sempre favoritado
                    const agentCard = `
                        <div class="col-md-4 col-lg-3">
                            <div class="card agent-card position-relative" onclick="viewAgentDetails('${agent.uuid}')">
                                <img src="${agent.displayIcon}" class="agent-image" alt="${agent.displayName}">
                                <button class="favorite-btn favorited" onclick="event.stopPropagation(); toggleFavorite('${agent.uuid}')">
                                    ❤️
                                </button>
                                <div class="card-body">
                                    <h5 class="card-title">${agent.displayName}</h5>
                                    <p class="card-text">${agent.role.displayName}</p>
                                    <small class="text-muted">${agent.description.substring(0, 100)}...</small>
                                </div>
                            </div>
                        </div>
                    `;
                    favoritesContainer.innerHTML += agentCard;
                });
            } catch (error) {
                // Trata erros ao carregar favoritos
                console.error('Erro ao carregar favoritos:', error);
            }
        }
    } else {
        // Voltar para tela de busca
        agentsContainer.style.display = 'flex';
        favoritesContainer.style.display = 'none';
        favoritesBtn.textContent = 'Favoritos';
        // Restaura resultados da última busca
        displayAgents(currentAgents);
    }
}

// Função para navegar para página de detalhes do agente
// Redireciona para página específica com ID do agente como parâmetro
function viewAgentDetails(agentId) {
    // Usa template literal para construir URL com parâmetro
    window.location.href = `agent-details.html?id=${agentId}`;
}
