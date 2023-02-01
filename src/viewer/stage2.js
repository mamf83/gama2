import { handleZoom } from "./controls.js";
import { getCurrentDocument, setCurrentDocument, addDocumentGroup } from "./document/main.js";
import { getCurrentPage, getPageGroup } from "./page/main.js";

export let stage;
let layer;
let getPageUrl;

export function createStage(settings) {

    var container = document.getElementById(settings.konvaContainerId);

    getPageUrl = settings.getPageUrl;

    var width = container.offsetWidth;
    var height = container.offsetHeight;
    // first we need to create a stage
    stage = new Konva.Stage({
        container: container.id,
        width,
        height,
        draggable: true,
        // Function responsible for bounding the drag
        dragBoundFunc: dragBoundFunc
    });

    // then create layer
    layer = new Konva.Layer();

    // add the layer to the stage
    stage.add(layer);

    stage.on('wheel', (e) => {
        handleZoom(e);
    });

    window.addEventListener('resize', centerImage);
}

function dragBoundFunc (pos) {
    let newY = (pos.y) < -(height) * 0.9 * this.scale().y ? -height * 0.9 * this.scale().y : pos.y
    newY = newY > (height) * 0.9 * this.scale().y ? height * 0.9 * this.scale().y : newY;
    let newX = (pos.x) < (-width) * 0.70 * this.scale().x ? -width * 0.70 * this.scale().x : pos.x
    newX = (newX) > (width) * 0.7 * this.scale().x ? width * 0.7 * this.scale().x : newX;
    return {
        x: newX,
        y: newY,
    };
}

export function updateStage(docId, pageId) {

    var currentDocument = getCurrentDocument();
    var currentPage = getCurrentPage();

    if (currentDocument && currentDocument.id == docId && currentPage.id == pageId)
        return;

    if (currentPage)
        currentPage.hide();

    var docGroup = stage.find('#' + docId);

    if (!docGroup.length) {

        addDocumentGroup(docId);
    }
    else {

        setCurrentDocument(docGroup[0]);
    }

    getPageGroup(docGroup, docId, pageId, getPageUrl)
        .then((result) => {

            if (result) {

                if (result.isNew)
                    getCurrentDocument().add(result.pageGroup);

                result.pageGroup.show();
                centerImage();
            }
        });

}

function centerImage() {
    var container = stage.container();
    var dimensions = calculateDimensions(container, 1965, 2035);

    var width = container.offsetWidth;
    var height = container.offsetHeight;

    stage.width(width);
    stage.height(height);
    stage.scale({ x: 1, y: 1 });

    if (layer.getChildren().length > 1) {
        var img = layer.getChildren()[0];
        img.width(dimensions.width);
        img.height(dimensions.height);
        img.x(dimensions.x)
        img.y(dimensions.y)
    }

    stage.position({
        x: 0,
        y: 0
    })
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


//-----------------------------------------------------------------------------------------
function addSelection() {
    var selectionRectangle = new Konva.Rect({
        stroke: 'black',
        strokeWidth: 1,
        dash: [5, 2],
        visible: false,
    });
    selectionRectangle.zIndex(2);

    var x1, y1, x2, y2;
    stage.on('mousedown touchstart', (e) => {
        // do nothing if we mousedown on any shape
        if (e.target === stage && !currentDocument) {
            return;
        }
        e.evt.preventDefault();
        currentDocument.add(selectionRectangle);
        x1 = stage.getPointerPosition().x;
        y1 = stage.getPointerPosition().y;
        x2 = stage.getPointerPosition().x;
        y2 = stage.getPointerPosition().y;

        selectionRectangle.visible(true);
        selectionRectangle.width(0);
        selectionRectangle.height(0);
    });

    stage.on('mousemove touchmove', (e) => {
        // do nothing if we didn't start selection
        if (!selectionRectangle.visible()) {
            return;
        }
        e.evt.preventDefault();
        x2 = stage.getPointerPosition().x;
        y2 = stage.getPointerPosition().y;

        selectionRectangle.setAttrs({
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.abs(x2 - x1),
            height: Math.abs(y2 - y1),
        });
    });

    stage.on('mouseup touchend', (e) => {
        // do nothing if we didn't start selection
        if (!selectionRectangle.visible()) {
            return;
        }
        e.evt.preventDefault();
        // update visibility in timeout, so we can check it in click event
        setTimeout(() => {
            selectionRectangle.visible(false);
        });


        var box = selectionRectangle.getClientRect();

        var img = currentPage.find('.page-image')[0];

        var canvas = document.createElement('canvas');
        canvas.width = box.width;
        canvas.height = box.height;
        var context = canvas.getContext('2d');


        // draw cropped image
        var sourceX = img.attrs.x;
        var sourceY = img.attrs.y;
        var sourceWidth = img.width();
        var sourceHeight = img.height();
        var destWidth = box.width;
        var destHeight = box.height;
        var destX = box.x;
        var destY = box.y;

        context.drawImage(img.attrs.image, destX - sourceX, destY - sourceY, destWidth, destHeight, 0, 0,
            destWidth, destHeight);


        //context.putImageData(imagedata, 0, 0)s

        img.attrs.image.src = canvas.toDataURL();


    });

    // clicks should select/deselect shapes
    stage.on('click tap', function (e) {
        // if we are selecting with rect, do nothing
        if (selectionRectangle.visible()) {
            return;
        }

        // if click on empty area - remove all selections
        if (e.target === stage) {
            //tr.nodes([]);
            return;
        }

        // do nothing if clicked NOT on our rectangles
        if (!e.target.hasName('rect')) {
            return;
        }

        // do we pressed shift or ctrl?
        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        //const isSelected = tr.nodes().indexOf(e.target) >= 0;

    });
}
