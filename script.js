document.addEventListener('DOMContentLoaded', function() {
    const searchQueryInput = document.getElementById('searchQuery');
    const wallpaperResults = document.getElementById('wallpaperResults');

    function searchWallpapers() {
        const query = searchQueryInput.value.trim();
        if (query === '') {
            alert('请输入搜索关键词');
            return;
        }

        const apiKey = 'TXjWQmwYTgjvkAmgasfR0Ndz5fvxccW1pTmxVQ33UVls8KEL3ND2OHvt';
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=20`;

        fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        })
        .then(response => {
            if (response.status === 401) {
                throw new Error('Unauthorized: 请检查API密钥是否正确');
            }
            return response.json();
        })
        .then(data => {
            wallpaperResults.innerHTML = '';
            if (data.photos.length === 0) {
                wallpaperResults.innerHTML = '<p class="no-results">暂未收录</p>';
            } else {
                data.photos.forEach(photo => {
                    const img = document.createElement('img');
                    img.src = photo.src.medium;
                    img.style.width = '200px';
                    img.style.height = '200px';
                    img.style.borderRadius = '5px';
                    img.style.cursor = 'pointer';
                    img.addEventListener('click', () => {
                        window.location.href = `display.html?src=${encodeURIComponent(photo.src.original)}`;
                    });
                    wallpaperResults.appendChild(img);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching wallpapers:', error);
            alert('搜索失败，请检查网络连接或搜索关键词');
        });
    }
});
