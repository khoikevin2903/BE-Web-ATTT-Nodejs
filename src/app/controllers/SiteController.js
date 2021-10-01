const Music = require('../models/Music');

class SiteController {

    // [GET] /home
    index(req, res, next) {
        Music.find()
            .then(musics => {
                res.json(musics);
            })
            .catch(next);
    }
}

module.exports = new SiteController;

