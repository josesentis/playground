(function() {
    const preloadImages = () => {
        return new Promise((resolve, reject) => {
            imagesLoaded(document.querySelectorAll('img'), resolve);
        });
    };

    preloadImages().then(() => {
        // Remove the loader
        document.body.classList.remove('loading');
        const effect = new RGBDistortion();
    });
})();