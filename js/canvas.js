import { STATUS_BAR_HEIGHT } from './graphics.js';
import { MAP_HEIGHT, MAP_WIDTH } from './map.js';
const CANVAS_ID = 'canvas';
const CONTEXT = '2d';
function htmlElementIsCanvas(element) {
    return (element.width !== undefined &&
        element.height !== undefined);
}
export function adjustCanvasSize(canvas) {
    canvas.width = MAP_WIDTH;
    canvas.height = MAP_HEIGHT + STATUS_BAR_HEIGHT;
}
export function getCanvas() {
    const canvas = document.getElementById(CANVAS_ID);
    if (!htmlElementIsCanvas(canvas)) {
        throw new Error('HTML Element is not of type HTMLCanvasElement');
    }
    return canvas;
}
export function getContext(canvas) {
    const context = canvas.getContext(CONTEXT);
    if (!context) {
        throw new Error('Context is null or undefined');
    }
    return context;
}
