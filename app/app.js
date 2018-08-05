(() => {
    let draw, foregroundCanvas, hiddenCanvas;
    const launch = () => {
        let canvases = document.querySelectorAll('canvas');
        if (canvases.length < 2) {
            consol.error('No canvas elements found, exiting');
            return;
        }
        [foregroundCanvas, hiddenCanvas] = canvases;
        draw();
    };
    document.addEventListener('DOMContentLoaded', launch);

    draw = () => {
        const ctx = foregroundCanvas.getContext('2d');
        let centerX = foregroundCanvas.width / 2,
            centerY = foregroundCanvas.height / 2,
            radius = 10;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();

        centerX = foregroundCanvas.width / 4;
        centerY = foregroundCanvas.height / 4;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fill();
    };
})();

