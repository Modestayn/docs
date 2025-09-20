const openBtn = document.querySelector('[data-action="accordion"]');
const closeBtn = document.querySelector('[data-action="accordion-close"]');
const answer = document.querySelector('.answer');

openBtn.addEventListener('click', () => {
    answer.style.display = 'block';
    openBtn.style.display = 'none';
})
closeBtn.addEventListener('click', () => {
    answer.style.display = 'none';
    openBtn.style.display = 'block';
})