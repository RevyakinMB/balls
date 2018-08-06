((App) => {
    const
        ballsModel = App.import('ballsModel'),
        renderer = App.import('renderer'),
        worker = App.import('worker'),

        onCanvasClick = (e) => {
            ballsModel.fireEvent('ballAdd', e);
            renderer.redraw();
            worker.start(renderer.redraw);
        },
        eventsSubscribe = (canvas) => {
            canvas.addEventListener('click', onCanvasClick);
        };

    document.addEventListener('DOMContentLoaded', () => {
        let canvases = document.querySelectorAll('canvas');
        if (canvases.length < 2) {
            console.error('No canvas elements found, exiting');
            return;
        }
        canvases.forEach(eventsSubscribe);
        renderer.redraw();
    });
})(window.App);
