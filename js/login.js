// Requisito 2: Redirecionamento para página Home após login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = 'pages/home.html';
});