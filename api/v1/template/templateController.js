const db = require("../models")

// Defining methods for the templateController
module.exports = {

    /**
 * @namespace templateController
 * @desc This is a description of the controller
 */
  
  
  findAll: function(req, res) {
    // Uncomment to test route
    // res.json({
    //   message: 'findAll /api/v1/template',
    //   status: true,
    //   data: null
    // })
    db.Template
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findById: function(req, res) {
    // Uncomment to test route
    // res.json({
    //   message: 'findById /api/v1/template/:id',
    //   status: true,
    //   data: null
    // })
    db.Template
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  create: function(req, res) {
    // Uncomment to test route
    // res.json({
    //   message: 'create /api/v1/template/:id',
    //   status: true,
    //   data: null
    // })
    db.Template
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  update: function(req, res) {
    // Uncomment to test route
    // res.json({
    //   message: 'update /api/v1/template/:id',
    //   status: true,
    //   data: null
    // })
    db.Template
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  remove: function(req, res) {
    // Uncomment to test route
    // res.json({
    //   message: 'remove /api/v1/template/:id',
    //   status: true,
    //   data: null
    // })
    db.Template
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}
