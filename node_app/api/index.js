const { Router } = require('express');


const apiRouter = Router();

const { listRouter } = require('./list.js');
apiRouter.use('/list', listRouter);
const { playRouter } = require('./play.js');
apiRouter.use('/play', playRouter);
const { userRouter } = require('./user.js');
apiRouter.use('/user', userRouter);


module.exports = {apiRouter};
