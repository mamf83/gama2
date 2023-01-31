export function getPageGroup(docGroup, docId, pageId, getPageUrl) {

    return new Promise((resolve) => {

        var pageGroup = docGroup.length ? docGroup[0].find('#' + pageId)[0] : null;
        if (pageGroup) {
            resolve({pageGroup: pageGroup, isNew: false});
            return;
        }

        RichWidgets_Feedback_AjaxWait_show();

        var url = getPageUrl.replace('{docId}', docId).replace('{pageId}', pageId);
        $.get(url)
            .done(function (data) {

                setTimeout(() => { resolve(processData(data)); RichWidgets_Feedback_AjaxWait_hide();}, 10);

            })
            .fail(
                () => resolve(0)
            )
    });

}

function processData(data) {

    var pageGroup = new Konva.Group({ id: data.id });

    var imageObj = new Image();
    imageObj.onload = function () {
        var img = new Konva.Image({
            x: 50,
            y: 50,
            image: imageObj,
            name: 'page-image',
            stroke: 'red',
            strokeWidth: 2
        });
        pageGroup.add(img);
    };
    imageObj.src = data.url;

    var boxesGroup = new Konva.Group({ name: 'boxes' });

    pageGroup.add(boxesGroup);

    return {pageGroup: pageGroup, isNew: true};
}

function RichWidgets_Feedback_AjaxWait_show(){
    $('.loading-banner').show();
}

function RichWidgets_Feedback_AjaxWait_hide(){
    $('.loading-banner').hide();
}