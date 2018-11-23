const express = require('express')
// const admin = require('firebase-admin')
const bodyParser = require('body-parser');
const path = require('path');

const index = require('./routes/index')
const dictionary = require('./routes/dictionary')

// const serviceAccount = require("./config/flash-cards-d1952-firebase-adminsdk-14bmq-e6cb775fef.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://flash-cards-d1952.firebaseio.com"
// });

// const db = admin.firestore();

const app = express()

// let wordsRef = db.collection('dictionary')
// let words = wordsRef.get()
//             .then(snapshot => {
//               snapshot.forEach(doc => {
//                 console.log(doc.id, '=>', doc.data());
//               });
//             })
//             .catch(err => {
//               console.log('Error getting documents', err);
//             });

//view engine setup            
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too
            
// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname,'public')))
//  setting up a path for bootstrap assets
app.use('/static', express.static(path.join(__dirname,'node_modules/bootstrap/dist')))
//  setting up a path for font-awesome assets
app.use('/icons', express.static(path.join(__dirname,'node_modules/@fortawesome/fontawesome-free/css')))

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/',index)
app.use('/dictionary',dictionary)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.eStatus = err.status || 404;
  res.locals.eStack = err.stack;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;