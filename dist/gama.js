/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Gama"] = factory();
	else
		root["Gama"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _viewer_stage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewer/stage.js */ \"./src/viewer/stage.js\");\n/* harmony import */ var _viewer_navigation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewer/navigation.js */ \"./src/viewer/navigation.js\");\n\r\n\r\n\r\nfunction init(settings){\r\n    (0,_viewer_stage_js__WEBPACK_IMPORTED_MODULE_0__.createStage)(settings);\r\n    (0,_viewer_navigation_js__WEBPACK_IMPORTED_MODULE_1__.setNavigation)(settings.zTree);\r\n}\n\n//# sourceURL=webpack://Gama/./src/main.js?");

/***/ }),

/***/ "./src/viewer/navigation.js":
/*!**********************************!*\
  !*** ./src/viewer/navigation.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setNavigation\": () => (/* binding */ setNavigation)\n/* harmony export */ });\n/* harmony import */ var _stage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stage.js */ \"./src/viewer/stage.js\");\n\r\n\r\nlet zTree;\r\n\r\nconst gamaZTreeSetting = {\r\n    view: {\r\n        selectedMulti: false\r\n    },\r\n    edit: {\r\n        drag: {\r\n            autoExpandTrigger: true,\r\n            prev: true,\r\n            inner: dropInner,\r\n            next: true,\r\n            isMove: false,\r\n            isCopy: true\r\n        },\r\n        enable: true,\r\n        showRemoveBtn: showRemoveBtn\r\n    },\r\n    callback: {\r\n        onDrop: onDrop,\r\n        beforeDrag: beforeDrag,\r\n        onClick: showPage\r\n    },\r\n    data: { keep: {parent: true, leaf: true}}\r\n}\r\n\r\nfunction setNavigation(zTreeSettings) {\r\n    $(function () {\r\n        zTree = $.fn.zTree.getZTreeObj(zTreeSettings.id);\r\n\r\n        $.extend(true, zTree.setting, gamaZTreeSetting);\r\n\r\n        $(zTreeSettings.nextPageSelector).on('click', nextPage);\r\n        $(zTreeSettings.prevPageSelector).on('click', prevPage);\r\n        $(zTreeSettings.nextDocumentSelector).on('click', nextDocument);\r\n        $(zTreeSettings.prevDocumentSelector).on('click', prevDocument);\r\n    });\r\n}\r\n\r\nfunction showPage(e, tId, node) {\r\n\r\n    if (node.isParent) return;\r\n\r\n    var ids = node.extra.split('_');\r\n\r\n    (0,_stage_js__WEBPACK_IMPORTED_MODULE_0__.updateStage)(ids[0], ids[1]);\r\n\r\n    node.canDrag = true;\r\n\r\n}\r\n\r\nfunction nextPage() {\r\n\r\n    (0,_stage_js__WEBPACK_IMPORTED_MODULE_0__.shiftPage)(zTree, true);\r\n}\r\n\r\nfunction prevPage() {\r\n\r\n    (0,_stage_js__WEBPACK_IMPORTED_MODULE_0__.shiftPage)(zTree, false);\r\n}\r\n\r\nfunction nextDocument() {\r\n    (0,_stage_js__WEBPACK_IMPORTED_MODULE_0__.shiftDocument)(zTree, true);\r\n}\r\n\r\nfunction prevDocument() {\r\n    (0,_stage_js__WEBPACK_IMPORTED_MODULE_0__.shiftDocument)(zTree, false);\r\n}\r\n\r\n//zTree callbacks\r\nfunction dropInner(treeId, nodes, targetNode) {\r\n\r\n    return !targetNode || targetNode.isParent;\r\n}\r\n\r\nfunction onDrop(event, treeId, treeNodes, targetNode, type) {\r\n    if (treeNodes.length && targetNode) {\r\n        if (!targetNode.isParent)\r\n            targetNode = targetNode.getParentNode();\r\n        var node = treeNodes[0];\r\n        var oldExtra = node.extra;\r\n        node.isCopy = true;\r\n        node.name = 'página ' + targetNode.children.length + ' (cópia)';\r\n        node.extra = targetNode.extra + '_page' + targetNode.children.length;\r\n        zTree.updateNode(node);\r\n        (0,_stage_js__WEBPACK_IMPORTED_MODULE_0__.copyPage)(oldExtra, node.extra);\r\n        console.log(targetNode);\r\n    }\r\n}\r\n\r\nfunction beforeDrag(treeId, treeNodes) {\r\n    if (!treeNodes[0].canDrag)\r\n        return false;\r\n    return 1;\r\n    //return (treeNodes.length == 1 && treeNodes[0].canDragg && treeNodes[0].getParentNode().children.length > 1);\r\n}\r\n\r\nfunction showRemoveBtn(treeId, treeNode) {\r\n    return treeNode.isCopy;\r\n}\r\n\n\n//# sourceURL=webpack://Gama/./src/viewer/navigation.js?");

