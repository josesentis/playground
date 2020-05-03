(function() {
    const preloadImages = () => {
        return new Promise((resolve, reject) => {
            imagesLoaded(document.querySelectorAll('img'), resolve);
        });
    };

    preloadImages().then(() => {
        document.body.classList.remove('loading');
        const effect = new ImageCurve();
    });
})();