const checkSession = async () => {
  try {
    const response = await fetch('/api/admin/me', { credentials: 'include' });
    if (!response.ok) {
      window.location.href = '/admin';
      return;
    }

    const { user } = await response.json();
    document.body.dataset.user = user.username;
  } catch {
    window.location.href = '/admin';
  }
};

const loadDashboard = async () => {
  try {
    const response = await fetch('/api/admin/analytics', { credentials: 'include' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Erro ao carregar dashboard');
    document.getElementById('totalProducts').textContent = data.summary.totalProducts || 0;
    document.getElementById('totalClicks').textContent = data.summary.totalClicks || 0;
    document.getElementById('publishedProducts').textContent = data.summary.publishedProducts || 0;
  } catch (error) {
    console.error(error);
  }
};

checkSession();
loadDashboard();
