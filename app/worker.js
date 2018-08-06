// F = (d - 1) / d
((App) => {
    const
        ballsModel = App.import('ballsModel'),
        // delta t; TODO: deltaT service?
        DT = 1 / 60, // 1/60 sec => 60fps
        //DT = 1, // TESTING
        ballMoveFn = (ball, currentBallIndex, balls) => {
            console.log('moving ball', ball);
            const otherBalls = balls;
            let f, vx0, vy0;
            otherBalls.splice(currentBallIndex, 1);

            f = otherBalls.reduce((acc, cBall) => {
                return {
                    fx: acc.fx + 1 - 1 / Math.abs(cBall.x - ball.x),
                    fy: acc.fy + 1 - 1 / Math.abs(cBall.y - ball.y)
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
