function resizeImage(url, size) {
    if (!url) {
        return;
    }
    let matches = url.match("[0-9]+px");
    if (matches) {
        if (size) {
            url = url.replace(matches[0], size + "px");
        } else {
            url = url.replace(matches[0], "500px");
        }
    }
    return url;

}

function getWikiArticle() {
    let url = SERVICEURL;
    var params = {
        origin: "*",
        action: "parse",
        prop: "text",
        page: $("#title").text(),
        format: "json",
    };
    Object.keys(params).forEach(function(key) { url += "&" + key + "=" + params[key]; });
    fetch(url)
        .then(function(response) { return response.json() })
        .then(function(response) {
            if (response.error == undefined) {
                response.parse.text["*"].divide();
            } else {
                showError(response.error.info)
            }
        })
        .catch(function(error) { showError(error); });
}

function listArticles(fun) {
    let url = SERVICEURL;
    var params = {
        origin: "*",
        action: "opensearch",
        search: $("#mainInput").val(),
        format: "json"
    };
    Object.keys(params).forEach(function(key) { url += "&" + key + "=" + params[key]; });
    fetch(url)
        .then(function(response) { return response.json() })
        .then(function(response) {
            fun(response[1]);
        })
        .catch(function(error) {});
}

function listFullArticles(fun) {
    let url = SERVICEURL;
    var params = {
        origin: "*",
        action: "query",
        list: "search",
        srsearch: $("#mainInput").val(),
        format: "json"
    };
    Object.keys(params).forEach(function(key) { url += "&" + key + "=" + params[key]; });
    fetch(url)
        .then(function(response) { return response.json() })
        .then(function(response) {
            fun(response.query.search)
        })
        .catch(function(error) { console.log(error); });
}