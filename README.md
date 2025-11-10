# Valorant Wiki - Projeto Web 1

## Estrutura do Projeto

```
Projeto Web 1 - Valorant Wiki/
├── index.html              # Página de login principal
├── css/
│   └── style.css           # Estilos CSS da aplicação
├── js/
│   ├── login.js           # Lógica da página de login
│   ├── home.js            # Lógica da página home
│   ├── agent-details.js   # Lógica da página de detalhes
│   └── image-mapper.js    # Mapeamento de imagens locais
├── pages/
│   ├── home.html          # Página principal com busca
│   └── agent-details.html # Página de detalhes do agente
├── data/
│   └── valorant.json      # Dados dos agentes do Valorant
├── images/                # Pasta com imagens baixadas da API
│   ├── agents/           # 170+ imagens dos agentes e habilidades
│   ├── default-agent.png # Imagem padrão para agentes
│   ├── default-portrait.png # Imagem padrão para retratos
│   └── default-ability.png # Imagem padrão para habilidades
└── README.md             # Este arquivo
```

## Funcionalidades

1. **Tela de Login** - DIV centralizado com transparência
2. **Busca de Agentes** - Sistema de busca em dados locais
3. **Exibição de Imagens** - Cards responsivos com imagens
4. **Sistema de Favoritos** - Favoritar/desfavoritar agentes
5. **Visualização de Favoritos** - Lista de itens favoritados
6. **Flexbox Layout** - Layout responsivo com Bootstrap
7. **Página de Detalhes** - Informações completas do agente

## Como Usar

1. Abra `index.html` no navegador
2. Faça login (qualquer usuário/senha)
3. Use a busca para encontrar agentes
4. Clique nos corações para favoritar
5. Use o botão "Favoritos" para ver salvos
6. Clique nos cards para ver detalhes

## Tecnologias

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (ES6+)
- Bootstrap 5
- LocalStorage para persistência