import { updateStage, shiftPage, shiftDocument, copyPage } from "./stage.js";

let zTree;

const gamaZTreeSetting = {
    view: {
        selectedMulti: false
    },
    edit: {
        drag: {
            autoExpandTrigger: true,
            prev: true,
            inner: dropInner,
            next: true,
            isMove: false,
            isCopy: true
        },
        enable: true,
        showRemoveBtn: showRemoveBtn
    },
    callback: {
        onDrop: onDrop,
        beforeDrag: beforeDrag,
        onClick: showPage
    },
    data: { keep: {parent: true, leaf: true}}
}

export function setNavigation(zTreeSettings) {
    $(function () {
        zTree = $.fn.zTree.getZTreeObj(zTreeSettings.id);

        $.extend(true, zTree.setting, gamaZTreeSetting);

        $(zTreeSettings.nextPageSelector).on('click', nextPage);
        $(zTreeSettings.prevPageSelector).on('click', prevPage);
        $(zTreeSettings.nextDocumentSelector).on('click', nextDocument);
        $(zTreeSettings.prevDocumentSelector).on('click', prevDocument);
    });
}

function showPage(e, tId, node) {

    if (node.isParent) return;

    var ids = node.extra.split('_');

    updateStage(ids[0], ids[1]);

    node.canDrag = true;

}

function nextPage() {

    shiftPage(zTree, true);
}

function prevPage() {

    shiftPage(zTree, false);
}

function nextDocument() {
    shiftDocument(zTree, true);
}

function prevDocument() {
    shiftDocument(zTree, false);
}

//zTree callbacks
function dropInner(treeId, nodes, targetNode) {

    return !targetNode || targetNode.isParent;
}

function onDrop(event, treeId, treeNodes, targetNode, type) {
    if (treeNodes.length && targetNode) {
        if (!targetNode.isParent)
            targetNode = targetNode.getParentNode();
        var node = treeNodes[0];
        var oldExtra = node.extra;
        node.isCopy = true;
        node.name = 'página ' + targetNode.children.length + ' (cópia)';
        node.extra = targetNode.extra + '_page' + targetNode.children.length;
        zTree.updateNode(node);
        copyPage(oldExtra, node.extra);
        console.log(targetNode);
    }
}

function beforeDrag(treeId, treeNodes) {
    if (!treeNodes[0].canDrag)
        return false;
    return 1;
    //return (treeNodes.length == 1 && treeNodes[0].canDragg && treeNodes[0].getParentNode().children.length > 1);
}

function showRemoveBtn(treeId, treeNode) {
    return treeNode.isCopy;
}
