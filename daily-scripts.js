document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const wallpaperImage = document.getElementById('wallpaperImage');
    const downloadButton = document.getElementById('downloadButton');
    const wallpaperResult = document.getElementById('wallpaperResult');

    generateButton.addEventListener('click', generateRandomWallpaper);

    function generateRandomWallpaper() {
        const form = document.getElementById('wallpaperForm');
        const selectedType = form.wallpaperType.value;

        let url;
        if (selectedType === 'fengjing') {
            url = 'https://api.fuchenboke.cn/api/fengjing.php';
        } else if (selectedType === 'dongman') {
            url = 'https://api.fuchenboke.cn/api/dongman.php';
        } else {
            alert('无效的壁纸类型');
            return;
        }

        fetch(url)
        .then(response => response.url)
        .then(imageUrl => {
            wallpaperImage.src = imageUrl;
            wallpaperImage.style.display = 'block';
            downloadButton.style.display = 'block';
            wallpaperResult.style.textAlign = 'center';
        })
        .catch(error => {
            console.error('Error fetching wallpaper:', error);
            alert('生成壁纸失败，请检查网络连接或重试');
        });
    }

    function downloadImage() {
        const imageUrl = wallpaperImage.src;
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = 'wallpaper.jpg';
        a.click();
    }
});
