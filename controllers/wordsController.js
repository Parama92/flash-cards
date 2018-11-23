const fetch = require('node-fetch')
const headers = require('../config/dictionary.json')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const Word = mongoose.model('Word')

// const admin = require('firebase-admin')

// const serviceAccount = require("../config/flash-cards-d1952-firebase-adminsdk-14bmq-e6cb775fef.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://flash-cards-d1952.firebaseio.com"
// });

// const db = admin.firestore();

// let wordsRef = db.collection('dictionary')

exports.showAll = async function (req, res, next) {
    let words = await Word.find()
    res.render('home',{
        words
    })
}

// middleware to fetch the word from the corresponding id
exports.getWord = async function (req, res, next) {
    let word
    if (req.params.wordId && req.params.wordId.match(/^[0-9a-fA-F]{24}$/)) {
        // it's an ObjectID    
        word = await Word.findById(req.params.wordId)
    } else if (req.params.word){
        word = req.params.word
    }
    
    res.locals.word = {word}
    next()
}

// middleware to get the definition and examples
exports.getDefinition = async function (req, res, next) {
    const word =  req.body.word ? req.body.word : res.locals.word.word
    const url = `https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${word}`
    const data = await fetch(url, {headers}).then(data => data.json())

    // console.log(JSON.stringify(data,null,2))

    const vocab = data.results[0].lexicalEntries[0].entries[0].senses.map(function(sense){
        let temp = {
            "definitions": sense.definitions,
            "examples": sense.examples ? sense.examples.reduce( (acc, example) => {
                acc.push(example.text)
                return acc
            }, []) : []
        }
        return temp
    }).reduce(function (vocab, sense) {
        vocab.definitions = (vocab.definitions || []).concat(sense.definitions)
		vocab.examples = (vocab.examples || []).concat(sense.examples)
		return vocab
    },{})

    const pronunciation = data.results[0].lexicalEntries[0].pronunciations[0].audioFile

    res.locals.word = res.locals.word || word
    res.locals.pronunciation = pronunciation
    res.locals.vocab = vocab

    if(req.body.fetch) { return res.send(true) }
    next()
}

// middleware to render a flashcard
exports.showFlashCard = function (req, res, next) {

    res.render('display', {
        word: res.locals.word,
        status: ['Learn', 'Practice', 'Mastered'],
        vocab:res.locals.vocab,
        pronunciation: res.locals.pronunciation
    })

    // if (req.body.word) { // if it is invoked as a result of a post request to save a new word, invoke the saveWord middleware
    //     next()
    // }
}

// middleware to save a new word in the database
// exports.saveWord = async function (req, res, next) {
//     const word = await Word.findOne({ word: req.body.word })
//     if (!word) {
//         const newWord = (new Word(req.body)).save()
//     }
// }

// generates a random word in the vocabulary
exports.generate = async function (req, res, next) {
    const random = await Word.aggregate([
        { $sample : { size : 1 } }
    ])
    res.locals.word = random[0]

    next()
}

// generates a random word in the vocabulary
exports.generate = async function (req, res, next) {
    const random = await Word.aggregate([
        { $sample : { size : 1 } }
    ])
    res.locals.word = random[0]

    next()
}

// change status of a word
// exports.changeStatus = async function (req, res, next) {
//     const {word, status} = req.body
//     const resWord = await Word.findOneAndUpdate({ word: word.trim() }, { $set : { status : status }})
//     if (resWord) {
//         res.json({resWord})
//     }
//     else{
//         res.json({err: 'Word not found'})
//     }
// }