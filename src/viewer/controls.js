//import { getPolygroup } from '../utils/utils.js';
//import { addVertice, updateBallSize, setScale} from '../utils/polygons.js';
Konva.dragButtons = [0];
var scaleBy = 0.85;
var scale = 1;

export function handleZoom(e){
    e.evt.preventDefault();
    var stage = e.currentTarget;
    var oldScale = stage.scaleX();

    var pointer = stage.getPointerPosition();

    var mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
    };

    var newScale =
        e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    newScale = Math.max(1, Math.min(10, newScale));
    stage.scale({ x: newScale, y: newScale });
    scale = newScale;
    //Annotator.polygons.updateBallSize(stage.scale().x);

    var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
}

export function handleClick(e) {
    var stage = e.currentTarget;
    if (e.evt.button === 0) {
        var pos = Annotator.utils.getPolygroup(stage).getRelativePointerPosition();
        Annotator.polygons.addVertice(stage, pos.x, pos.y)
    } else {
        e.evt.preventDefault()
        // cancel building
    }

}
