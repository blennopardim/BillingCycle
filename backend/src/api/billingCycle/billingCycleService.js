const BillingCincle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

BillingCincle.methods(['get', 'post', 'put', 'delete'])
BillingCincle.updateOptions({new: true, runValidators: true})
BillingCincle
    .after('post', errorHandler)
    .after('put', errorHandler)

BillingCincle.route('count', (req, res, next) => {
    BillingCincle.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

BillingCincle.route('summary', (req, res, next) => {
    BillingCincle.aggregate({
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
    }, {
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, {
        $project: {_id: 0, credit: 1, debt: 1}
    }, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }
    })
})

module.exports = BillingCincle