((App) => {
    let
        balls = [],
        Ball = ({x, y}) => {
            let that = {
                vx: 0,
                vy: 0,
                ax: 0,
                ay: 0,
                // ball mass service?
                m: 0.1,
                r: 5
            };
            if (isNaN(parseFloat(x)) || isNaN(parseFloat(y))) {
                throw new Error(`Unexpected ball coordinates: (${x}, ${y})`);
            }
            that.x = x;
            that.y = y;
            return that;
        },
        fireEvent = (eventName, event) => {
            if (eventName === 'ballAdd') {
                balls.push(Ball(event));
                return;
            }
            console.log('Unknown event', eventName);
        },
        getBalls = () => balls.slice();

//    fireEvent('ballAdd', {x: 100, y: 200});
//    fireEvent('ballAdd', {x: 300, y: 400});

    App.export('ballsModel', {
        fireEvent,
        getBalls
    });
})(window.App);