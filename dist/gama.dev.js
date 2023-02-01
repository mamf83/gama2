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

/***/ "./src/attributes/main.js":
/*!********************************!*\
  !*** ./src/attributes/main.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"currentAttribute\": () => (/* binding */ currentAttribute),\n/* harmony export */   \"setCurrentAttribute\": () => (/* binding */ setCurrentAttribute),\n/* harmony export */   \"updateAttribute\": () => (/* binding */ updateAttribute)\n/* harmony export */ });\nlet currentAttribute = null;\n\nfunction setCurrentAttribute(attribute){\n    currentAttribute = attribute;\n}\n\nfunction updateAttribute(pageId, box){\n\n    if(!currentAttribute.boxes){\n        currentAttribute.boxes = {};\n        currentAttribute.boxes[pageId] = [];\n    }\n\n    currentAttribute.boxes[pageId].push(box);\n\n}\n\n//# sourceURL=webpack://Gama/./src/attributes/main.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => (/* binding */ init),\n/* harmony export */   \"setCurrentAttribute\": () => (/* binding */ setCurrentAttribute)\n/* harmony export */ });\n/* harmony import */ var _viewer_stage2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewer/stage2.js */ \"./src/viewer/stage2.js\");\n/* harmony import */ var _navigation_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navigation/main.js */ \"./src/navigation/main.js\");\n/* harmony import */ var _attributes_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attributes/main.js */ \"./src/attributes/main.js\");\n\r\n\r\n\r\n\r\nfunction init(settings){\r\n    (0,_viewer_stage2_js__WEBPACK_IMPORTED_MODULE_0__.createStage)(settings);\r\n    (0,_navigation_main_js__WEBPACK_IMPORTED_MODULE_1__.setNavigation)(settings.navigation);\r\n}\r\n\r\nfunction setCurrentAttribute(attribute){\r\n    (0,_attributes_main_js__WEBPACK_IMPORTED_MODULE_2__.setCurrentAttribute)(attribute);\r\n}\n\n//# sourceURL=webpack://Gama/./src/main.js?");

/***/ }),

/***/ "./src/navigation/main.js":
/*!********************************!*\
  !*** ./src/navigation/main.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setNavigation\": () => (/* binding */ setNavigation)\n/* harmony export */ });\n/* harmony import */ var _viewer_stage2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../viewer/stage2.js */ \"./src/viewer/stage2.js\");\n/* harmony import */ var _zTree_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./zTree.js */ \"./src/navigation/zTree.js\");\n\n\n\nfunction setNavigation(navSettings) {\n\n    $(function () { \n\n        (0,_zTree_js__WEBPACK_IMPORTED_MODULE_1__.setZTreeSettings)(navSettings.zTreeId);\n\n        $(navSettings.nextPageSelector).on('click', () => nextPage(true));\n        $(navSettings.prevPageSelector).on('click', () =>  nextPage(false));\n        $(navSettings.nextDocumentSelector).on('click', () => nextDocument(true));\n        $(navSettings.prevDocumentSelector).on('click', () => nextDocument(false));\n    });\n}\n\nfunction nextPage(isForward) {\n    \n    var currentPage = getCurrentPage();\n\n    if(!currentPage) return;\n\n    var nextPage = isForward ? currentPage.getNextNode() : currentPage.getPrevNode();\n\n    if (!nextPage) {\n\n        nextDocument(isForward);\n        return;\n    }\n\n    var extra = nextPage.extra.split('_');\n\n    (0,_viewer_stage2_js__WEBPACK_IMPORTED_MODULE_0__.updateStage)(extra[0], extra[1]);\n\n    zTree.selectNode(nextPage);\n}\n\nfunction nextDocument(isForward) {\n\n    var currentPage = getCurrentPage();\n\n    if(!currentPage) return;\n\n    var currentDoc = currentPage.getParentNode();\n\n    var nextDoc = isForward ? currentDoc.getNextNode() : currentDoc.getPrevNode();\n\n    if (!nextDoc)\n        return;\n\n    var page = nextDoc.children[0];\n\n    var ids = page.extra.split('_');\n\n    (0,_viewer_stage2_js__WEBPACK_IMPORTED_MODULE_0__.updateStage)(ids[0], ids[1]);\n\n    if (!nextDoc.open)\n        zTree.expandNode(nextDoc);\n\n    zTree.selectNode(page);\n}\n\nfunction getCurrentPage(){\n\n    var selectedNodes = zTree.getSelectedNodes();\n\n    if(!selectedNodes.length)\n        return null;\n\n    return selectedNodes[0];\n\n}\n\n\n//# sourceURL=webpack://Gama/./src/navigation/main.js?");

