let currentDocument = null;

export function addDocumentGroup(docId) {

    return new Konva.Group({ id: docId });
}

export function setCurrentDocument(doc){
    currentDocument = doc;
}

export function getCurrentDocument(){
    return currentDocument;
}