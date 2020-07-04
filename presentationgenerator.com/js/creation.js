let imagePercent;
let PRESENTATION_ID;
let ImageCount; //size of imageMatrix (images taken from other artciles)
let headingID, slideID, layoutType, currentImg, currentText, imageCof, headingText;
let longheaders = [];

function finalCreation(map) {
    let title = $("title").text();
    gapi.client.slides.presentations.create({
        title: title
    }).then((response) => {
        pushProgress(10);
        PRESENTATION_ID = response.result.presentationId;
        updateFirstSlide();
        let slideOrder = 1;
        let requests = [];
        let imageMatrix = []; //for images from other articles
        for (let [head, v] of map) {
            slideID = "presgen" + slideOrder;
            headingID = "header" + slideOrder;
            headingText = $(head).text() + "";
            textID = "text" + slideOrder;
            let ifcont = false;
            $.each(v, function(_, el) {
                if ($(el).find(".gallery").length || $(el).hasClass("gallery")) {
                    let array = $(el).find(".gallery");
                    if ($(el).hasClass("gallery")) {
                        array.push(el);
                    }
                    $.each(array, function(_, gallery) {
                        requests.push(galleryRequest(slideOrder, gallery, $(head).text()))
                        slideOrder += slideDelay;
                    })
                    ifcont = true;
                }
            })
            if (ifcont) {
                continue;
            }
            layoutType = getLayout(v);
            requests.push({
                "createSlide": {
                    "objectId": slideID,
                    "insertionIndex": slideOrder,
                    "slideLayoutReference": {
                        "predefinedLayout": layoutType
                    },
                    "placeholderIdMappings": [{
                        "layoutPlaceholder": {
                            "type": "TITLE",
                            "index": 0
                        },
                        "objectId": headingID,
                    }]
                },
            }, {
                "insertText": {
                    "objectId": headingID,
                    "text": headingText,
                }
            });
            slideOrder++;

            if (headingText.length > charperrowH) {
                requests.push({
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
                longheaders.push(slideID);
            } else if (headingText.length > smallHeaderLength) {
                longheaders.push(slideID);
            }
            // longheaders.push(slideID);
            // } else if (headingText.length > smallHeaderLength) {
            //     // longheaders.push(slideID);
            // }
            //2 TYPES OF IMAGES USED IN THE PRESENTATION:
            //1. IMAGES DIRECTLY FROM THIS ARTICLE, COME IN HTML CODE FROM WIKI
            //2. IMAGES TAKEN FROM OTHER ARTICLES, AS PARAGRAPH CORRSEPONDING TO THE SLIDE DOESN'T INCLUDE IMAGES
            //IF PARAGRAPH LINKS TO OTHER ARTICLES => WE TAKE THEIR IMAGES
            //EXAMPLE: (text from wiki) "JAVASCRIPT IS A PROGRAMMING LANGUAGE" WHERE "PROGRAMMING LANGUAGE" IS A LINK TO ANOTHER WIKI ARTCILE CALLED "PROGRAMMING LANGUAGE"
            //WE SET IMAGES OF 2 TYPE AFTER PRESENTATION WAS CREATED, THAT WHY WE PUT INFO INTO imageMatrix TO EXECUTE REQUEST AFTERWARDS
            if (layoutType == "TITLE_AND_TWO_COLUMNS") { //paste images
                let arrayImages = $(v).find("a.image img");
                let firstGo = true;
                if (arrayImages.length > 0) {
                    //PARAGRAPH HAS IMAGES
                    for (i = 0; i < arrayImages.length; i++) {
                        currentImg = resizeImage($(arrayImages[i]).attr('src'));
                        currentText = extractThumbText(arrayImages[i], v);
                        imageCof = $(arrayImages[i]).attr('height') / $(arrayImages[i]).attr('width');

                        if (checkURL(currentImg)) {
                            //Add first image to slide, other - reserve
                            if (firstGo) {
                                url2Text2Cof.set(currentImg, [currentText, imageCof])
                                requests.push(imageRequest(slideID, currentImg));
                                firstGo = false;
                            } else {
                                url2Text2Cof.set(currentImg, [currentText, imageCof])
                                reserveImages.push(currentImg);
                            }
                        } else {
                            if (i == arrayImages.length - 1) {
                                imageMatrix.push([slideID, $(v).find("a[title]")])
                            } else {
                                continue;
                            }
                        }
                    }
                } else {
                    imageMatrix.push([slideID, $(v).find("a[title]")])
                }
                requests.find(element => element["createSlide"] && element["createSlide"]["objectId"] == slideID)["createSlide"]["placeholderIdMappings"]
                    .push({
                        "layoutPlaceholder": {
                            "type": "BODY",
                            "index": 1
                        },
                        "objectId": slideID + "d",
                    })

            }

            if (layoutType != "SECTION_HEADER") { //paste text
                if (layoutType == "TITLE_AND_TWO_COLUMNS") {
                    requests.push({
                        "insertText": {
                            "objectId": textID,
                            "text": extract(v, 0).trim()
                        }
                    })
                } else {
                    requests.push({
                        "insertText": {
                            "objectId": textID,
                            "text": extract(v, 1).trim()
                        }
                    })
                }
                requests.find(element => element["createSlide"] && element["createSlide"]["objectId"] == slideID)["createSlide"]["placeholderIdMappings"]
                    .push({
                        "layoutPlaceholder": {
                            "type": "BODY",
                            "index": 0
                        },
                        "objectId": textID,
                    })
            }
        }
        gapi.client.slides.presentations.batchUpdate({
            presentationId: PRESENTATION_ID,
            requests: requests
        }).then((createSlideResponse) => {
            pushProgress(30);
            ImageCount = imageMatrix.length;
            if (ImageCount != 0) {
                imagePercent = 50 / ImageCount;
                imageMatrix.forEach(array => searchImagesPreview(array, 0))
            } else {
                pushProgress(60)
            }
        }).catch(function(error) {
            showError(error.result.error.message);
        });
    }).catch(function(error) {
        console.log(error);
        showError(error.result.error.message);
    })
}

//IDENTIFY LAYOUT TYPE FOR SLIDE
function getLayout(v) {
    if (extract(v, 0).length == 0) {
        //NO TEXT
        return "SECTION_HEADER"
    } else if ($(v).find("a.image img").length == 0 && $(v).find("a[title]").length == 0) {
        //THERE ARE NO IMAGES AND LINKS TO OTHER ARTICLES => NO IMAGES AND NOWHERE TO SEARCH
        return "SECTION_TITLE_AND_DESCRIPTION"
    } else {
        return "TITLE_AND_TWO_COLUMNS"
    }
}

/*////////////////////////////IMAGE SEARCHERS /////////////*/
//ARRAY[0] = SLIDEID [STRING], ARRAY[1] = LINKS TO WIKIPEDIA ARTICLES [ARRAY]
let url, html, imageObject;

//ARRAY[0] = SLIDEID [STRING], ARRAY[1] = LINKS TO WIKIPEDIA ARTICLES [ARRAY]
//checks all links to wiki articles and takes the preview of article 
function searchImagesPreview(array, linkIndex) {
    url = SERVICEURL;
    var params = {
        origin: "*",
        action: "query",
        titles: $(array[1][linkIndex]).attr("title"),
        prop: "pageimages",
        format: "json",
        pithumbsize: 500,
    }
    Object.keys(params).forEach(function(key) { url += "&" + key + "=" + params[key]; });
    fetch(url).then(function(response) { return response.json() })
        .then(function(response) {
            let key = Object.keys(response.query.pages)[0];
            if (response.query.pages[key].hasOwnProperty("thumbnail")) {
                thumbnailObject = response.query.pages[key]["thumbnail"];

                currentImg = resizeImage(thumbnailObject["source"]);
                imageCof = thumbnailObject["height"] / thumbnailObject["width"]
                if (checkURL(currentImg)) {
                    if (!currentImg.match("[0-9]+px")) {
                        urlToHeightWidth.set(currentImg, [thumbnailObject["height"], thumbnailObject["width"]])
                    }
                    url2Text2Cof.set(currentImg, [$(array[1][linkIndex]).attr("title"), imageCof])
                    updateImage(array, currentImg);
                } else {
                    if (linkIndex == array[1].length - 1) { //last link :(
                        searchImagesInsidePar(array, 0);
                    } else {
                        searchImagesPreview(array, (linkIndex + 1)); //check next link
                    }
                }
            } else {
                if (linkIndex == array[1].length - 1) { //last link :(
                    searchImagesInsidePar(array, 0);
                } else {
                    searchImagesPreview(array, (linkIndex + 1)); //check next link
                }
            }

        })
        .catch(function(error) {
            if (linkIndex == array[1].length - 1) { //last link :(
                searchImagesInsidePar(array, 0);
            } else {
                searchImagesPreview(array, (linkIndex + 1)); //check next link
            }
        });
}

//parses all wiki articles links send to and finds the first image
function searchImagesInsidePar(array, linkIndex) {
    url = SERVICEURL;
    var params = {
        origin: "*",
        action: "parse",
        prop: "text",
        page: $(array[1][linkIndex]).attr("title"),
        format: "json",
    }
    Object.keys(params).forEach(function(key) { url += "&" + key + "=" + params[key]; });
    fetch(url)
        .then(function(response) { return response.json() })
        .then(function(response) {
            html = sortHtml(response.parse.text["*"]);
            imageObject = $(html).find("img")[0];
            currentImg = resizeImage($(imageObject).attr("src"));
            currentText = $($(html).find(".thumbcaption")[0]).text();
            imageCof = $(imageObject).attr('height') / $(imageObject).attr('width');
            if (checkURL(currentImg)) {
                url2Text2Cof.set(currentImg, [currentText, imageCof])
                updateImage(array, currentImg);
            } else {
                if (linkIndex == array[1].length - 1) {
                    if (reserveImages.length != 0 && reserveIndex < reserveImages) {
                        updateImage(array, reserveImages[reserveIndex]);
                        reserveIndex++;
                    } else {
                        decreaseImageCount();
                        pushProgress(imagePercent);
                    }
                } else {
                    searchImagesInsidePar(array, (linkIndex + 1));
                }
            }
        })
        .catch(function(error) {
            if (linkIndex == array[1].length - 1) { //last link in array
                if (reserveImages.length != 0 && reserveIndex < reserveImages) {
                    updateImage(array, reserveImages[reserveIndex]);
                    reserveIndex++;
                } else {
                    decreaseImageCount();
                    pushProgress(imagePercent);
                }
            } else {
                searchImagesInsidePar(array, (linkIndex + 1));
            }
        });
}

function updateImage(array, url) {
    pushProgress(imagePercent);
    imagesWaiting.push([array, url])
    if (imagesWaiting.length == ImageCount) {
        let array, url;
        let requests = [];
        imagesWaiting.forEach(arr => {
            array = arr[0];
            url = arr[1];
            requests.push(imageRequest(array[0], url));
        })
        gapi.client.slides.presentations.batchUpdate({
            presentationId: PRESENTATION_ID,
            requests: requests
        }).then((createSlideResponse) => {
            pushProgress(10);
        }).catch(function(error) {
            //if wrong url => whole request crashes, to make presentation without wrong url => do request for every image 1 by 1
            updateImages1by1();
        });
    }
}

function updateImages1by1() {
    if (imagesWaiting.length == ImageCount) {
        let array, url;
        let count = 0
        imagesWaiting.forEach(arr => {
            count++;
            array = arr[0];
            url = arr[1];
            gapi.client.slides.presentations.batchUpdate({
                presentationId: PRESENTATION_ID,
                requests: imageRequest(array[0], url)
            }).then((createSlideResponse) => {
                if (count = imagesWaiting.length - 1) {
                    pushProgress(10);
                }
            });
        })
    }
}

/*/////////////////////////////////////REQUEST CREATION METHODS//////////////////////////////////////////*/
function imageRequest(slideID, imgUrl) {
    let translateY = TRANSLATEY;
    imageIndex++;
    //PRIMARY SETTINGS
    let imgCof = url2Text2Cof.get(imgUrl)[1]
    let width = COLWIDTH;
    IMAGEHEIGHT = width - 50;
    let scaleX = 1;
    let scaleY = 1;
    let newReq = [];
    if (previewNotUpdated) {
        updatePreview(imgUrl);
        previewNotUpdated = false;
    }

    if (imgCof <= 1) {
        //width > height
        IMAGEHEIGHT = imgCof * width;
    }

    //SET IMAGE DATA
    if (urlToHeightWidth.has(imgUrl)) {
        width = urlToHeightWidth.get(imgUrl)[1];
        IMAGEHEIGHT = urlToHeightWidth.get(imgUrl)[0];

        scaleX = COLWIDTH / width;
        scaleY = (COLWIDTH - 50) / IMAGEHEIGHT;

        //TO SAVE THE PROPORTION SCALEX = SCALEY
        if (width > IMAGEHEIGHT) {
            scaleY = scaleX;
        } else {
            scaleX = scaleY;
        }
    }

    imagesUsed.push(imgUrl);
    text = url2Text2Cof.get(imgUrl)[0];

    if (!longheaders.includes(slideID)) {
        translateY = (405 - IMAGEHEIGHT * scaleY - textHeight(text.length)) / 2;
    }

    newReq.push(createImageJSON("image" + imageIndex, imgUrl, slideID, IMAGEHEIGHT, width, translateY, TRANSLATEX, scaleX, scaleY));
    if (url2Text2Cof.has(imgUrl) && url2Text2Cof.get(imgUrl)[0]) {
        let textID = slideID + "d";
        newReq.push([{
                "updatePageElementTransform": {
                    "objectId": textID,
                    transform: {
                        scaleX: 1,
                        scaleY: 1,
                        translateY: IMAGEHEIGHT * scaleY + translateY - TRANSLATEY,
                        unit: 'PT'
                    },
                    "applyMode": "RELATIVE"

                }
            },
            {
                insertText: {
                    objectId: textID,
                    insertionIndex: 0,
                    text: text
                }
            },
            {
                updateParagraphStyle: {
                    objectId: textID,
                    style: {
                        alignment: "CENTER"
                    },
                    fields: 'alignment',
                }
            }
        ])
    }
    return newReq;
}

///////////////////////////////////REQUEST EXECUTION//////////////////////////////////
function updateFirstSlide() {
    gapi.client.slides.presentations.batchUpdate({
        presentationId: PRESENTATION_ID,
        requests: [{
            "insertText": {
                "objectId": "i0",
                "text": $(".card-title").text(),
            }
        }, {
            "insertText": {
                "objectId": "i1",
                "text": translation.get("siteurl"),
            }
        }]
    }).then(function(response) {})
}

//UPDATES THE PROGRESSBAR
function pushProgress(percent) {
    currentPercent += percent;
    if (currentPercent >= 10 && currentPercent < 40) {
        progressBar.text(translation.get("createPres"))
    } else if (currentPercent >= 40 && currentPercent < 90) {
        progressBar.text(translation.get("gatherImages"))
    } else {
        progressBar.text(translation.get("insertImages"))
    }
    if (currentPercent > 99) {
        //PRESENTATION IS READY ;)
        progressBar.text(translation.get("done"))
        $(".progress").fadeOut();
        $(".pres-preview a").attr("href", "https://docs.google.com/presentation/d/" + PRESENTATION_ID)

        card.show();
        $("h2").text(translation.get("presReady"));
    }
    progressBar.css("width", currentPercent + "%")
}

//NO IMAGES FOUND FOR SLIDE => DECREASE WHOLE COUNT TO COUNTINUE WITHOUT IT
function decreaseImageCount() {
    if (imagesWaiting.length == ImageCount - 1) {
        let array, url;
        let requests = [];
        imagesWaiting.forEach(arr => {
            array = arr[0];
            url = arr[1];
            requests.push(imageRequest(array[0], url));
        })
        gapi.client.slides.presentations.batchUpdate({
            presentationId: PRESENTATION_ID,
            requests: requests
        }).then((createSlideResponse) => {
            pushProgress(10)
        }).catch(function(error) { updateImages1by1(); });
    } else {
        ImageCount--;
    }
}