/***/ }),

/***/ "./src/navigation/zTree.js":
/*!*********************************!*\
  !*** ./src/navigation/zTree.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setZTreeSettings\": () => (/* binding */ setZTreeSettings)\n/* harmony export */ });\n/* harmony import */ var _viewer_stage2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../viewer/stage2.js */ \"./src/viewer/stage2.js\");\n/* harmony import */ var _viewer_page_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../viewer/page/main.js */ \"./src/viewer/page/main.js\");\n\n\n\nlet zTree;\n\nconst gamaZTreeSetting = {\n    view: {\n        selectedMulti: false\n    },\n    edit: {\n        drag: {\n            autoExpandTrigger: true,\n            prev: true,\n            inner: dropInner,\n            next: true,\n            isMove: false,\n            isCopy: true\n        },\n        enable: true,\n        showRemoveBtn: showRemoveBtn\n    },\n    callback: {\n        onDrop: onDrop,\n        beforeDrag: beforeDrag,\n        onClick: showPage\n    },\n    data: { keep: { parent: true, leaf: true } }\n}\n\nfunction setZTreeSettings(zTreeId) {\n\n    zTree = $.fn.zTree.getZTreeObj(zTreeId);\n\n    $.extend(true, zTree.setting, gamaZTreeSetting);\n}\n\nfunction showPage(e, tId, node) {\n\n    if (node.isParent) return;\n\n    var ids = node.extra.split('_');\n\n    (0,_viewer_stage2_js__WEBPACK_IMPORTED_MODULE_0__.updateStage)(ids[0], ids[1]);\n\n    node.canDrag = true;\n\n}\n\nfunction dropInner(treeId, nodes, targetNode) {\n\n    return !targetNode || targetNode.isParent;\n}\n\nfunction onDrop(event, treeId, treeNodes, targetNode, type) {\n\n    if (treeNodes.length && targetNode) {\n\n        if (!targetNode.isParent)\n            targetNode = targetNode.getParentNode();\n\n        var node = treeNodes[0];\n        var oldExtra = node.extra;\n        node.isCopy = true;\n        node.name = 'página ' + targetNode.children.length + ' (cópia)';\n        node.extra = targetNode.extra + '_page' + targetNode.children.length;\n        zTree.updateNode(node);\n        (0,_viewer_page_main_js__WEBPACK_IMPORTED_MODULE_1__.copyPage)(oldExtra, node.extra);\n    \n    }\n}\n\nfunction beforeDrag(treeId, treeNodes) {\n    if (!treeNodes[0].canDrag)\n        return false;\n    return 1;\n    //return (treeNodes.length == 1 && treeNodes[0].canDragg && treeNodes[0].getParentNode().children.length > 1);\n}\n\nfunction showRemoveBtn(treeId, treeNode) {\n    return treeNode.isCopy;\n}\n\n//# sourceURL=webpack://Gama/./src/navigation/zTree.js?");

/***/ }),

