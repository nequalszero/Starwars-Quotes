const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

// Tell Express to make public folder accessible to the public
app.use(express.static('public'))
app.use(bodyParser.json())

MongoClient.connect('mongodb://yoda:theforce@ds141490.mlab.com:41490/star-wars-quotes', (err, database) => {
  if (err) return console.log(err);
  // ... start the server
  db = database;
  app.listen(3000, function() {
    console.log('listening on 3000');
  })
})

// bodyParser must go before CRUD (create, read, update, delete) handlers
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err);
    // renders index.ejs
    res.render('index.ejs', {quotes: result});
  })
})

app.post('/quotes', (req, res) => {
  console.log(req.body);
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    // request body will show up the name properties of the input fields
    console.log('saved to database');
    res.redirect('/');
  })
})

// db.collections('quotes').findOneAndUpdate(
//   query,
//   update,
//   options,
//   callback
// )
app.put('/quotes', (req, res) => {
  db.collection('quotes')
    .findOneAndUpdate({name: 'Yoda'}, {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    })
})

// db.collections('quotes').findOneAndDelete(
//   query,
//   options,
//   callback
// )
app.delete('/quotes', (req, res) => {
  console.log(req.body);
  db.collection('quotes').findOneAndDelete({ name: req.body.name }, function(err, result) {
    if (err) return res.send(500, err);
    res.send({response: 'A darth Vader quote got deleted'});
    // res.send(result);
  });
})
