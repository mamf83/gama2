export let currentAttribute = null;

export function setCurrentAttribute(attribute){
    currentAttribute = attribute;
}

export function updateAttribute(pageId, box){

    if(!currentAttribute.boxes){
        currentAttribute.boxes = {};
        currentAttribute.boxes[pageId] = [];
    }

    currentAttribute.boxes[pageId].push(box);

}