/***/ "./src/viewer/boxes/events.js":
/*!************************************!*\
  !*** ./src/viewer/boxes/events.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addPolygonEvents\": () => (/* binding */ addPolygonEvents)\n/* harmony export */ });\n/* harmony import */ var _attributes_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../attributes/main */ \"./src/attributes/main.js\");\n/* harmony import */ var _page_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../page/events */ \"./src/viewer/page/events.js\");\n\n\n\nfunction addPolygonEvents(polygon){\n\n    poly.on('mouseover', function (evt) {\n        if (!_attributes_main__WEBPACK_IMPORTED_MODULE_0__.currentAttribute || _page_events__WEBPACK_IMPORTED_MODULE_1__.isSelecting) { return; }\n        var shape = evt.target;\n        Konva.stages[0].container().style.cursor = 'pointer';\n\n        if (!shape.selected2) {\n            shape.fill('rgba(138, 54, 54, 0.3)');\n            shape.stroke('rgba(200, 54, 54, 1)');\n\n        }\n    });\n\n    poly.on('mouseout', function (evt) {\n        if (!_attributes_main__WEBPACK_IMPORTED_MODULE_0__.currentAttribute || _page_events__WEBPACK_IMPORTED_MODULE_1__.isSelecting) { return; }\n\n        var shape = evt.target;\n        Konva.stages[0].container().style.cursor = 'default';\n\n        if (!shape.selected2) {\n            shape.fill('rgba(0, 0, 0, 0)');\n            shape.stroke('rgba(0, 0, 0, 0)');\n\n        }\n\n    });\n\n    poly.on('click', function (evt) {\n\n        if (!_attributes_main__WEBPACK_IMPORTED_MODULE_0__.currentAttribute || _page_events__WEBPACK_IMPORTED_MODULE_1__.isSelecting) return;\n\n        var shape = evt.target;\n        document.body.style.cursor = 'default';\n\n        if (!poly.prevent) {\n\n            (0,_attributes_main__WEBPACK_IMPORTED_MODULE_0__.updateAttribute)(evt.currentTarget.parent.parent.attrs.id, evt.target.box);\n\n        } else {\n            poly.prevent = false;\n        }\n\n        if (shape.selected2) {\n            shape.fill('rgba(0, 0, 0, 0)');\n            shape.stroke('rgba(0, 0, 0, 0)');\n\n        } else {\n            shape.fill('rgba(108, 171, 118, 0.3)');\n            shape.stroke('rgba(108, 171, 118, 1)');\n\n        }\n\n        shape.selected2 = !shape.selected2\n    });\n}\n\n//# sourceURL=webpack://Gama/./src/viewer/boxes/events.js?");

/***/ }),

/***/ "./src/viewer/boxes/main.js":
/*!**********************************!*\
  !*** ./src/viewer/boxes/main.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createBoxes\": () => (/* binding */ createBoxes)\n/* harmony export */ });\n/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events.js */ \"./src/viewer/boxes/events.js\");\n\n\nfunction createBoxes(boxes, image, pageWidth, pageHeight) {\n\n    let boxesGroup = new Konva.Group({ name: \"boxes\" });\n    boxesGroup.x(0);\n    boxesGroup.y(0);\n\n    if (!boxes.polygons || !boxes.polygons.length)\n        return;\n\n    var container = Konva.stages[0].container();\n\n    var containerHeight = container.offsetHeight;\n\n    boxes.polygons.forEach((polygon) => boxesGroup.add(createBox(polygon, image, containerHeight, pageWidth, pageHeight)));\n\n\n    // add a new feature, lets add ability to draw selection rectangle\n    var selectionRectangle = new Konva.Rect({\n        fill: 'rgba(177, 179, 200 ,0.5)',\n        stroke: 'rgba(177, 179, 200 ,1)',\n        strokeWidth: 1.2,\n        visible: false,\n    });\n\n    boxesGroup.add(selectionRectangle);\n\n    return boxesGroup;\n}\nfunction createBox(polygon, image, containerHeight, pageWidth, pageHeight) {\n\n    let points = polygon.vertices;\n    let final = []\n\n    for (let i = 0; i < points.length; i++) {\n        final.push(points[i][0] / (pageWidth / image.width()))\n        final.push(points[i][1] / (pageHeight / image.height()))\n    }\n\n    var poly = new Konva.Line({\n        points: final,\n        fill: 'rgba(0, 0, 0, 0)',\n        stroke: 'rgba(0, 0, 0, 0)',\n        strokeWidth: 0.4,\n        closed: true,\n        name: \"helper_box\"\n    });\n\n    box.vertices.forEach((vertice) => {\n\n\n    });\n    for (let i = 0; i < box[\"vertices\"].length; i++) {\n        box[\"vertices\"][i][0] = polygon[\"vertices\"][i][0] / imageSize[0];\n        polygon[\"vertices\"][i][1] = polygon[\"vertices\"][i][1] / imageSize[1];\n    }\n\n\n\n    poly.box = polygon;\n    poly.box.pageIndex = 0;\n    poly.prevent = false;\n    poly.selected2 = false;\n\n    (0,_events_js__WEBPACK_IMPORTED_MODULE_0__.addPolygonEvents)(poly);\n\n    group.add(poly);\n\n}\n\n\n\n//# sourceURL=webpack://Gama/./src/viewer/boxes/main.js?");

