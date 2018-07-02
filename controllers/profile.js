const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})  // same as .where({ id:id })
    .then(dbResponse => {
        if (dbResponse.length) {
            res.json(dbResponse[0])
        } else {
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json(err.detail))
}

module.exports = {
    handleProfileGet: handleProfileGet
}

// it's the same:
// module.exports = {
//     handleProfileGet
// }