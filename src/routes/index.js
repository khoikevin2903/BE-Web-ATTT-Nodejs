const siteRouter = require('./site');
const musicsRouter = require('./musics');
const meRouter = require('./me');
const authRouter = require('./auth');
const isAuth = require('../app/middleware/AuthMiddleware');

function route(app) {

    app.use('/auth', authRouter);

    app.use('/me',isAuth, meRouter);

    app.use('/musics',isAuth, musicsRouter);

    app.use('/', siteRouter);

}

module.exports = route;