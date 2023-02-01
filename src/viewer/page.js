import { currentAttribute, updateAttribute } from "../attributes/main.js";
import { currentPage, stage } from "./stage.js";


let isSelecting = false;

export function getPageGroup(docGroup, docId, pageId, getPageUrl) {

    return new Promise((resolve) => {

        var pageGroup = docGroup.length ? docGroup[0].find('#' + pageId)[0] : null;
        if (pageGroup) {
            resolve({ pageGroup: pageGroup, isNew: false });
            return;
        }

        if (typeof RichWidgets_Feedback_AjaxWait_show !== 'undefined')
            RichWidgets_Feedback_AjaxWait_show();

        var url = getPageUrl.replace('{docId}', docId).replace('{pageId}', pageId);
        $.get(url)
            .done(function (data) {

                resolve(processData(data));
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
    var dimensions = calculateDimensions(stage.container(), data.width, data.height);

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

    var imageObj = new Image();
    imageObj.onload = function () {
        image.image(imageObj);
    };
    imageObj.src = data.url;

    pageGroup.add(image);
    var boxesGroup = createBoxes(image, [data.width, data.height], { polygons: data.boxes });
    pageGroup.add(boxesGroup);

    return { pageGroup: pageGroup, isNew: true };
}

function createBoxes(image, imageSizes, boxes) {

    let group = new Konva.Group({ name: "boxes" });
    group.x(0);
    group.y(0);

    if (!boxes.polygons || !boxes.polygons.length)
        return;

    var container = Konva.stages[0].container();

    var containerHeight = container.offsetHeight;
    for (let i = 0; i < boxes.polygons.length; i++) {
        createBox(containerHeight, image, imageSizes, group, boxes.polygons[i])
    }

    // add a new feature, lets add ability to draw selection rectangle
    var selectionRectangle = new Konva.Rect({
        fill: 'rgba(177, 179, 200 ,0.5)',
        stroke: 'rgba(177, 179, 200 ,1)',
        strokeWidth: 1.2,
        visible: false,
        name: 'selecting-rectangle'
    });

    group.add(selectionRectangle);

    var x1, y1, x2, y2;
    image.getParent().on('mousedown touchstart', (e) => {

        if (!currentAttribute || e.evt.button !== 2) { return; }

        // if image was already loaded
        y1 = image.getRelativePointerPosition().y;
        x1 = image.getRelativePointerPosition().x;
        x2 = image.getRelativePointerPosition().x;
        y2 = image.getRelativePointerPosition().y;

        selectionRectangle.visible(true);
        selectionRectangle.width(0);
        selectionRectangle.height(0);
        isSelecting = true;


    });

    image.getParent().on('mousemove touchmove', (e) => {


        // no nothing if we didn't start selection
        if (!currentAttribute || !selectionRectangle.visible()) {
            return;
        }

        x2 = image.getRelativePointerPosition().x;
        y2 = image.getRelativePointerPosition().y;

        selectionRectangle.setAttrs({
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.abs(x2 - x1),
            height: Math.abs(y2 - y1),
        });
    });

    image.getParent().on('mouseup touchend', () => {

        // no nothing if we didn't start selection
        if (!currentAttribute || !selectionRectangle.visible()) {
            return;
        }
        // update visibility in timeout, so we can check it in click event
        setTimeout(() => {
            selectionRectangle.visible(false);
        });

        var shapes = currentPage.find('.boxes')[0].find('.helper_box');
        var box = selectionRectangle.getClientRect();
        var selected = shapes.filter((shape) =>
            Konva.Util.haveIntersection(box, shape.getClientRect())
        );

        isSelecting = false;
        selected.forEach(s => {
            //if (!s.selected2)
            s.fire('click');
        });
    });

    return group;
}
function createBox(containerHeight, image, imageSize, group, polygon) {

    let points = polygon.vertices;
    let final = []

    for (let i = 0; i < points.length; i++) {
        final.push(points[i][0] / (imageSize[0] / image.width()))
        final.push(points[i][1] / (imageSize[1] / image.height()))
    }

    var poly = new Konva.Line({
        points: final,
        fill: 'rgba(0, 0, 0, 0)',
        stroke: 'rgba(0, 0, 0, 0)',
        strokeWidth: 0.4,
        closed: true,
        name: "helper_box"
    });

    for (let i = 0; i < polygon["vertices"].length; i++) {
        polygon["vertices"][i][0] = polygon["vertices"][i][0] / imageSize[0];
        polygon["vertices"][i][1] = polygon["vertices"][i][1] / imageSize[1];
    }

    poly.box = polygon;
    poly.box.pageIndex = 0;
    poly.prevent = false;
    poly.selected2 = false;
    group.add(poly);

    poly.on('mouseover', function (evt) {
        if (!currentAttribute || isSelecting) { return; }
        var shape = evt.target;
        Konva.stages[0].container().style.cursor = 'pointer';

        if (!shape.selected2) {
            shape.fill('rgba(138, 54, 54, 0.3)');
            shape.stroke('rgba(200, 54, 54, 1)');

        }
    });

    poly.on('mouseout', function (evt) {
        if (!currentAttribute || isSelecting) { return; }

        var shape = evt.target;
        Konva.stages[0].container().style.cursor = 'default';

        if (!shape.selected2) {
            shape.fill('rgba(0, 0, 0, 0)');
            shape.stroke('rgba(0, 0, 0, 0)');

        }

    });

    poly.on('click', function (evt) {

        if (!currentAttribute || isSelecting) return;

        var shape = evt.target;
        document.body.style.cursor = 'default';

        if (!poly.prevent) {

            updateAttribute(evt.currentTarget.parent.parent.attrs.id, evt.target.box);

        } else {
            poly.prevent = false;
        }

        if (shape.selected2) {
            shape.fill('rgba(0, 0, 0, 0)');
            shape.stroke('rgba(0, 0, 0, 0)');

        } else {
            shape.fill('rgba(108, 171, 118, 0.3)');
            shape.stroke('rgba(108, 171, 118, 1)');

        }

        shape.selected2 = !shape.selected2
    });
}

function createPolygonGroup() {
    let group = new Konva.Group({
        name: "polygonsGroup"
    });

    // group to hold polygons
    let polygons = new Konva.Group({
        name: "polygons"
    });
    group.add(polygons);

    return group;
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