const loginForm = document.getElementById('adminLoginForm');
const message = document.getElementById('adminMessage');

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const payload = {
    username: formData.get('username'),
    password: formData.get('password')
  };

  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Login inválido.');
    }

    message.textContent = 'Login realizado com sucesso.';
    message.className = 'status-text success';
    setTimeout(() => {
      window.location.href = '/admin/dashboard.html';
    }, 600);
  } catch (error) {
    message.textContent = error.message || 'Falha ao entrar.';
    message.className = 'status-text error';
  }
});
