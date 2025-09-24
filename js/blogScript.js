document.addEventListener('DOMContentLoaded', function() {

    const searchInput = document.querySelector('.blog-search');
    const blogList = document.getElementById('blog-list');
    const pagination = document.getElementById('pagination');

    if (!searchInput || !blogList || !pagination) return;

    // Берем только прямых детей <li> в #blog-list
    const allPosts = Array.from(blogList.children).filter(el => el.tagName === 'LI');

    console.log('Найдено постов:', allPosts.length);

    const postsPerPage = 3;
    let filteredPosts = [...allPosts];
    let currentPage = 1;

    const noResults = document.createElement('p');
    noResults.textContent = 'Ничего не найдено';
    noResults.style.display = 'none';
    noResults.style.textAlign = 'center';
    noResults.style.color = '#666';
    noResults.style.fontSize = '18px';
    noResults.style.margin = '20px 0';
    blogList.after(noResults);

    function showPage(page) {
        currentPage = page;
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;

        allPosts.forEach(post => post.style.display = 'none');

        if (filteredPosts.length === 0) {
            noResults.style.display = 'block';
            pagination.innerHTML = '';
            return;
        } else {
            noResults.style.display = 'none';
        }

        const postsToShow = filteredPosts.slice(start, end);
        postsToShow.forEach(post => post.style.display = 'block');

        updatePagination();
    }

    function updatePagination() {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            if (i === currentPage) btn.classList.add('active');
            btn.addEventListener('click', () => showPage(i));
            pagination.appendChild(btn);
        }
    }

    function filterPosts(query) {
        const term = query.toLowerCase().trim();
        if (!term) {
            filteredPosts = [...allPosts];
            return;
        }

        filteredPosts = allPosts.filter(post => {
            const title = post.querySelector('strong')?.textContent?.toLowerCase() || '';
            const text = post.textContent?.toLowerCase() || '';
            return title.includes(term) || text.includes(term);
        });
    }

    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterPosts(this.value);
            showPage(1);
        }, 300);
    });

    showPage(1);
    console.log('Blog script инициализирован');
});
