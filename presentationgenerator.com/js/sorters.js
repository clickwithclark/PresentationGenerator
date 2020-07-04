let headers;
//IMAGES IF NOTHING IS FOUND, BUT LAYOUT WAS ALREADY SET FOR IMAGES
let reserveImages = [];
let imagesWaiting = [];
let imagesUsed = [];
let reserveIndex = 0;
let imageIndex = 0;

let urlToHeightWidth = new Map();

let slideDelay = 0;

let currentPercent = 0;
let text;

String.prototype.createPresentation = function() {
    //HEADER = KEY, TEXT = VALUE [JQUERY DOM OBJECTS, NOT PLAIN TEXT]
    let texts2headers = new Map();

    //CONVERTION TO NORMAL STRING 
    let htmltext = "" + this;
    let html = sortHtml(htmltext);

    headers = $(html).find("h1, h2, h3, h4, h5, h6");

    ultolist(html);

    if ($(html).find(".redirectMsg").length) {
        window.location.replace(document.location.origin + "/" + $($(html).find(".redirectText a[title]")[0]).attr("title").replace(" ", "_"))
    }
    //ADD IMAGES FROM MAIN TABLE IN WIKI ARTICLE
    $.each($(htmltext).find(".infobox a.image img"), function(i, img) {
        if (previewNotUpdated) {
            updatePreview(globalUrl($(img).attr("src")));
        }
        reserveImages.push(globalUrl($(img).attr("src")))
    })

    //GET HEADERS TO DIVIDE

    //DIVIDE HTML BY HEADERS INTO SLIDES
    let firstParInserted = false;
    for (i = 0; i < headers.length; i++) {
        if (!firstParInserted) {
            texts2headers.set($("h1"), $(html).find("p:first:not(:empty)"));
            firstParInserted = true;
        }
        texts2headers.set(headers[i], $(headers[i]).nextUntil(headers[i + 1]));
    }

    if (texts2headers.size == 0) {
        //NO HEADERS, NO TEXTS => CANT MAKE PRESENTATION
        showArticle($(html));
    } else {
        //START MAIN PROCESS
        finalCreation(texts2headers);
    }
}

let lis, el;
let endings = [",", ";", "."]

function ultolist(html) {
    let uls = $(html).find("ul, ol").not(".gallery");
    $.each(uls, function(i, ul) {
        let lis = $(ul).find("li");
        let addon;
        for (i = 0; i < lis.length - 1; i++) {
            el = $(lis).eq(i);
            let liText = $(el).text().trim();
            if (endings.includes(liText.slice(-1))) {
                addon = " "
            } else {
                addon = ", "
            }
            $(el).append(`<span>${addon}</span>`)
        }
    })
}

function galleryRequest(slideIndex, galleryHtml, headtext) {
    let galleryRequests = [];
    let lisG = $.grep($(galleryHtml).find("li"), function(el, i) {
        return checkURL($(el).find("img").attr("src"));
    });

    let margin = 10;
    slidesAmount = Math.ceil(lisG.length / 4);
    slideDelay = slidesAmount;
    let x = 0;
    let lisRow, margintop;
    let firstSlide = true;
    while (slidesAmount-- > 0) {
        if (firstSlide) {
            galleryRequests.push({
                "createSlide": {
                    "objectId": "presgen" + slideIndex,
                    "insertionIndex": slideIndex,
                    "slideLayoutReference": {
                        "predefinedLayout": "TITLE_AND_BODY"
                    },
                    "placeholderIdMappings": [{
                        "layoutPlaceholder": {
                            "type": "TITLE",
                            "index": 0
                        },
                        "objectId": "header" + slideIndex,
                    }]
                },
            }, {
                "insertText": {
                    "objectId": "header" + slideIndex,
                    "text": headtext,
                }
            })
            firstSlide = false;
            margintop = 90;
        } else {
            galleryRequests.push({
                "createSlide": {
                    "objectId": "presgen" + slideIndex,
                    "insertionIndex": slideIndex,
                    "slideLayoutReference": {
                        "predefinedLayout": "BLANK"
                    }
                },
            })
            margintop = 10;
        }

        if (headtext.length > 42)
            galleryRequests.push({
                "updatePageElementTransform": {
                    "objectId": headingID,
                    "transform": {
                        "scaleX": 1,
                        "scaleY": 1,
                        translateY: -15,
                        unit: 'PT'
                    },
                    "applyMode": "RELATIVE"
                }
            })

        lisRow = lisG.slice(x * 4, x * 4 + 4);
        if (slidesAmount == 0) {
            lisRow = lisG.slice(x * 4, lisG.length);
        }
        x++;

        for (i = 0; i < lisRow.length; i++) {
            //CREATE SLIDE EVERY 4 IMAGES
            width = (720 - margin * (lisRow.length + 1)) / lisRow.length;
            let imgObject = $(lisRow[i]).find("img");
            height = $(imgObject).attr("height") / $(imgObject).attr("width") * width;
            if (height > 340) {
                height = 320;
                width = $(imgObject).attr("width") / $(imgObject).attr("height") * height;
            }
            if (lisRow.length == 1) {
                height = 320;
                width = $(imgObject).attr("width") / $(imgObject).attr("height") * height;
            }
            galleryRequests.push([
                createImageJSON("imageG" + slideIndex + i,
                    resizeImage($(imgObject).attr("src")),
                    "presgen" + slideIndex,
                    height, width, margintop,
                    (margin + width) * i + margin, 1, 1), {
                    "createShape": {
                        "objectId": "desc" + slideIndex + i,
                        "elementProperties": {
                            "pageObjectId": "presgen" + slideIndex,
                            "size": {
                                height: {
                                    magnitude: 60,
                                    unit: 'PT'
                                },
                                width: {
                                    magnitude: width,
                                    unit: 'PT'
                                }
                            },
                            transform: {
                                scaleX: 1,
                                scaleY: 1,
                                translateX: (margin + width) * i + margin,
                                translateY: margintop + height,
                                unit: 'PT'
                            }
                        },
                        shapeType: "TEXT_BOX"
                    }
                }, {
                    insertText: {
                        "objectId": "desc" + slideIndex + i,
                        "text": $(lisG[i]).find(".gallerytext").text().trim(),
                    }
                }
            ])
        }
        slideIndex++;
    }
    return galleryRequests;
}