/***/ }),

/***/ "./src/viewer/controls.js":
/*!********************************!*\
  !*** ./src/viewer/controls.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handleClick\": () => (/* binding */ handleClick),\n/* harmony export */   \"handleZoom\": () => (/* binding */ handleZoom)\n/* harmony export */ });\n//import { getPolygroup } from '../utils/utils.js';\n//import { addVertice, updateBallSize, setScale} from '../utils/polygons.js';\nKonva.dragButtons = [0];\nvar scaleBy = 0.85;\nvar scale = 1;\n\nfunction handleZoom(e){\n    e.evt.preventDefault();\n    var stage = e.currentTarget;\n    var oldScale = stage.scaleX();\n\n    var pointer = stage.getPointerPosition();\n\n    var mousePointTo = {\n        x: (pointer.x - stage.x()) / oldScale,\n        y: (pointer.y - stage.y()) / oldScale,\n    };\n\n    var newScale =\n        e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;\n\n    newScale = Math.max(1, Math.min(10, newScale));\n    stage.scale({ x: newScale, y: newScale });\n    scale = newScale;\n    //Annotator.polygons.updateBallSize(stage.scale().x);\n\n    var newPos = {\n        x: pointer.x - mousePointTo.x * newScale,\n        y: pointer.y - mousePointTo.y * newScale,\n    };\n    stage.position(newPos);\n}\n\nfunction handleClick(e) {\n    var stage = e.currentTarget;\n    if (e.evt.button === 0) {\n        var pos = Annotator.utils.getPolygroup(stage).getRelativePointerPosition();\n        Annotator.polygons.addVertice(stage, pos.x, pos.y)\n    } else {\n        e.evt.preventDefault()\n        // cancel building\n    }\n\n}\n\n\n//# sourceURL=webpack://Gama/./src/viewer/controls.js?");

/***/ }),

/***/ "./src/viewer/document/main.js":
/*!*************************************!*\
  !*** ./src/viewer/document/main.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addDocumentGroup\": () => (/* binding */ addDocumentGroup),\n/* harmony export */   \"getCurrentDocument\": () => (/* binding */ getCurrentDocument),\n/* harmony export */   \"setCurrentDocument\": () => (/* binding */ setCurrentDocument)\n/* harmony export */ });\nlet currentDocument = null;\n\nfunction addDocumentGroup(docId) {\n\n    return new Konva.Group({ id: docId });\n}\n\nfunction setCurrentDocument(doc){\n    currentDocument = doc;\n}\n\nfunction getCurrentDocument(){\n    return currentDocument;\n}\n\n//# sourceURL=webpack://Gama/./src/viewer/document/main.js?");

/***/ }),