/***/ }),

/***/ "./src/viewer/page.js":
/*!****************************!*\
  !*** ./src/viewer/page.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getPageGroup\": () => (/* binding */ getPageGroup)\n/* harmony export */ });\nfunction getPageGroup(docGroup, docId, pageId, getPageUrl) {\r\n\r\n    return new Promise((resolve) => {\r\n\r\n        var pageGroup = docGroup.length ? docGroup[0].find('#' + pageId)[0] : null;\r\n        if (pageGroup) {\r\n            resolve({pageGroup: pageGroup, isNew: false});\r\n            return;\r\n        }\r\n\r\n        RichWidgets_Feedback_AjaxWait_show();\r\n\r\n        var url = getPageUrl.replace('{docId}', docId).replace('{pageId}', pageId);\r\n        $.get(url)\r\n            .done(function (data) {\r\n\r\n                setTimeout(() => { resolve(processData(data)); RichWidgets_Feedback_AjaxWait_hide();}, 10);\r\n\r\n            })\r\n            .fail(\r\n                () => resolve(0)\r\n            )\r\n    });\r\n\r\n}\r\n\r\nfunction processData(data) {\r\n\r\n    var pageGroup = new Konva.Group({ id: data.id });\r\n\r\n    var imageObj = new Image();\r\n    imageObj.onload = function () {\r\n        var img = new Konva.Image({\r\n            x: 50,\r\n            y: 50,\r\n            image: imageObj,\r\n            name: 'page-image',\r\n            stroke: 'red',\r\n            strokeWidth: 2\r\n        });\r\n        pageGroup.add(img);\r\n    };\r\n    imageObj.src = data.url;\r\n\r\n    var boxesGroup = new Konva.Group({ name: 'boxes' });\r\n\r\n    pageGroup.add(boxesGroup);\r\n\r\n    return {pageGroup: pageGroup, isNew: true};\r\n}\r\n\r\nfunction RichWidgets_Feedback_AjaxWait_show(){\r\n    $('.loading-banner').show();\r\n}\r\n\r\nfunction RichWidgets_Feedback_AjaxWait_hide(){\r\n    $('.loading-banner').hide();\r\n}\n\n//# sourceURL=webpack://Gama/./src/viewer/page.js?");

/***/ }),

