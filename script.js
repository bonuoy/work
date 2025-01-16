document.addEventListener('DOMContentLoaded', function() {
    const searchQueryInput = document.getElementById('searchQuery');
    const wallpaperResults = document.getElementById('wallpaperResults');

    function searchWallpapers() {
        const query = searchQueryInput.value;
        if (query.trim() === '') {
            alert('请输入搜索关键词');
            return;
        }

        const apiKey = 'TXjWQmwYTgjvkAmgasfR0Ndz5fvxccW1pTmxVQ33UVls8KEL3ND2OHvt';
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=20&api_key=${apiKey}`;

        fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        })
        .then(response => response.json())
        .then(data => {
            wallpaperResults.innerHTML = '';
            data.photos.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.src.medium;
                img.style.width = '200px';
                img.style.height = '200px';
                img.style.borderRadius = '5px';
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    downloadImage(photo.src.original);
                });
                wallpaperResults.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching wallpapers:', error));
    }

    function downloadImage(url) {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'wallpaper.jpg';
        a.click();
    }
});