/***/ "./src/viewer/page/events.js":
/*!***********************************!*\
  !*** ./src/viewer/page/events.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addPageEvents\": () => (/* binding */ addPageEvents),\n/* harmony export */   \"isSelecting\": () => (/* binding */ isSelecting)\n/* harmony export */ });\n/* harmony import */ var _attributes_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../attributes/main */ \"./src/attributes/main.js\");\n\n\nlet isSelecting = false;\n\nfunction addPageEvents(page) {\n\n    var x1, y1, x2, y2;\n\n    page.getParent().on('mousedown touchstart', (e) => {\n\n        if (!_attributes_main__WEBPACK_IMPORTED_MODULE_0__.currentAttribute || e.evt.button !== 2) { return; }\n\n        // if image was already loaded\n        y1 = page.getRelativePointerPosition().y;\n        x1 = page.getRelativePointerPosition().x;\n        x2 = page.getRelativePointerPosition().x;\n        y2 = page.getRelativePointerPosition().y;\n\n        selectionRectangle.visible(true);\n        selectionRectangle.width(0);\n        selectionRectangle.height(0);\n        isSelecting = true;\n\n\n    });\n\n    page.getParent().on('mousemove touchmove', (e) => {\n\n\n        // no nothing if we didn't start selection\n        if (!_attributes_main__WEBPACK_IMPORTED_MODULE_0__.currentAttribute || !selectionRectangle.visible()) {\n            return;\n        }\n\n        x2 = page.getRelativePointerPosition().x;\n        y2 = page.getRelativePointerPosition().y;\n\n        selectionRectangle.setAttrs({\n            x: Math.min(x1, x2),\n            y: Math.min(y1, y2),\n            width: Math.abs(x2 - x1),\n            height: Math.abs(y2 - y1),\n        });\n    });\n\n    page.getParent().on('mouseup touchend', () => {\n\n        // no nothing if we didn't start selection\n        if (!_attributes_main__WEBPACK_IMPORTED_MODULE_0__.currentAttribute || !selectionRectangle.visible()) {\n            return;\n        }\n        // update visibility in timeout, so we can check it in click event\n        setTimeout(() => {\n            selectionRectangle.visible(false);\n        });\n\n        var shapes = currentPage.find('.boxes')[0].find('.helper_box');\n        var box = selectionRectangle.getClientRect();\n        var selected = shapes.filter((shape) =>\n            Konva.Util.haveIntersection(box, shape.getClientRect())\n        );\n\n        isSelecting = false;\n        selected.forEach(s => {\n            //if (!s.selected2)\n            s.fire('click');\n        });\n    });\n}\n\n//# sourceURL=webpack://Gama/./src/viewer/page/events.js?");

/***/ }),

