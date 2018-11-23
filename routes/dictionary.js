const express = require('express')
const router = express.Router()
const wordsController = require('../controllers/wordsController')
const {errorHandler} = require('../helpers')

router.get('/', errorHandler(wordsController.showAll))
router.post('/', errorHandler(wordsController.getDefinition), wordsController.showFlashCard)
router.get('/new/:word', errorHandler(wordsController.getWord), errorHandler(wordsController.getDefinition), wordsController.showFlashCard)
router.get('/:wordId', errorHandler(wordsController.getWord), errorHandler(wordsController.getDefinition), wordsController.showFlashCard)

module.exports = router;