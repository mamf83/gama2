import { stage } from "../stage2.js";
import { createBoxes } from "../boxes/main.js";
import { getCurrentDocument } from "../document/main.js";

let currentPage = null;

export function getCurrentPage() {
    return currentPage;
}

export function getPageGroup(docGroup, docId, pageId, getPageUrl) {

    return new Promise((resolve) => {

        var pageGroup = docGroup.length ? docGroup[0].find('#' + pageId)[0] : null;

        if (pageGroup) {

            resolve({ pageGroup: pageGroup, isNew: false });
            currentPage = pageGroup;
            return;
        }

        if (typeof RichWidgets_Feedback_AjaxWait_show !== 'undefined')
            RichWidgets_Feedback_AjaxWait_show();

        var url = getPageUrl.replace('{docId}', docId).replace('{pageId}', pageId);

        $.get(url)
            .done(function (data) {

                currentPage = processData(data);
                resolve({ pageGroup: currentPage, isNew: true });

                if (typeof RichWidgets_Feedback_AjaxWait_hide !== 'undefined')
                    RichWidgets_Feedback_AjaxWait_hide();

            })
            .fail(
                () => resolve(0)
            )
    });

}

function processData(data) {

    var pageGroup = new Konva.Group({ id: data.id });

    var image = new Konva.Image({
        name: 'page-image'
    });

    setPageDimensions(pageGroup, image, data.width, data.height);

    var imageObj = new Image();
    imageObj.onload = function () {
        image.image(imageObj);
    };
    imageObj.src = data.url;

    pageGroup.add(image);

    pageGroup.add(createBoxes(image, [data.width, data.height], { polygons: data.boxes }));

    return pageGroup;
}

export function copyPage(oldId, newId) {

    oldId = oldId.split('_');
    newId = newId.split('_');



    var page = stage.find('#' + oldId[0])[0].find('#' + oldId[1])[0];

    var clone = page.clone({
        id: newId[1],
    });

    var image = page.children[1].attrs.image.cloneNode();

    clone.children[1].attrs.image = image;

    if (oldId[0] == newId[0]) {
        page.getParent().add(clone);
        updateStage(newId[0], newId[1]);
        return;
    }

    var doc = stage.find('#' + newId[0]);

    if (!doc.length)
        addDocumentGroup(newId[0]);

    getCurrentDocument.add(clone);

    updateStage(newId[0], newId[1]);
}

function setPageDimensions(pageGroup, image, width, height) {

    var dimensions = calculateDimensions(stage.container(), width, height);

    // set group properties
    pageGroup.x(dimensions.x + dimensions.width / 2);
    pageGroup.y(dimensions.y + dimensions.height / 2);
    pageGroup.width(dimensions.width);
    pageGroup.height(dimensions.height);
    pageGroup.offsetX(dimensions.width / 2);
    pageGroup.offsetY(dimensions.height / 2);

    // set image properties and add to group
    image.x(0);
    image.y(0);
    image.width(dimensions.width);
    image.height(dimensions.height);
}

function calculateDimensions(container, imageW, imageH) {

    // get current container size
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    // calculate size to fit screen
    var ratio = imageH / imageW;
    var newImageW = 0.95 * height / ratio;
    var newImageH = 0.95 * height;

    // calculate coordinates to center
    var x = (width / 2) - (newImageW / 2);
    var y = (height / 2) - (newImageH / 2);

    return { x: x, y: y, width: newImageW, height: newImageH };
}