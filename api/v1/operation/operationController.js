const db = require('../models')

module.exports = {

  /**
 * @namespace operationController
 * @desc This is a description of the controller
 */
  
  findAll: function(req, res) {
    res.json({
      message: 'findAll /api/v1/operation',
      status: true,
      data: null
    })

    // db.Operation.findAll({where: {user_id:req.params.id})
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err))
  },
  findById: function(req, res) {
    res.json({
      message: 'findById /api/v1/operation/:id',
      status: true,
      data: null
    })

    // db.Operation.findById(req.params.id)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err))
  },
  create: function(req, res) {
    res.json({
      message: 'create /api/v1/operation',
      status: true,
      data: null
    })
    // api call to retrieve Operation
    // db.Operation.create(req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err))
  },
  update: function(req, res) {
    res.json({
      message: 'update /api/v1/operation/:id',
      status: true,
      data: null
    })
    
    // db.Operation.findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err))
  },
  remove: function(req, res) {
    res.json({
      message: 'remove /api/v1/operation/:id',
      status: true,
      data: null
    })
    
    // db.Operation.findById({ _id: req.params.id })
    //   .then(dbModel => dbModel.remove())
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err))
  }
}