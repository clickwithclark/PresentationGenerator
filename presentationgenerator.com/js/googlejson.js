function createImageJSON(objectID, imageSource, slideID, imageHeight, imageWidth, translateY, translateX, scaleY, scaleX) {
    return {
        "createImage": {
            "objectId": objectID,
            "url": imageSource,
            elementProperties: {
                pageObjectId: slideID,
                size: {
                    height: {
                        magnitude: imageHeight,
                        unit: 'PT'
                    },
                    width: {
                        magnitude: imageWidth,
                        unit: 'PT'
                    }
                },
                transform: {
                    scaleX: scaleX,
                    scaleY: scaleY,
                    translateX: translateX,
                    translateY: translateY,
                    unit: 'PT'
                }
            }
        }
    }
}