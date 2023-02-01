import { currentPage, getCurrentPolygonsGroup } from '../utils/stage.js';

Konva.dragButtons = [0];

var initialSize = 5;
var lineSize = 2;
var borderPercentage = 0.4;
var maxSize = 6;
var scale = 1;


export function createPolygonGroup() {
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

function getPolygonGroup(group) {
    return group.find(".polygons")[0];
}

function getPolygons(group) {
    return group.find(".polygons")[0].getChildren();
}

function getPolygon(group, index) {
    return getPolygons(group)[index];
}


function getAnchorsGroup(polygon) {
    return polygon.find(".anchors")[0];
}

function getExpandGroup(polygon) {
    return polygon.find(".expandAnchors")[0];
}

function getAnchors(polygon) {
    return getAnchorsGroup(polygon).getChildren();
}

function getExpandAnchors(polygon) {
    return getExpandGroup(polygon).getChildren();
}

function getAnchor(polygon, anchorIndex) {
    let anchors = getAnchors(polygon);
    return anchors[anchorIndex];
}


function buildAnchor(x, y, opacity, currentGroup) {

    var anchor = new Konva.Circle({
        x: x,
        y: y,
        radius: initialSize / scale,
        stroke: '#fff',
        fill: 'rgb(138, 54, 54)',
        strokeWidth: borderPercentage * (initialSize / scale),
        opacity: opacity,
        draggable: true,
    });

    // add hover styling
    // anchor.on('mouseover', function () {
    //     document.body.style.cursor = 'pointer';
    //     this.strokeWidth(8);
    // });
    // anchor.on('mouseout', function () {
    //     document.body.style.cursor = 'default';
    //     this.strokeWidth(8);
    // });

    anchor.on('dragmove', function () {
        if (!building && currentPolygon !== -1) {
            updateExpand(currentGroup)
        }
    });

    //anchor.perfectDrawEnabled(false);
    anchor.shadowForStrokeEnabled(false)
    return { anchor: anchor, polygon: currentPolygon };
}


function newPolygon(polygon, index) {
    var poly = new Konva.Shape({
        stroke: 'rgb(138, 54, 54)',
        strokeWidth: lineSize / scale,
        fill: 'rgba(138, 54, 54, 0.3)',
        sceneFunc: (ctx, shape) => {
            ctx.beginPath();
            ctx.moveTo(getAnchor(polygon, 0).x(), getAnchor(polygon, 0).y());

            for (let i = 1; i < getAnchors(polygon).length; i++) {
                let anchor = getAnchor(polygon, i);
                ctx.lineTo(
                    anchor.x(),
                    anchor.y(),
                );
            }
            if (building && currentPolygon === index) {
                ctx.lineTo(
                    tempAnchor.x(),
                    tempAnchor.y(),
                );
            } else {
                ctx.closePath();
            }

            ctx.fillStrokeShape(shape);
        },
    });
    return poly;
}

var currentPolygon = -1;
let tempAnchor;


let initialX, initialY;

function deselectAll(currentGroup) {
    let polygons = getPolygons(currentGroup);
    for (let i = 0; i < polygons.length; i++) {
        getAnchorsGroup(polygons[i]).hide()
        getExpandGroup(polygons[i]).hide()
    }
    currentPolygon = -1;
}


function updateExpand(currentGroup) {
    let polygon = getPolygon(currentGroup, currentPolygon);

    let anchors = getAnchors(polygon);
    let expand = getExpandAnchors(polygon);

    expand.forEach((anchor) => {
        let a = anchors[anchor.left_index], b = anchors[anchor.left_index + 1];
        if (anchor.left_index === anchors.length - 1) {
            b = anchors[0];
        }
        let x = (b.x() + a.x()) / 2;
        let y = (b.y() + a.y()) / 2;
        anchor.x(x);
        anchor.y(y);
    });

}

let building = false;

export function setBuilding(val) {
    building = val;
}

function convertAnchor(currentGroup, anchor) {
    let polygon = getPolygon(currentGroup, currentPolygon);

    let anchorGroup = getAnchorsGroup(polygon);
    let expand = getExpandAnchors(polygon);
    let expandGroup = getExpandGroup(polygon);

    anchor.opacity(1)
    anchor.off('dragstart')

    anchorGroup.add(anchor)
    anchor.zIndex(anchor.left_index + 1)

    expand.forEach((a) => {
        if (a.left_index > anchor.left_index) {
            a.left_index = a.left_index + 1;
        }
    });

    expandGroup.add(buildExpand(currentGroup, anchor.left_index, anchor.left_index + 1, scale))
    expandGroup.add(buildExpand(currentGroup, anchor.left_index + 1, (anchor.left_index + 2) % anchorGroup.getChildren().length, scale))

}

function getIntermediate(currentGroup, a_index, b_index) {
    let polygon = getPolygon(currentGroup, currentPolygon);

    let anchors = getAnchors(polygon);

    let a = anchors[a_index], b = anchors[b_index];

    if (a_index === anchors.length - 1) {
        b = anchors[0];
    }

    let x = (b.x() + a.x()) / 2;
    let y = (b.y() + a.y()) / 2;
    return { x: x, y: y }
}

function buildExpand(currentGroup, a_index, b_index) {
    let coor = getIntermediate(currentGroup, a_index, b_index)
    let anchor = buildAnchor(coor.x, coor.y, 0.4, currentGroup).anchor;

    anchor.left_index = a_index

    anchor.on('dragstart', function () {
        convertAnchor(currentGroup, anchor, scale)
    });

    return anchor;
}

export function addVertice(currentGroup, x, y) {
    let polygonGroup = getPolygonGroup(currentGroup);

    if (building && ((initialX - x) ** 2 + (initialY - y) ** 2) < (initialSize / scale) ** 2) {
        let polygon = getPolygon(currentGroup, currentPolygon);
        let anchors = getAnchors(polygon);

        let expandGroup = getExpandGroup(polygon);
        for (let i = 0; i < anchors.length; i++) {
            expandGroup.add(buildExpand(currentGroup, i, i + 1, scale))
        }

        polygon.on('click', function (e) {
            e.cancelBubble = true;
            deselectAll(currentGroup);
            currentPolygon = this.getZIndex();
            let anchorsGroup = this.getChildren()[1]
            anchorsGroup.show();
            this.getChildren()[2].show();
        });

        getAnchorsGroup(polygon).hide()
        expandGroup.hide()
        currentPolygon = -1;
        tempAnchor.destroy();
        tempAnchor = null;
        building = false;
    } else {
        if (!building) {
            deselectAll(currentGroup);
            let groupPolygons = getPolygons(currentGroup);
            let polygonNumber = groupPolygons.length;

            currentPolygon = polygonNumber;
            building = true;

            let polygroup = new Konva.Group({});
            polygroup.polyindex = polygonNumber;
            let anchors = new Konva.Group({ name: "anchors" });
            let expand = new Konva.Group({ name: "expandAnchors" });

            let p = newPolygon(polygroup, currentPolygon);

            polygroup.add(p)
            polygroup.add(anchors)
            polygroup.add(expand)
            polygonGroup.add(polygroup)


            initialX = x;
            initialY = y;

        }


        let anchor = buildAnchor(x, y, 1, currentGroup);

        let polygon = getPolygon(currentGroup, currentPolygon);

        let anchors = getAnchorsGroup(polygon);

        anchors.add(anchor.anchor)

        if (tempAnchor) {
            tempAnchor.destroy();
        }

        tempAnchor = buildAnchor(x, y, 1, currentGroup).anchor
        tempAnchor.listening(false);

        currentGroup.add(tempAnchor)

        // polygon.moveToTop();
    }

}




// eslint-disable-next-line no-unused-vars
export function handleDragMove(e) {
    if (building) {
        e.currentTarget.stopDrag();
    }
}

export function updateBallSize() {
    let newRadius = Math.min(initialSize / scale, maxSize);

    let polygons = getPolygons(Annotator.stage.getCurrentPolygonsGroup());
    polygons.forEach((group) => {
        group.getChildren()[0].strokeWidth(lineSize / scale)

        group.getChildren()[1].getChildren().forEach((b) => { b.radius(newRadius); b.strokeWidth(borderPercentage * newRadius) })

        group.getChildren()[2].getChildren().forEach((b) => { b.radius(newRadius); b.strokeWidth(borderPercentage * newRadius) })

        if (tempAnchor) {
            tempAnchor.radius(newRadius); tempAnchor.strokeWidth(borderPercentage * newRadius)
        }
    });
}

export function setScale(newScale) {
    scale = newScale;
}