const db = require('../models')


exports.createPlan = (req, res, next) => {
    db.Operation.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
}

exports.updatePlan = (req, res, next) => {
    console.log(req.params)
    db.Operation.update(
        {
            uas_id: req.body.uas_id,
            operator_id: req.body.operator_id,
            title: req.body.title,
            operation_description: req.body.operation_description,
            start_date_time: req.body.start_date_time,
            duration: req.body.duration,
            maximum_altitude: req.body.maximum_altitude,
            area_of_operations: req.body.area_of_operations
        },
        {
        where: {operator_id: req.params.userId,id: req.params.planId}
        })
        .then((result) => {
            res.json({ 'Updated row': result })
        })
        .catch(err => res.status(422).json(err))
}
exports.getOneById = (req, res, next) => {
    db.Operation.find({
        where: { operator_id: req.params.userId, id: req.params.planId }
    })
      .then(plan => res.json(plan))
      .catch(err => res.status(422).json(err))
}
exports.getAllByUser = (req, res, next) => {
    db.Operation.findAll(
        {
            where: { operator_id: req.params.userId }
        })
      .then(plans => res.json(plans))
      .catch(err => res.status(422).json(err))
}