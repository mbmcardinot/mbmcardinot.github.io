const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const detailButtons = document.querySelectorAll('.details-toggle');
const backToTop = document.getElementById('backToTop');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });

    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');

    projectCards.forEach((card) => {
      const categories = card.dataset.category || '';
      const shouldShow = filter === 'all' || categories.includes(filter);
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

detailButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const details = button.nextElementSibling;
    const isOpen = details.classList.toggle('open');
    button.textContent = isOpen ? 'Hide details' : 'More details';
  });
});

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 600);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