/***/ "./src/viewer/page/main.js":
/*!*********************************!*\
  !*** ./src/viewer/page/main.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"copyPage\": () => (/* binding */ copyPage),\n/* harmony export */   \"getCurrentPage\": () => (/* binding */ getCurrentPage),\n/* harmony export */   \"getPageGroup\": () => (/* binding */ getPageGroup)\n/* harmony export */ });\n/* harmony import */ var _stage2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stage2.js */ \"./src/viewer/stage2.js\");\n/* harmony import */ var _boxes_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../boxes/main.js */ \"./src/viewer/boxes/main.js\");\n/* harmony import */ var _document_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../document/main.js */ \"./src/viewer/document/main.js\");\n\n\n\n\nlet currentPage = null;\n\nfunction getCurrentPage() {\n    return currentPage;\n}\n\nfunction getPageGroup(docGroup, docId, pageId, getPageUrl) {\n\n    return new Promise((resolve) => {\n\n        var pageGroup = docGroup.length ? docGroup[0].find('#' + pageId)[0] : null;\n\n        if (pageGroup) {\n\n            resolve({ pageGroup: pageGroup, isNew: false });\n            currentPage = pageGroup;\n            return;\n        }\n\n        if (typeof RichWidgets_Feedback_AjaxWait_show !== 'undefined')\n            RichWidgets_Feedback_AjaxWait_show();\n\n        var url = getPageUrl.replace('{docId}', docId).replace('{pageId}', pageId);\n\n        $.get(url)\n            .done(function (data) {\n\n                currentPage = processData(data);\n                resolve({ pageGroup: currentPage, isNew: true });\n\n                if (typeof RichWidgets_Feedback_AjaxWait_hide !== 'undefined')\n                    RichWidgets_Feedback_AjaxWait_hide();\n\n            })\n            .fail(\n                () => resolve(0)\n            )\n    });\n\n}\n\nfunction processData(data) {\n\n    var pageGroup = new Konva.Group({ id: data.id });\n\n    var image = new Konva.Image({\n        name: 'page-image'\n    });\n\n    setPageDimensions(pageGroup, image, data.width, data.height);\n\n    var imageObj = new Image();\n    imageObj.onload = function () {\n        image.image(imageObj);\n    };\n    imageObj.src = data.url;\n\n    pageGroup.add(image);\n\n    pageGroup.add((0,_boxes_main_js__WEBPACK_IMPORTED_MODULE_1__.createBoxes)(image, [data.width, data.height], { polygons: data.boxes }));\n\n    return pageGroup;\n}\n\nfunction copyPage(oldId, newId) {\n\n    oldId = oldId.split('_');\n    newId = newId.split('_');\n\n\n\n    var page = _stage2_js__WEBPACK_IMPORTED_MODULE_0__.stage.find('#' + oldId[0])[0].find('#' + oldId[1])[0];\n\n    var clone = page.clone({\n        id: newId[1],\n    });\n\n    var image = page.children[1].attrs.image.cloneNode();\n\n    clone.children[1].attrs.image = image;\n\n    if (oldId[0] == newId[0]) {\n        page.getParent().add(clone);\n        updateStage(newId[0], newId[1]);\n        return;\n    }\n\n    var doc = _stage2_js__WEBPACK_IMPORTED_MODULE_0__.stage.find('#' + newId[0]);\n\n    if (!doc.length)\n        addDocumentGroup(newId[0]);\n\n    _document_main_js__WEBPACK_IMPORTED_MODULE_2__.getCurrentDocument.add(clone);\n\n    updateStage(newId[0], newId[1]);\n}\n\nfunction setPageDimensions(pageGroup, image, width, height) {\n\n    var dimensions = calculateDimensions(_stage2_js__WEBPACK_IMPORTED_MODULE_0__.stage.container(), width, height);\n\n    // set group properties\n    pageGroup.x(dimensions.x + dimensions.width / 2);\n    pageGroup.y(dimensions.y + dimensions.height / 2);\n    pageGroup.width(dimensions.width);\n    pageGroup.height(dimensions.height);\n    pageGroup.offsetX(dimensions.width / 2);\n    pageGroup.offsetY(dimensions.height / 2);\n\n    // set image properties and add to group\n    image.x(0);\n    image.y(0);\n    image.width(dimensions.width);\n    image.height(dimensions.height);\n}\n\nfunction calculateDimensions(container, imageW, imageH) {\n\n    // get current container size\n    var width = container.offsetWidth;\n    var height = container.offsetHeight;\n\n    // calculate size to fit screen\n    var ratio = imageH / imageW;\n    var newImageW = 0.95 * height / ratio;\n    var newImageH = 0.95 * height;\n\n    // calculate coordinates to center\n    var x = (width / 2) - (newImageW / 2);\n    var y = (height / 2) - (newImageH / 2);\n\n    return { x: x, y: y, width: newImageW, height: newImageH };\n}\n\n//# sourceURL=webpack://Gama/./src/viewer/page/main.js?");

/***/ }),

