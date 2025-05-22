document.addEventListener('DOMContentLoaded', function() {
  fetch('nav.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelector(`a[href="${currentPage}"]`)?.classList.add('active');
    });
});