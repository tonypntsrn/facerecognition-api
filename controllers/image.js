const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: "0355a3095bd742b490e5077b9714e567"
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then((data) => res.json(data))
        .catch(() => res.status(400).json('unable to work with API'));
};

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entities', 1)
        .returning('entities')
        .then((entities) => res.json(entities[0]))
        .catch(() => res.status(400).json('unable to get entries'));
};

module.exports = {
    handleImage,
    handleApiCall
};