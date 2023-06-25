// Setup the Canvas
const gridfinityUnitMM = 42;
const gridRenderOffset = 150;
const metricLineHeight = 140;
const metricPossibleLineHeight = 100;
const metricPossibleTopTextY = 80;
const metricPossibleLeftTextX = 80;
const metricTopTextX = 140;
const metricTopTextY = 130;
const metricLeftTextX = 30;
const metricLeftTextY = 140;

const canvas = document.getElementById('main-canvas');
const canvasWidth = 1000;
const canvasHeight = 1000;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.background = 'gray';

const context = canvas.getContext('2d');

function renderFrame(
    availableDepthsMM, 
    availableWidthMM, 
    maxUnitsDepths, 
    maxUnitsWidth, 
    remainingSpaceDepth, 
    remainingSpaceWidth) {
    context.clearRect(0, 0, canvasWidth, canvasHeight)

    // render available space
    context.fillStyle = 'red';
    context.fillRect(
        gridRenderOffset, 
        gridRenderOffset,
        availableWidthMM,
        availableDepthsMM);

    // render space used by frame
    context.fillStyle = 'skyblue';
    context.fillRect(
        gridRenderOffset, 
        gridRenderOffset,
        maxUnitsWidth * gridfinityUnitMM,
        maxUnitsDepths * gridfinityUnitMM);

    context.strokeStyle = 'black';
    context.strokeWidth = '1px';
    for (let w = 0; w < maxUnitsWidth; w++) {
        for (let d = 0; d < maxUnitsDepths; d++) {
            context.strokeRect(
                gridRenderOffset + gridfinityUnitMM * w, 
                gridRenderOffset + gridfinityUnitMM * d, 
                gridfinityUnitMM, 
                gridfinityUnitMM);
        }
    }

    // render metric indications
    if (availableWidthMM) {
        renderAvailableTopLines(availableWidthMM);
        renderPossibleTopLines(maxUnitsWidth * gridfinityUnitMM);
        renderAvailableTopText(availableWidthMM);
        renderPossibleTopText(maxUnitsWidth);
    }    

    if (availableDepthsMM) {
        renderAvailableLeftLines(availableDepthsMM);
        renderPossibleLeftLines(maxUnitsDepths * gridfinityUnitMM);
        renderAvailableLeftText(availableDepthsMM);
        renderPossibleLeftText(maxUnitsDepths);
    }        
}

function renderAvailableTopLines(availableWidthMM) {
    context.strokeStyle = 'green';
    context.strokeWidth = '1px';

    // top start line
    context.beginPath();
    context.moveTo(gridRenderOffset, gridRenderOffset);
    context.lineTo(gridRenderOffset, metricLineHeight);
    context.stroke();

    // top end line
    context.beginPath();
    context.moveTo(gridRenderOffset + availableWidthMM, gridRenderOffset);
    context.lineTo(gridRenderOffset + availableWidthMM, metricLineHeight);
    context.stroke();

    // top span line
    context.beginPath();
    context.moveTo(gridRenderOffset, metricLineHeight);
    context.lineTo(gridRenderOffset + availableWidthMM, metricLineHeight);
    context.stroke();
}

function renderPossibleTopLines(totalGridWidth) {
    context.strokeStyle = 'skyblue';
    context.strokeWidth = '1px';

    // top start line
    context.beginPath();
    context.moveTo(gridRenderOffset, gridRenderOffset);
    context.lineTo(gridRenderOffset, metricPossibleLineHeight);
    context.stroke();

    // top end line
    context.beginPath();
    context.moveTo(gridRenderOffset + totalGridWidth, gridRenderOffset);
    context.lineTo(gridRenderOffset + totalGridWidth, metricPossibleLineHeight);
    context.stroke();

    // top span line
    context.beginPath();
    context.moveTo(gridRenderOffset, metricPossibleLineHeight);
    context.lineTo(gridRenderOffset + totalGridWidth, metricPossibleLineHeight);
    context.stroke();
}

