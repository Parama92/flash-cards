const express = require('express')
const router = express.Router()
const wordsController = require('../controllers/wordsController')
const {errorHandler} = require('../helpers')

router.get('/generate', errorHandler(wordsController.generate), errorHandler(wordsController.getDefinition), wordsController.showFlashCard)
// router.post('/changeStatus', errorHandler(wordsController.changeStatus))

router.get('/',function(req, res){
    res.redirect('/dictionary');
})

module.exports = router;