function startPresentationGeneration() {
    $(".progress").fadeIn()
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
                response.parse.text["*"].createPresentation();
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
        .catch(function(error) { console.log(error); });
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