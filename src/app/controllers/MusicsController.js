const Music = require('../models/Music');

class MusicsController {

    // [GET] /musics/:slug
    show(req, res, next) {
        Music.findOne({ slug: req.params.slug })
            .then(music =>  res.json(music))
            .catch(next);
    }

    // [POST] /musics/store
    create(req, res, next) {
        const formData = {...req.body};
        formData.idUser = req.jwtDecoded.data._id; 
        formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDbtfmz9fh3vCcCKtL_nZwfUYpyWw`
        const music = new Music(formData)
        music.save()
            .then(() => {
                return res.json({response: 'Music creation successfully!!!'});
            })
            .catch(() => {
                return res.json({err: 'Music creation failed!!!'})
            });
    }

    // [GET] /musics/:id/edit
    edit(req, res, next) {
        Music.findById(req.params.id)
            .then(music => res.json(mongooseToObject(music)))
            .catch(next);
    }

    // [PUT] /musics/:id
    update(req, res, next) {
        Music.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json(''))
            .catch(next);
    }

    // [Delete] /musics/:id
    destroy(req, res, next) {
        Music.delete({ _id: req.params.id })
            .then(() => res.json(''))
            .catch(next);
    }

    // [Delete] /musics/:id/force
    forceDestroy(req, res, next) {
        Music.deleteOne({ _id: req.params.id })
            .then(() => res.json(''))
            .catch(next);
    }

    // [PATCH] /musics/:id/restore
    restore(req, res, next) {
        Music.restore({ _id: req.params.id })
        .then(() => res.json(''))
        .catch(next);
    }

}

module.exports = new MusicsController;

