function extractThumbText(imageObject, v) {
    if ($(v).find(imageObject).parents(".trow").length) {
        return $(v).find(imageObject).parents(".trow").find(".thumbcaption").text();
    } else {
        return $(v).find(imageObject).parents(".thumbinner").find(".thumbcaption").text();
    }
}
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
let pxperrow = 12;

function textHeight(length) {
    return Math.ceil(length / charperrow) * pxperrow;
}