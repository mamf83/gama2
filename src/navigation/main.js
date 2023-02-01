import { updateStage } from "../viewer/stage2.js";
import { setZTreeSettings } from "./zTree.js";

export function setNavigation(navSettings) {

    $(function () { 

        setZTreeSettings(navSettings.zTreeId);

        $(navSettings.nextPageSelector).on('click', () => nextPage(true));
        $(navSettings.prevPageSelector).on('click', () =>  nextPage(false));
        $(navSettings.nextDocumentSelector).on('click', () => nextDocument(true));
        $(navSettings.prevDocumentSelector).on('click', () => nextDocument(false));
    });
}

function nextPage(isForward) {
    
    var currentPage = getCurrentPage();

    if(!currentPage) return;

    var nextPage = isForward ? currentPage.getNextNode() : currentPage.getPrevNode();

    if (!nextPage) {

        nextDocument(isForward);
        return;
    }

    var extra = nextPage.extra.split('_');

    updateStage(extra[0], extra[1]);

    zTree.selectNode(nextPage);
}

function nextDocument(isForward) {

    var currentPage = getCurrentPage();

    if(!currentPage) return;

    var currentDoc = currentPage.getParentNode();

    var nextDoc = isForward ? currentDoc.getNextNode() : currentDoc.getPrevNode();

    if (!nextDoc)
        return;

    var page = nextDoc.children[0];

    var ids = page.extra.split('_');

    updateStage(ids[0], ids[1]);

    if (!nextDoc.open)
        zTree.expandNode(nextDoc);

    zTree.selectNode(page);
}

function getCurrentPage(){

    var selectedNodes = zTree.getSelectedNodes();

    if(!selectedNodes.length)
        return null;

    return selectedNodes[0];

}
