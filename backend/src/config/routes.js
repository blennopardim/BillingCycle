const express = require('express')

module.exports = function(server) {
    // Base url api
    const router = express.Router()
    server.use('/api', router)
    console.log('use api')
    
    // Routes BillingCycle
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(router, '/billingCycles')
    console.log('billingCycles')

}