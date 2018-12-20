export const preload = (urls, cb) => {
  let loadedCounter = 0;

  const preloadImage = (url, anImageLoadedCallback) => {
    var img = new Image();
    img.src = url;
    img.onload = anImageLoadedCallback;
  };

  urls.forEach(function(url) {
    preloadImage(url, () => {
      loadedCounter += 1;

      if (loadedCounter === urls.length) {
        cb();
      }
    });
  });
};
