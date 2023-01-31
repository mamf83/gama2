import { createStage } from "./viewer/stage.js";
import { setNavigation } from "./viewer/navigation.js";

export function init(settings){
    createStage(settings);
    setNavigation(settings.zTree);
}