//BASIC SORTING
function sortHtml(html) {
    html = html.split("//upload").join("https://upload");
    html = html.split(`src="/`).join(`src="${WIKIURL}`);
    html = $(html).find(".mw-editsection, .metadata, .box-More_citations_needed, .reference, div[role='note'], .noprint, table, style, div[role='navigation'], div[videopayload], .hatnote, .mw-empty-elt").remove().end();
    let children = $(html).children();
    let headers = $(html).find("h1, h2, h3, h4, h5, h6");

    $.each(headers, function(i, header) {
        if (toRemove.includes($(header).find(".mw-headline").text())) {
            if ($(children).index(header) > 0) {
                children = children.slice(0, $(children).index(header));
            }
        }
    })
    $(html).empty().append(children);
    return $(html)
}

function resizeImage(url, size) {
    if (!url) {
        return;
    }
    let matches = url.match("[0-9]+px");
    if (matches) {
        if (size) {
            url = url.replace(matches[0], parseInt(size, 10) + "px");
        } else {
            url = url.replace(matches[0], "500px");
        }
    }
    return url;

}

function showArticle(html) {
    $.each($(html).find("a"), function(i, val) {
        $(val).attr("href", "../" + $(val).attr("title").split(" ").join("_"))
    })
    $(".main").empty().append($(html));
}


function showError(message) {
    let error = $(".error");
    $(".main").empty().append(error);
    $(".error").show();
    if (!navigator.onLine) {
        $(".error .lead").text(translation.get("nointernet"));
    } else {
        $(".error .lead").text(message);
    }
}
let previewNotUpdated = true;



function updatePreview(url, imgCof) {
    url = resizeImage(url);
    $(".hor-img").attr("src", url)
    if (imgCof > 1 && $(window).width() > 575) {
        $(".hor-img").hide()
        $(".vert-img").attr("src", url)
        $(".vert-img").show()
        $(".content").addClass("vertical-content")
    }

    $.ajax({
        url: "db.php?",
        data: "title=" + $("#title").text().split("_").join(" ") + "&thumb_url=" + url,
        type: "POST"
    });
    previewNotUpdated = false;
}
if ($(".hor-img").attr("src")) {
    var imgCof = $(".hor-img").height() / $(".hor-img").width()
    if (imgCof > 1 && $(window).width() > 575) {
        $(".hor-img").hide()
        $(".vert-img").show()
        $(".vert-img").attr("src", resizeImage(
            $(".vert-img").attr("src"),
            $(".vert-img").width()
        ))
        $(".content").addClass("vertical-content")
    } else {
        $(".hor-img").attr("src", resizeImage(
            $(".hor-img").attr("src"),
            $(".hor-img").width()
        ))
    }
}

var linksArray = []

function updateLinks(id) {
    linksArray = [
        "https://docs.google.com/feeds/download/presentations/Export?id=" + id + "&exportFormat=pptx",
        "https://docs.google.com/presentation/d/" + id,
        "https://docs.google.com/feeds/download/presentations/Export?id=" + id + "&exportFormat=pdf",
        "https://docs.google.com/feeds/download/presentations/Export?id=" + id + "&exportFormat=txt",
        "https://docs.google.com/feeds/download/presentations/Export?id=" + id + "&exportFormat=odp",
    ]

    for (i = 0; i < linksArray.length; i++) {
        var link = ".link" + i
        $(link).attr({
            "href": linksArray[i]
        })
    }
    $(".link1").attr("target", "_blank")
    $("#openModal").attr({
        "data-target": "#emailModal",
        "data-toggle": "modal"
    })
    if (fileToDownload == 1) {
        window.open(linksArray[fileToDownload], "_blank")
    } else if (fileToDownload == 5) {
        $("#emailModal").modal("show")
    } else {
        window.location.href = linksArray[fileToDownload]
    }
}

window.addEventListener('offline', function(e) {
    $("h1").hide();
    $(".google, .progress").hide();
    $(".error").show();
    $(".error .lead").text(translation.get("nointernet"));
}, false);