import { currentAttribute } from "../../attributes/main";

export let isSelecting = false;

export function addPageEvents(page) {

    var x1, y1, x2, y2;

    page.getParent().on('mousedown touchstart', (e) => {

        if (!currentAttribute || e.evt.button !== 2) { return; }

        // if image was already loaded
        y1 = page.getRelativePointerPosition().y;
        x1 = page.getRelativePointerPosition().x;
        x2 = page.getRelativePointerPosition().x;
        y2 = page.getRelativePointerPosition().y;

        selectionRectangle.visible(true);
        selectionRectangle.width(0);
        selectionRectangle.height(0);
        isSelecting = true;


    });

    page.getParent().on('mousemove touchmove', (e) => {


        // no nothing if we didn't start selection
        if (!currentAttribute || !selectionRectangle.visible()) {
            return;
        }

        x2 = page.getRelativePointerPosition().x;
        y2 = page.getRelativePointerPosition().y;

        selectionRectangle.setAttrs({
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.abs(x2 - x1),
            height: Math.abs(y2 - y1),
        });
    });

    page.getParent().on('mouseup touchend', () => {

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
}