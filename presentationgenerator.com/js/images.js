//Check for right format
function checkURL(url) {
    if (url &&
        url.substr(url.lastIndexOf('.') + 1).length < 5 &&
        url.substr(url.lastIndexOf('.') + 1).length > 0 &&
        url.indexOf(".svg") == -1 &&
        !imagesUsed.includes(url)
    ) {
        return true;
    }
    return false;
}

function globalUrl(url) {
    if (url.indexOf("//upload") >= 0) {
        url = url.replace("//upload", "https://upload")
    } else if (url.charAt(0) == "/") {
        url = WIKIURL + url.substring(1);
    }
    return resizeImage(url);
}