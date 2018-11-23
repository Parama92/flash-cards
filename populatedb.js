const mongoose = require('mongoose')

// import environment variables from the .env file
require('dotenv').config({ path: 'variables.env' })

// connect to database and handle bad connections
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => {
    console.error('Error on databse connection: ', err.message)
})

// import all models
const Words = require('./models/Words')

async function populate () {
    try {
        await Words.insertMany([
            {word: 'abysmal'}, {word: 'accretion'}, {word: 'accrue'}, {word: 'adament'}, {word: 'adjunct'}, {word: 'admonish'}, {word: 'adulterate'}, {word: 'aesthetic'}, {word: 'affected'}, {word: 'affinity'}, {word: 'aggrandize'}, {word: 'aggregate'}, {word: 'alacrity'}, {word: 'alchemy'}, {word: 'allay'}, {word: 'alleviate'}, {word: 'alloy'}, {word: 'allure'}, {word: 'amalgamate'}, {word: 'ambiguous'}, {word: 'ambivalence'}, {word: 'ambrosia'}, {word: 'ameliorate'}, {word: 'amenable'}, {word: 'amenity'}, {word: 'amulet'}, {word: 'anachronism'}, {word: 'analgesic'}, {word: 'analogous'},{word: 'anarchy'}, {word: 'anodyne'}, {word: 'anomalous'}, {word: 'antecedent'}, {word: 'antipathy'}, {word: 'apathy'}, {word: 'apex'}, {word: 'apogee'}, {word: 'apothegm'}, {word: 'appease'}, {word: 'appellation'}, {word: 'apposie'}, {word: 'apprise'}, {word: 'approbation'}, {word: 'appropriate'}, {word: 'apropos'}, {word: 'arabesque'},{word: 'archeology'}, {word: 'ardor'}, {word: 'arduous'}, {word: 'argot'}, {word: 'arrest'}, {word: 'artifact'}, {word: 'artless'}, {word: 'ascetic'}, {word: 'asperity'}, {word: 'aspertion'}, {word: 'assiduous'}, {word: 'assuage'}, {word: 'astringent'}, {word: 'asylum'}, {word: 'atavism'}, {word: 'attenuate'}, {word: 'audacious'}, {word: 'austere'}, {word: 'autonomous'}, {word: 'avarice'}, {word: 'aver'}, {word: 'avocation'}, {word: 'avuncular'}, {word: 'axiomatic'}, {word: 'bacchanalian'}, {word: 'banal'}, {word: 'banter'}, {word: 'bard'}, {word: 'bawdy'}, {word: 'beatify'}, {word: 'bedizen'}, {word: 'behemoth'}, {word: 'belie'}, {word: 'beneficent'}, {word: 'bifurcate'}, {word: 'blandishment'}, {word: 'blase'}, {word: 'bolster'}, {word: 'bombastic'}, {word: 'boorish'}, {word: 'bovine'}, {word: 'brazen'}, {word: 'broach'}, {word: 'bucolic'}, {word: 'burgeon'}, {word: 'burnish'}, {word: 'buttress'}, {word: 'cacophonous'}, {word: 'cadge'}, {word: 'callous'}, {word: 'calumny'}, {word: 'canard'}, {word: 'canon'}, {word: 'cant'}, {word: 'cantankerous'}, {word: 'capricious'}, {word: 'captious'}, {word: 'cardinal'}, {word: 'carnal'}, {word: 'carping'}, {word: 'cartography'}, {word: 'caste'}, {word: 'cataclysm'}, {word: 'catalyst'}, {word: 'categorical'}, {word: 'caucus'},{word: 'causal'}, {word: 'caustic'}, {word: 'celestial'}, {word: 'centrifugal'}, {word: 'centripetal'}, {word: 'champion'}, {word: 'chasten'}, {word: 'chicanery'}, {word: 'chivalry'}, {word: 'churlish'}, {word: 'circuitous'}, {word: 'clairvoyant'}, {word: 'clamor'}, {word: 'clique'}, {word: 'cloister'}, {word: 'coagulate'}, {word: 'coalesce'}, {word: 'coda'}, {word: 'codify'}, {word: 'cognizant'}, {word: 'collage'}, {word: 'commensurate'}, {word: 'compendium'}, {word: 'complacent'}, {word: 'complaisant'}, {word: 'complement'}, {word: 'compliant'}, {word: 'compunction'}, {word: 'concave'}, {word: 'conciliatory'}, {word: 'concoct'}, {word: 'concomitant'}, {word: 'condone'}, {word: 'confound'}, {word: 'congenial'}, {word: 'conjugal'}, {word: 'connoisseur'}, {word: 'conscript'}, {word: 'consecrate'}, {word: 'contend'}, {word: 'contentious'}, {word: 'contiguous'}, {word: 'continence'}, {word: 'contrite'}, {word: 'contumacious'}, {word: 'conundrum'}, {word: 'convention'}, {word: 'converge'}, {word: 'convex'}, {word: 'convivial'}, {word: 'convoluted'}, {word: 'copious'}, {word: 'coquette'}, {word: 'cornucopia'}, {word: 'cosmology'}, {word: 'covert'}, {word: 'covetous'}, {word: 'cozen'}, {word: 'craven'}, {word: 'credence'}, {word: 'credo'}, {word: 'daunt'}, {word: 'dearth'}, {word: 'debauchery'}, {word: 'decorum'}, {word: 'defame'}, {word: 'default'}, {word: 'deference'}, {word: 'defunct'}, {word: 'delineate'}, {word: 'demographic'}, {word: 'demotic'}, {word: 'demur'}, {word: 'denigrate'}, {word: 'denizen'}, {word: 'denouement'}, {word: 'deride'}, {word: 'derivative'}, {word: 'dessicate'}, {word: 'desuetude'}, {word: 'desultory'}, {word: 'deterrent'}, {word: 'detraction'}, {word: 'diaphanous'}, {word: 'diatribe'}, {word: 'dichotomy'}, {word: 'diffidence'}, {word: 'diffuse'}, {word: 'digression'}, {word: 'dirge'}, {word: 'disabuse'}, {word: 'discerning'}, {word: 'discomfit'}, {word: 'discordant'}, {word: 'discredit'}, {word: 'discrepancy'}, {word: 'discrete'}, {word: 'discretion'}, {word: 'disingenuous'}, {word: 'disinterested'}, {word: 'disjointed'}, {word: 'dismiss'}, {word: 'disparage'}, {word: 'disparate'}, {word: 'dissemble'}, {word: 'disseminate'}, {word: 'dissident'}, {word: 'dissolution'}, {word: 'dissonance'}, {word: 'distend'}, {word: 'distrait'}, {word: 'diverge'}, {word: 'divest'}, {word: 'divulge'}, {word: 'doctrinaire'}
        ]);
        console.log('👍👍👍👍👍👍👍👍 Done!');
        process.exit();
    } catch (e) {
        console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
        console.log(e);
        process.exit();
    }
}

populate();