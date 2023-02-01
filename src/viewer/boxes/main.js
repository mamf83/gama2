import { addPolygonEvents } from "./events.js";

export function createBoxes(boxes, image, pageWidth, pageHeight) {

    let boxesGroup = new Konva.Group({ name: "boxes" });
    boxesGroup.x(0);
    boxesGroup.y(0);

    if (!boxes.polygons || !boxes.polygons.length)
        return;

    var container = Konva.stages[0].container();

    var containerHeight = container.offsetHeight;

    boxes.polygons.forEach((polygon) => boxesGroup.add(createBox(polygon, image, containerHeight, pageWidth, pageHeight)));


    // add a new feature, lets add ability to draw selection rectangle
    var selectionRectangle = new Konva.Rect({
        fill: 'rgba(177, 179, 200 ,0.5)',
        stroke: 'rgba(177, 179, 200 ,1)',
        strokeWidth: 1.2,
        visible: false,
    });

    boxesGroup.add(selectionRectangle);

    return boxesGroup;
}
function createBox(polygon, image, containerHeight, pageWidth, pageHeight) {

    let points = polygon.vertices;
    let final = []

    for (let i = 0; i < points.length; i++) {
        final.push(points[i][0] / (pageWidth / image.width()))
        final.push(points[i][1] / (pageHeight / image.height()))
    }

    var poly = new Konva.Line({
        points: final,
        fill: 'rgba(0, 0, 0, 0)',
        stroke: 'rgba(0, 0, 0, 0)',
        strokeWidth: 0.4,
        closed: true,
        name: "helper_box"
    });

    box.vertices.forEach((vertice) => {


    });
    for (let i = 0; i < box["vertices"].length; i++) {
        box["vertices"][i][0] = polygon["vertices"][i][0] / imageSize[0];
        polygon["vertices"][i][1] = polygon["vertices"][i][1] / imageSize[1];
    }



    poly.box = polygon;
    poly.box.pageIndex = 0;
    poly.prevent = false;
    poly.selected2 = false;

    addPolygonEvents(poly);

    group.add(poly);

}

