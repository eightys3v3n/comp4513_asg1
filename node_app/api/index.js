const { Router } = require('express');


const apiRouter = Router();

const { loginRouter } = require('./login.js');
apiRouter.use('/login', loginRouter);

const { logoutRouter } = require('./logout.js');
apiRouter.use('/logout', logoutRouter);

const { listRouter } = require('./list.js');
apiRouter.use('/list', listRouter);

const { playRouter } = require('./play.js');
apiRouter.use('/play', playRouter);

const { userRouter } = require('./user.js');
apiRouter.use('/user', userRouter);


module.exports = {apiRouter};
