const searchInput = document.querySelector('.blog-search');
const posts = document.querySelectorAll('#blog-list li');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    posts.forEach(post => {
        const title = post.querySelector('strong').textContent.toLowerCase();
        const content = post.textContent.toLowerCase();
        if (title.includes(query) || content.includes(query)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });

    updatePaginationAfterSearch();
});

function updatePaginationAfterSearch() {
    const visiblePosts = Array.from(posts).filter(p => p.style.display !== 'none');
    const postsPerPage = 3; // или возьми из blogScript.js
    const pagination = document.getElementById('blogScript');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(visiblePosts.length / postsPerPage);
    if(totalPages === 0) return;

    let currentPage = 1;
    function showPage(page) {
        currentPage = page;
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;

        visiblePosts.forEach((post, index) => {
            post.style.display = index >= start && index < end ? 'block' : 'none';
        });

        paginationButtons();
    }

    function paginationButtons() {
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            btn.classList.toggle('active', i === currentPage);
            btn.addEventListener('click', () => showPage(i));
            pagination.appendChild(btn);
        }
    }

    showPage(1);
}
