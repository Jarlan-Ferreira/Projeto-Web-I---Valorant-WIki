/* ===== DADOS DE CONFIGURAÇÃO ===== */
// Objeto para traduzir funções dos agentes para português
const translations = {
    'Duelist': 'Duelista',      // Agentes focados em combate
    'Controller': 'Controlador', // Agentes de controle de área
    'Initiator': 'Iniciador',   // Agentes de iniciação de rounds
    'Sentinel': 'Sentinela'     // Agentes defensivos
};

// Objeto com mapas recomendados para cada agente
// Baseado na efetividade das habilidades em cada mapa
const mapRecommendations = {
    'Jett': ['Bind', 'Split', 'Ascent'],
    'Reyna': ['Dust2', 'Mirage', 'Haven'],
    'Phoenix': ['Split', 'Bind', 'Ascent'],
    'Raze': ['Bind', 'Split', 'Breeze'],
    'Yoru': ['Icebox', 'Breeze', 'Fracture'],
    'Neon': ['Fracture', 'Pearl', 'Lotus'],
    'Sage': ['Icebox', 'Ascent', 'Breeze'],
    'Cypher': ['Split', 'Bind', 'Ascent'],
    'Killjoy': ['Ascent', 'Bind', 'Haven'],
    'Chamber': ['Breeze', 'Icebox', 'Pearl'],
    'Deadlock': ['Lotus', 'Sunset', 'Bind'],
    'Brimstone': ['Bind', 'Split', 'Haven'],
    'Omen': ['Split', 'Bind', 'Ascent'],
    'Viper': ['Breeze', 'Icebox', 'Bind'],
    'Astra': ['Pearl', 'Ascent', 'Haven'],
    'Harbor': ['Pearl', 'Lotus', 'Sunset'],
    'Sova': ['Ascent', 'Breeze', 'Haven'],
    'Breach': ['Fracture', 'Pearl', 'Ascent'],
    'Skye': ['Ascent', 'Breeze', 'Split'],
    'KAY/O': ['Fracture', 'Breeze', 'Ascent'],
    'Fade': ['Pearl', 'Fracture', 'Haven'],
    'Gekko': ['Lotus', 'Sunset', 'Split']
};

/* ===== INICIALIZAÇÃO DA PÁGINA ===== */
// Event listener que executa quando a página carrega completamente
window.addEventListener('load', loadAgentDetails);

/* ===== FUNÇÃO PRINCIPAL DE CARREGAMENTO ===== */
// Função assíncrona para carregar detalhes específicos de um agente
async function loadAgentDetails() {
    // Obtém parâmetros da URL (query string)
    const urlParams = new URLSearchParams(window.location.search);
    // Extrai o ID do agente da URL
    const agentId = urlParams.get('id');
    
    // Se não há ID na URL, redireciona para home
    if (!agentId) {
        window.location.href = 'home.html';
        return;
    }

    try {
        // Carrega dados do arquivo JSON local
        const response = await fetch('../data/valorant.json');
        // Converte resposta para JSON
        const data = await response.json();
        // Encontra o agente específico pelo ID
        const agent = data.data.find(agent => agent.uuid === agentId);
        
        if (agent) {
            // Chama função para exibir os detalhes
            displayAgentDetails(agent);
        } else {
            // Se agente não encontrado, redireciona para home
            window.location.href = 'home.html';
        }
    } catch (error) {
        // Trata erros de carregamento ou parsing
        console.error('Erro ao carregar detalhes do agente:', error);
    }
}

/* ===== FUNÇÃO DE EXIBIÇÃO DOS DETALHES ===== */
// Função para renderizar todos os detalhes do agente na página
function displayAgentDetails(agent) {
    // Obtém container onde serão inseridos os detalhes
    const container = document.getElementById('agentDetails');
    // Traduz a função do agente para português
    const roleTranslated = translations[agent.role.displayName] || agent.role.displayName;
    // Obtém mapas recomendados ou usa padrão
    const recommendedMaps = mapRecommendations[agent.displayName] || ['Ascent', 'Bind', 'Haven'];
    
    // Constrói HTML completo da página usando template literals
    container.innerHTML = `
        <!-- Seção principal com imagem e informações básicas -->
        <div class="row">
            <!-- Coluna da splash art -->
            <div class="col-md-6">
                <img src="../images/agents/${agent.displayName.toLowerCase().replace(/[^a-z0-9]/g, '')}-portrait.png" class="splash-art" alt="${agent.displayName}" onerror="this.src='../images/default-portrait.png'">
            </div>
            <!-- Coluna das informações -->
            <div class="col-md-6">
                <h1 class="mb-3">${agent.displayName}</h1>
                <h4 class="text-danger mb-3">${roleTranslated}</h4>
                <p class="lead">${agent.description}</p>
                
                <!-- Seção de mapas recomendados -->
                <h5 class="mt-4 mb-3">Mapas Recomendados:</h5>
                <div class="d-flex flex-wrap gap-2">
                    ${recommendedMaps.map(map => `<span class="badge bg-danger fs-6">${map}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <!-- Seção das habilidades -->
        <div class="row mt-5">
            <div class="col-12">
                <h3 class="mb-4">Habilidades</h3>
                <div class="row">
                    <!-- Itera sobre cada habilidade do agente -->
                    ${agent.abilities.map(ability => `
                        <div class="col-md-6 col-lg-3 mb-3">
                            <div class="ability-card">
                                <!-- Cabeçalho da habilidade com ícone e nome -->
                                <div class="d-flex align-items-center mb-2">
                                    <img src="../images/agents/${agent.displayName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${ability.displayName.toLowerCase().replace(/[^a-z0-9]/g, '')}.png" class="ability-icon me-3" alt="${ability.displayName}" onerror="this.src='../images/default-ability.png'">
                                    <h6 class="mb-0">${ability.displayName}</h6>
                                </div>
                                <!-- Descrição da habilidade -->
                                <p class="small">${ability.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}