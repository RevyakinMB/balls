// F = (d - 1) / d
((App) => {
    const
        ballsModel = App.import('ballsModel'),
        // delta t; TODO: deltaT service?
        //DT = 1/60 sec => 60fps
        DT = 1/40, // TESTING
        ballMoveFn = (ball, currentBallIndex, balls) => {
            const otherBalls = balls.slice();
            let f, vx0, vy0;
            otherBalls.splice(currentBallIndex, 1);

            f = otherBalls.reduce((acc, cBall) => {
                let diffX = cBall.x - ball.x,
                    diffY = cBall.y - ball.y,
                    fx = 1 - 1 / Math.abs(diffX),
                    fy = 1 - 1 / Math.abs(diffY);
                return {
                    fx: diffX > 0 ? acc.fx + fx : acc.fx - fx,
                    fy: diffY > 0 ? acc.fy + fy : acc.fy - fy
                };
            }, {
                fx: 0,
                fy: 0
            });

            ball.ax = f.fx / ball.m;
            ball.ay = f.fy / ball.m;

            vx0 = ball.vx;
            vy0 = ball.vy;
            ball.vx = ball.vx + ball.ax * DT;
            ball.vy = ball.vy + ball.ay * DT;

            ball.x = ball.x + vx0 * DT + ball.ax * DT * DT / 2;
            ball.y = ball.y + vy0 * DT + ball.ay * DT * DT / 2;
        },
        stepFn = () => ballsModel.getBalls().forEach(ballMoveFn),
        start = (callback) => {
            if (timer) {
                return;
            }
            timer = setInterval(() => {
                stepFn();
                callback();
            }, DT * 1000);
        },
        pause = () => {
            if (timer) {
                clearInterval(timer);
                timer = undefined;
            }
        };
    let timer;

    App.export('worker', {
        start,
        pause
    });

})(window.App);
