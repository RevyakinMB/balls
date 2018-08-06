((App) => {
    const ballsModel = App.import('ballsModel');
    let
        canvasLookup = () => {
            let canvases = document.querySelectorAll('canvas');
            if (canvases.length < 2) {
                console.error('No canvas elements found, exiting');
                return;
            }
            [foregroundCanvas, hiddenCanvas] = canvases;
        },

        redraw = () => {
            let ctx, balls;
            if (!hiddenCanvas) {
                canvasLookup();
            }
            ctx = hiddenCanvas.getContext('2d');
            ctx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);
            ctx.fillStyle = 'green';

            balls = ballsModel.getBalls();
            balls.forEach((ball) => {
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false);
                ctx.fill();
            });
            foregroundCanvas.style.display = 'none';
            hiddenCanvas.style.display = 'block';
        },
        foregroundCanvas, hiddenCanvas;

    // TODO: mouse wheel event? (canvas trasforming)
    App.export('renderer', {
        redraw
    });
})(window.App);
