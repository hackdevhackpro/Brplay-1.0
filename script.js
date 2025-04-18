document.addEventListener('DOMContentLoaded', () => {
  // Optionally, set dark mode based on user preference
});

function toggleList(id) {
  document.getElementById(id).classList.toggle('active');
}

function searchChannel() {
  const query = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.channel-list li').forEach(li => {
    const text = li.textContent.toLowerCase();
    li.style.display = text.includes(query) ? '' : 'none';
  });
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
