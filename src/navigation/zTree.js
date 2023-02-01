import { updateStage } from "../viewer/stage2.js";
import { copyPage } from "../viewer/page/main.js";

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
    data: { keep: { parent: true, leaf: true } }
}

export function setZTreeSettings(zTreeId) {

    zTree = $.fn.zTree.getZTreeObj(zTreeId);

    $.extend(true, zTree.setting, gamaZTreeSetting);
}

function showPage(e, tId, node) {

    if (node.isParent) return;

    var ids = node.extra.split('_');

    updateStage(ids[0], ids[1]);

    node.canDrag = true;

}

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