import { currentAttribute, updateAttribute } from "../../attributes/main";
import { isSelecting } from "../page/events";

export function addPolygonEvents(polygon){

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