/***/ "./src/viewer/stage.js":
/*!*****************************!*\
  !*** ./src/viewer/stage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"copyPage\": () => (/* binding */ copyPage),\n/* harmony export */   \"createStage\": () => (/* binding */ createStage),\n/* harmony export */   \"shiftDocument\": () => (/* binding */ shiftDocument),\n/* harmony export */   \"shiftPage\": () => (/* binding */ shiftPage),\n/* harmony export */   \"updateStage\": () => (/* binding */ updateStage)\n/* harmony export */ });\n/* harmony import */ var _page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page.js */ \"./src/viewer/page.js\");\n\r\n\r\nlet stage;\r\nlet layer;\r\nlet currentDocument;\r\nlet currentPage;\r\nlet getPageUrl;\r\n\r\nfunction createStage(settings) {\r\n\r\n    var container = document.getElementById(settings.konvaContainerId);\r\n\r\n    getPageUrl = settings.getPageUrl;\r\n\r\n    // first we need to create a stage\r\n    stage = new Konva.Stage({\r\n        container: container.id,   // id of container <div>\r\n        width: container.offsetWidth,\r\n        height: container.offsetHeight\r\n    });\r\n\r\n    // then create layer\r\n    layer = new Konva.Layer();\r\n\r\n\r\n    // add the layer to the stage\r\n    stage.add(layer);\r\n\r\n    addSelection();\r\n\r\n    // draw the image\r\n    //layer.draw();\r\n}\r\n\r\nfunction shiftPage(zTree, isForward) {\r\n\r\n    var page = zTree.getSelectedNodes()[0];\r\n\r\n    var nextPage = isForward ? page.getNextNode() : page.getPreNode();\r\n\r\n    if (!nextPage){\r\n\r\n        shiftDocument(zTree, isForward);\r\n        return;\r\n    }\r\n\r\n    var ids = nextPage.extra.split('_');\r\n    updateStage(ids[0], ids[1]);\r\n    zTree.selectNode(nextPage);\r\n}\r\n\r\nfunction shiftDocument(zTree, isForward) {\r\n\r\n    var currentDocNode = zTree.getNodeByParam('extra', currentDocument.attrs.id);\r\n\r\n    var nextDoc = isForward ? currentDocNode.getNextNode() : currentDocNode.getPreNode();\r\n\r\n    if (!nextDoc)\r\n        return;\r\n\r\n    var page = isForward ? nextDoc.children[0] : nextDoc.children[nextDoc.children.length - 1];\r\n\r\n    var ids = page.extra.split('_');\r\n\r\n    updateStage(ids[0], ids[1]);\r\n\r\n    if (!nextDoc.open)\r\n        zTree.expandNode(nextDoc);\r\n\r\n    zTree.selectNode(page);\r\n\r\n}\r\n\r\nfunction updateStage(docId, pageId) {\r\n\r\n    if (currentDocument && currentDocument.id == docId && currentPage.id == pageId)\r\n        return;\r\n\r\n    if (currentPage)\r\n        currentPage.hide();\r\n\r\n    var docGroup = stage.find('#' + docId);\r\n\r\n    if (!docGroup.length) {\r\n\r\n        addDocumentGroup(docId);\r\n\r\n    }\r\n    else {\r\n\r\n        currentDocument = docGroup[0];\r\n\r\n    }\r\n\r\n    (0,_page_js__WEBPACK_IMPORTED_MODULE_0__.getPageGroup)(docGroup, docId, pageId, getPageUrl)\r\n        .then((result) => {\r\n\r\n            if (result) {\r\n\r\n                if (result.isNew)\r\n                    currentDocument.add(result.pageGroup);\r\n\r\n                currentPage = result.pageGroup;\r\n                currentPage.show();\r\n            }\r\n        });\r\n\r\n}\r\n\r\nfunction addDocumentGroup(docId) {\r\n\r\n    var g = new Konva.Group({ id: docId });\r\n\r\n    layer.add(g);\r\n\r\n    currentDocument = g;\r\n}\r\n\r\nfunction copyPage(oldId, newId) {\r\n\r\n    oldId = oldId.split('_');\r\n    newId = newId.split('_');\r\n\r\n\r\n\r\n    var page = stage.find('#' + oldId[0])[0].find('#' + oldId[1])[0];\r\n\r\n    var clone = page.clone({\r\n        id: newId[1],\r\n    });\r\n\r\n    var image = page.children[1].attrs.image.cloneNode();\r\n\r\n    clone.children[1].attrs.image = image;\r\n\r\n    if (oldId[0] == newId[0]) {\r\n        page.getParent().add(clone);\r\n        updateStage(newId[0], newId[1]);\r\n        return;\r\n    }\r\n\r\n    var doc = stage.find('#' + newId[0]);\r\n\r\n    if (!doc.length)\r\n        addDocumentGroup(newId[0]);\r\n\r\n    currentDocument.add(clone);\r\n\r\n    updateStage(newId[0], newId[1]);\r\n}\r\n\r\n\r\n//-----------------------------------------------------------------------------------------\r\nfunction addSelection() {\r\n    var selectionRectangle = new Konva.Rect({\r\n        stroke: 'black',\r\n        strokeWidth: 1,\r\n        dash: [5, 2],\r\n        visible: false,\r\n    });\r\n    selectionRectangle.zIndex(2);\r\n\r\n    var x1, y1, x2, y2;\r\n    stage.on('mousedown touchstart', (e) => {\r\n        // do nothing if we mousedown on any shape\r\n        if (e.target === stage && !currentDocument) {\r\n            return;\r\n        }\r\n        e.evt.preventDefault();\r\n        currentDocument.add(selectionRectangle);\r\n        x1 = stage.getPointerPosition().x;\r\n        y1 = stage.getPointerPosition().y;\r\n        x2 = stage.getPointerPosition().x;\r\n        y2 = stage.getPointerPosition().y;\r\n\r\n        selectionRectangle.visible(true);\r\n        selectionRectangle.width(0);\r\n        selectionRectangle.height(0);\r\n    });\r\n\r\n    stage.on('mousemove touchmove', (e) => {\r\n        // do nothing if we didn't start selection\r\n        if (!selectionRectangle.visible()) {\r\n            return;\r\n        }\r\n        e.evt.preventDefault();\r\n        x2 = stage.getPointerPosition().x;\r\n        y2 = stage.getPointerPosition().y;\r\n\r\n        selectionRectangle.setAttrs({\r\n            x: Math.min(x1, x2),\r\n            y: Math.min(y1, y2),\r\n            width: Math.abs(x2 - x1),\r\n            height: Math.abs(y2 - y1),\r\n        });\r\n    });\r\n\r\n    stage.on('mouseup touchend', (e) => {\r\n        // do nothing if we didn't start selection\r\n        if (!selectionRectangle.visible()) {\r\n            return;\r\n        }\r\n        e.evt.preventDefault();\r\n        // update visibility in timeout, so we can check it in click event\r\n        setTimeout(() => {\r\n            selectionRectangle.visible(false);\r\n        });\r\n\r\n\r\n        var box = selectionRectangle.getClientRect();\r\n\r\n        var img = currentPage.find('.page-image')[0];\r\n\r\n        var canvas = document.createElement('canvas');\r\n        canvas.width = box.width;\r\n        canvas.height = box.height;\r\n        var context = canvas.getContext('2d');\r\n\r\n\r\n        // draw cropped image\r\n        var sourceX = img.attrs.x;\r\n        var sourceY = img.attrs.y;\r\n        var sourceWidth = img.width();\r\n        var sourceHeight = img.height();\r\n        var destWidth = box.width;\r\n        var destHeight = box.height;\r\n        var destX = box.x;\r\n        var destY = box.y;\r\n\r\n        context.drawImage(img.attrs.image, destX - sourceX, destY - sourceY, destWidth, destHeight, 0, 0,\r\n            destWidth, destHeight);\r\n\r\n\r\n        //context.putImageData(imagedata, 0, 0)s\r\n\r\n        img.attrs.image.src = canvas.toDataURL();\r\n\r\n\r\n    });\r\n\r\n    // clicks should select/deselect shapes\r\n    stage.on('click tap', function (e) {\r\n        // if we are selecting with rect, do nothing\r\n        if (selectionRectangle.visible()) {\r\n            return;\r\n        }\r\n\r\n        // if click on empty area - remove all selections\r\n        if (e.target === stage) {\r\n            //tr.nodes([]);\r\n            return;\r\n        }\r\n\r\n        // do nothing if clicked NOT on our rectangles\r\n        if (!e.target.hasName('rect')) {\r\n            return;\r\n        }\r\n\r\n        // do we pressed shift or ctrl?\r\n        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;\r\n        //const isSelected = tr.nodes().indexOf(e.target) >= 0;\r\n\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://Gama/./src/viewer/stage.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});