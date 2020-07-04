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

function updatePreview(url) {
    url = resizeImage(url);
    if (checkURL(url)) {
        $(".pres-preview img").attr("src", url);
        $.ajax({
            url: "db.php?",
            data: "title=" + $("#title").text().split("_").join(" ") + "&thumb_url=" + url,
            type: "POST"
        });
        previewNotUpdated = false;
    }

}

window.addEventListener('offline', function(e) {
    $("h1").hide();
    $(".google, .progress").hide();
    $(".error").show();
    $(".error .lead").text(translation.get("nointernet"));
}, false);