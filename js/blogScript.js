// =====================
// Blog Search + Pagination
// =====================

const searchInput = document.querySelector('.blog-search');
const allPosts = Array.from(document.querySelectorAll('#blog-list li'));
const pagination = document.getElementById('pagination');
const postsPerPage = 3;

let filteredPosts = [...allPosts];
let currentPage = 1;

function showPage(page) {
    currentPage = page;
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;

    allPosts.forEach(post => post.style.display = 'none');

    filteredPosts.slice(start, end).forEach(post => {
        post.style.display = 'block';
    });

    updatePaginationButtons();
}

function updatePaginationButtons() {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    if (totalPages === 0) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.toggle('active', i === currentPage);
        btn.addEventListener('click', () => showPage(i));
        pagination.appendChild(btn);
    }
}

function filterPosts(query) {
    filteredPosts = allPosts.filter(post => {
        const title = post.querySelector('strong').textContent.toLowerCase();
        const content = post.textContent.toLowerCase();
        return title.includes(query) || content.includes(query);
    });
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    filterPosts(query);
    showPage(1);
});

showPage(1);
