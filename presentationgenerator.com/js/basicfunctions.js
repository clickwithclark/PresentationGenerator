//ADJUST TEXT TO TEXTBOX IN GOOGLE SLIDES
function extract(v, layout) {
    let text = $(v).clone().find(".thumbcaption").remove().end().text().trim().replace(/\r?\n/g, "");
    if (!text || text.length == 0) {
        return "";
    }

    let parSize = 550;
    if (layout == 1) {
        parSize = 410;
    }
    if (text.length > parSize) {
        let arr = text.substring(0, parSize).match(/\(?[^\.\?\!\;]+[\.!;\?]\)?/g);
        if (!arr) {
            return text.substring(0, parSize);
        }
        let newText = "";
        arr.forEach(el => newText += el.trim() + " ");
        return newText;
    } else {
        return text;
    }
}

//BASIC SORTING
function sortHtml(html) {
    html = html.split("//upload").join("https://upload");
    html = html.split(`src="/`).join(`src="${WIKIURL}`);
    html = $(html).find(".mw-editsection, .metadata, .box-More_citations_needed, .reference, div[role='note'], .noprint, table, style, div[role='navigation'], div[videopayload], .hatnote").remove().end();
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

function globalUrl(url) {
    if (url.indexOf("//upload") >= 0) {
        url = url.replace("//upload", "https://upload")
    } else if (url.charAt(0) == "/") {
        url = WIKIURL + url.substring(1);
    }
    return resizeImage(url);
}

function extractThumbText(imageObject, v) {

    if ($(v).find(imageObject).parents(".trow").length) {
        return $(v).find(imageObject).parents(".trow").find(".thumbcaption").text();
    } else {
        return $(v).find(imageObject).parents(".thumbinner").find(".thumbcaption").text();
    }
}

function showArticle(html) {
    $.each($(html).find("a"), function(i, val) {
        $(val).attr("href", "../" + $(val).attr("title").split(" ").join("_"))
    })
    $(".main").empty().append($(html));
}

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