/***/ "./src/viewer/stage2.js":
/*!******************************!*\
  !*** ./src/viewer/stage2.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createStage\": () => (/* binding */ createStage),\n/* harmony export */   \"stage\": () => (/* binding */ stage),\n/* harmony export */   \"updateStage\": () => (/* binding */ updateStage)\n/* harmony export */ });\n/* harmony import */ var _controls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controls.js */ \"./src/viewer/controls.js\");\n/* harmony import */ var _document_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./document/main.js */ \"./src/viewer/document/main.js\");\n/* harmony import */ var _page_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page/main.js */ \"./src/viewer/page/main.js\");\n\r\n\r\n\r\n\r\nlet stage;\r\nlet layer;\r\nlet getPageUrl;\r\n\r\nfunction createStage(settings) {\r\n\r\n    var container = document.getElementById(settings.konvaContainerId);\r\n\r\n    getPageUrl = settings.getPageUrl;\r\n\r\n    var width = container.offsetWidth;\r\n    var height = container.offsetHeight;\r\n    // first we need to create a stage\r\n    stage = new Konva.Stage({\r\n        container: container.id,\r\n        width,\r\n        height,\r\n        draggable: true,\r\n        // Function responsible for bounding the drag\r\n        dragBoundFunc: dragBoundFunc\r\n    });\r\n\r\n    // then create layer\r\n    layer = new Konva.Layer();\r\n\r\n    // add the layer to the stage\r\n    stage.add(layer);\r\n\r\n    stage.on('wheel', (e) => {\r\n        (0,_controls_js__WEBPACK_IMPORTED_MODULE_0__.handleZoom)(e);\r\n    });\r\n\r\n    window.addEventListener('resize', centerImage);\r\n}\r\n\r\nfunction dragBoundFunc (pos) {\r\n    let newY = (pos.y) < -(height) * 0.9 * this.scale().y ? -height * 0.9 * this.scale().y : pos.y\r\n    newY = newY > (height) * 0.9 * this.scale().y ? height * 0.9 * this.scale().y : newY;\r\n    let newX = (pos.x) < (-width) * 0.70 * this.scale().x ? -width * 0.70 * this.scale().x : pos.x\r\n    newX = (newX) > (width) * 0.7 * this.scale().x ? width * 0.7 * this.scale().x : newX;\r\n    return {\r\n        x: newX,\r\n        y: newY,\r\n    };\r\n}\r\n\r\nfunction updateStage(docId, pageId) {\r\n\r\n    var currentDocument = (0,_document_main_js__WEBPACK_IMPORTED_MODULE_1__.getCurrentDocument)();\r\n    var currentPage = (0,_page_main_js__WEBPACK_IMPORTED_MODULE_2__.getCurrentPage)();\r\n\r\n    if (currentDocument && currentDocument.id == docId && currentPage.id == pageId)\r\n        return;\r\n\r\n    if (currentPage)\r\n        currentPage.hide();\r\n\r\n    var docGroup = stage.find('#' + docId);\r\n\r\n    if (!docGroup.length) {\r\n\r\n        (0,_document_main_js__WEBPACK_IMPORTED_MODULE_1__.addDocumentGroup)(docId);\r\n    }\r\n    else {\r\n\r\n        (0,_document_main_js__WEBPACK_IMPORTED_MODULE_1__.setCurrentDocument)(docGroup[0]);\r\n    }\r\n\r\n    (0,_page_main_js__WEBPACK_IMPORTED_MODULE_2__.getPageGroup)(docGroup, docId, pageId, getPageUrl)\r\n        .then((result) => {\r\n\r\n            if (result) {\r\n\r\n                if (result.isNew)\r\n                    (0,_document_main_js__WEBPACK_IMPORTED_MODULE_1__.getCurrentDocument)().add(result.pageGroup);\r\n\r\n                result.pageGroup.show();\r\n                centerImage();\r\n            }\r\n        });\r\n\r\n}\r\n\r\nfunction centerImage() {\r\n    var container = stage.container();\r\n    var dimensions = calculateDimensions(container, 1965, 2035);\r\n\r\n    var width = container.offsetWidth;\r\n    var height = container.offsetHeight;\r\n\r\n    stage.width(width);\r\n    stage.height(height);\r\n    stage.scale({ x: 1, y: 1 });\r\n\r\n    if (layer.getChildren().length > 1) {\r\n        var img = layer.getChildren()[0];\r\n        img.width(dimensions.width);\r\n        img.height(dimensions.height);\r\n        img.x(dimensions.x)\r\n        img.y(dimensions.y)\r\n    }\r\n\r\n    stage.position({\r\n        x: 0,\r\n        y: 0\r\n    })\r\n}\r\n\r\nfunction calculateDimensions(container, imageW, imageH) {\r\n    // get current container size\r\n    var width = container.offsetWidth;\r\n    var height = container.offsetHeight;\r\n\r\n    // calculate size to fit screen\r\n    var ratio = imageH / imageW;\r\n    var newImageW = 0.95 * height / ratio;\r\n    var newImageH = 0.95 * height;\r\n\r\n    // calculate coordinates to center\r\n    var x = (width / 2) - (newImageW / 2);\r\n    var y = (height / 2) - (newImageH / 2);\r\n\r\n    return { x: x, y: y, width: newImageW, height: newImageH };\r\n}\r\n\r\n\r\n//-----------------------------------------------------------------------------------------\r\nfunction addSelection() {\r\n    var selectionRectangle = new Konva.Rect({\r\n        stroke: 'black',\r\n        strokeWidth: 1,\r\n        dash: [5, 2],\r\n        visible: false,\r\n    });\r\n    selectionRectangle.zIndex(2);\r\n\r\n    var x1, y1, x2, y2;\r\n    stage.on('mousedown touchstart', (e) => {\r\n        // do nothing if we mousedown on any shape\r\n        if (e.target === stage && !currentDocument) {\r\n            return;\r\n        }\r\n        e.evt.preventDefault();\r\n        currentDocument.add(selectionRectangle);\r\n        x1 = stage.getPointerPosition().x;\r\n        y1 = stage.getPointerPosition().y;\r\n        x2 = stage.getPointerPosition().x;\r\n        y2 = stage.getPointerPosition().y;\r\n\r\n        selectionRectangle.visible(true);\r\n        selectionRectangle.width(0);\r\n        selectionRectangle.height(0);\r\n    });\r\n\r\n    stage.on('mousemove touchmove', (e) => {\r\n        // do nothing if we didn't start selection\r\n        if (!selectionRectangle.visible()) {\r\n            return;\r\n        }\r\n        e.evt.preventDefault();\r\n        x2 = stage.getPointerPosition().x;\r\n        y2 = stage.getPointerPosition().y;\r\n\r\n        selectionRectangle.setAttrs({\r\n            x: Math.min(x1, x2),\r\n            y: Math.min(y1, y2),\r\n            width: Math.abs(x2 - x1),\r\n            height: Math.abs(y2 - y1),\r\n        });\r\n    });\r\n\r\n    stage.on('mouseup touchend', (e) => {\r\n        // do nothing if we didn't start selection\r\n        if (!selectionRectangle.visible()) {\r\n            return;\r\n        }\r\n        e.evt.preventDefault();\r\n        // update visibility in timeout, so we can check it in click event\r\n        setTimeout(() => {\r\n            selectionRectangle.visible(false);\r\n        });\r\n\r\n\r\n        var box = selectionRectangle.getClientRect();\r\n\r\n        var img = currentPage.find('.page-image')[0];\r\n\r\n        var canvas = document.createElement('canvas');\r\n        canvas.width = box.width;\r\n        canvas.height = box.height;\r\n        var context = canvas.getContext('2d');\r\n\r\n\r\n        // draw cropped image\r\n        var sourceX = img.attrs.x;\r\n        var sourceY = img.attrs.y;\r\n        var sourceWidth = img.width();\r\n        var sourceHeight = img.height();\r\n        var destWidth = box.width;\r\n        var destHeight = box.height;\r\n        var destX = box.x;\r\n        var destY = box.y;\r\n\r\n        context.drawImage(img.attrs.image, destX - sourceX, destY - sourceY, destWidth, destHeight, 0, 0,\r\n            destWidth, destHeight);\r\n\r\n\r\n        //context.putImageData(imagedata, 0, 0)s\r\n\r\n        img.attrs.image.src = canvas.toDataURL();\r\n\r\n\r\n    });\r\n\r\n    // clicks should select/deselect shapes\r\n    stage.on('click tap', function (e) {\r\n        // if we are selecting with rect, do nothing\r\n        if (selectionRectangle.visible()) {\r\n            return;\r\n        }\r\n\r\n        // if click on empty area - remove all selections\r\n        if (e.target === stage) {\r\n            //tr.nodes([]);\r\n            return;\r\n        }\r\n\r\n        // do nothing if clicked NOT on our rectangles\r\n        if (!e.target.hasName('rect')) {\r\n            return;\r\n        }\r\n\r\n        // do we pressed shift or ctrl?\r\n        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;\r\n        //const isSelected = tr.nodes().indexOf(e.target) >= 0;\r\n\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://Gama/./src/viewer/stage2.js?");

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