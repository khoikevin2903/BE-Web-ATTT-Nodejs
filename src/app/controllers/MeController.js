const Music = require('../models/Music');

class MeController {

    storeMusic(req, res, next) {
        Music.find()
            .then(musics => res.json(musics))
            .catch(next)
    }

    trashMusic(req, res, next) {
        Music.findDeleted()
            .then(musics => res.render(musics))
            .catch(next)
    }
}

module.exports = new MeController;

