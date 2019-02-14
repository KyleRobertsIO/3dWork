function rgbRandom() {
    var hue = 'rgb(' + (Math.floor(Math.random() * 256))
        + ',' + (Math.floor(Math.random() * 256))
        + ',' + (Math.floor(Math.random() * 256)) + ')';
    return hue;
}