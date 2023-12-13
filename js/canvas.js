import { MAP_HEIGHT, MAP_WIDTH } from './map.js';
const CANVAS_ID = 'canvas';
const CONTEXT = '2d';
function htmlElementIsCanvas(element) {
    return (element.width !== undefined &&
        element.height !== undefined);
}
function adjustCanvasSize(canvas) {
    canvas.width = MAP_WIDTH;
    canvas.height = MAP_HEIGHT;
}
export function getCanvas() {
    const canvas = document.getElementById(CANVAS_ID);
    if (!htmlElementIsCanvas(canvas)) {
        throw new Error('HTML Element is not of type HTMLCanvasElement');
    }
    // TODO: Relocate this call
    adjustCanvasSize(canvas);
    return canvas;
}
export function getContext(canvas) {
    const context = canvas.getContext(CONTEXT);
    if (!context) {
        throw new Error('Context is null or undefined');
    }
    return context;
}