function renderAvailableLeftLines(availableDepthsMM) {
    context.strokeStyle = 'green';
    context.strokeWidth = '1px';

    // left start line
    context.beginPath();
    context.moveTo(gridRenderOffset, gridRenderOffset);
    context.lineTo(metricLineHeight, gridRenderOffset);
    context.stroke();

    // left end line
    context.beginPath();
    context.moveTo(gridRenderOffset, gridRenderOffset + availableDepthsMM);
    context.lineTo(metricLineHeight, gridRenderOffset + availableDepthsMM);
    context.stroke();

    // left span line
    context.beginPath();
    context.moveTo(metricLineHeight, gridRenderOffset);
    context.lineTo(metricLineHeight, gridRenderOffset + availableDepthsMM);
    context.stroke();
}

function renderPossibleLeftLines(totalGridDepth) {
    context.strokeStyle = 'skyblue';
    context.strokeWidth = '1px';

    // left start line
    context.beginPath();
    context.moveTo(gridRenderOffset, gridRenderOffset);
    context.lineTo(metricPossibleLineHeight, gridRenderOffset);
    context.stroke();

    // left end line
    context.beginPath();
    context.moveTo(gridRenderOffset, gridRenderOffset + totalGridDepth);
    context.lineTo(metricPossibleLineHeight, gridRenderOffset + totalGridDepth);
    context.stroke();

    // left span line
    context.beginPath();
    context.moveTo(metricPossibleLineHeight, gridRenderOffset);
    context.lineTo(metricPossibleLineHeight, gridRenderOffset + totalGridDepth);
    context.stroke();
}

function renderAvailableTopText(availableWidthMM) {
    const xPadding = 15;
    context.font = "20px serif";
    context.fillStyle = 'yellow';
    context.fillText(`${availableWidthMM} mm`, metricTopTextX + xPadding, metricTopTextY);
}

function renderPossibleTopText(maxGridWidthCount) {
    const xPadding = 10;
    context.font = "20px serif";
    context.fillStyle = 'white';
    context.fillText(`${maxGridWidthCount} tiles`, metricTopTextX + xPadding, metricPossibleTopTextY);
}

function renderAvailableLeftText(availableDepthMM) {
    const yPadding = 15;
    const text = `${availableDepthMM} mm`;
    context.font = "20px serif";
    context.fillStyle = 'yellow';
    context.save();
    context.translate(gridRenderOffset - metricLeftTextX, metricLeftTextY + yPadding);
    context.rotate(90 * (Math.PI / 180));
    context.fillText(text, 0, 0);
    context.restore();
}

function renderPossibleLeftText(maxGridDepthCount) {
    const yPadding = 10;
    const text = `${maxGridDepthCount} tiles`;
    context.font = "20px serif";
    context.fillStyle = 'white';
    context.save();
    context.translate(gridRenderOffset - metricPossibleLeftTextX, metricLeftTextY + yPadding);
    context.rotate(90 * (Math.PI / 180));
    context.fillText(text, 0, 0);
    context.restore();
}

function dimentionsChanged() {
    const availableDepths = document.getElementById("max-depth-input").value;
    const availableWidth = document.getElementById("max-width-input").value;
    const availableDepthsMM = parseInt(availableDepths);
    const availableWidthMM = parseInt(availableWidth);
    
    if ((isNaN(availableDepthsMM) && availableDepths) || 
        (isNaN(availableWidthMM) && availableWidth)) {
        alert('provide numerical values!');
        return;
    }

    const maxUnitsDepths = Math.floor(availableDepthsMM / gridfinityUnitMM);
    const maxUnitsWidth = Math.floor(availableWidthMM / gridfinityUnitMM);
    
    const remainingSpaceDepth = availableDepthsMM % gridfinityUnitMM;
    const remainingSpaceWidth = availableWidthMM % gridfinityUnitMM;
    
    renderFrame(
        availableDepthsMM,
        availableWidthMM, 
        maxUnitsDepths, 
        maxUnitsWidth, 
        remainingSpaceDepth, 
        remainingSpaceWidth)
}