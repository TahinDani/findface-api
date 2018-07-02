const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a85993780d8145109fedb7d84475032f'
   });

const predict = (req, res) => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
          res.json(data);
        })
      .catch(err => res.status(400).json('Failed to reach Clarifai API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
    .where('id', id) // WHERE id = id
    .increment('entries', 1)
    .returning('entries')
    .then(dbResponse => res.json(dbResponse[0]))
    .catch(err => res.status(400).json(err))
}

module.exports = {
    handleImage: handleImage,
    predict: predict
}