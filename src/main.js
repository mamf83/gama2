import { createStage } from "./viewer/stage2.js";
import { setNavigation } from "./navigation/main.js";
import { setCurrentAttribute as _setCurrentAttribute } from "./attributes/main.js"

export function init(settings){
    createStage(settings);
    setNavigation(settings.navigation);
}

export function setCurrentAttribute(attribute){
    _setCurrentAttribute(attribute);
}