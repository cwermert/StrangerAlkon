// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

var Filter = require('./app/filter.js');
var filter = new Filter();

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

var port = process.env.PORT || 8080; // set our port
// process.env.MONGODB_URI = 'mongodb://localhost:27017/StrangerWall';
var mongoose  = require('mongoose');
mongoose.connect(process.env.MONGODB_URI); // connect to our database
var Message = require('./app/models/message');

let splitIt = function (str) {
  let response = str.split('');

  if (response.length > 50) {
    return ['F', 'U']
  } else {
    return response;
  }
}

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' }); 
});

// on routes that end in /messages
// ----------------------------------------------------
router.route('/messages')

  // create a message (accessed at POST http://localhost:8080/messages)
  .post(function(req, res) {
    
    var message = new Message();

    if(req.body.ToCountry) {
      req.body.message = req.body.Body;
    }

    if (req.body.message.split('').length > 50) {
      res.send({ error: 'shorter message, please' })
    } else {
      message.message = req.body.message.replace(/[^\w\s]|_/g, '')
                                        .replace(/[0-9]/g, '')
                                        .replace(/\s+/g, ' ');

      if (filter.isProfane(message.message)) {
        res.json({ profanity: "You need to wash your mouth out!" });
        // message.message = filter.clean(message.message);
      } else {

        message.read = false;

        message.save(function(err) {
          if (err) {
            res.send(err);
          }

          res.json({ message: message.message });
        });
      }
    }
    
  })

  // get all the messages (accessed at GET http://localhost:8080/api/messages)
  .get(function(req, res) {

    Message.find(function(err, messages) {
      if (err)
        res.send(err);

      res.json(messages);
    });
  });

router.route('/messages/unread')
  .get(function (req, res, next) {
    Message.find({ read: false })
      .then(function (msg) {
        res.send(msg);
      });
  });

router.route('/messages/latest')
  .get(function (req, res, next) {

    var msg_id;

    Message.find({ read: false })
      .then(function (msg) {
        if (msg.length > 0) {
          let oldestMsg = msg[0];
          msg[0].read = true;
          msg[0].save(function (err) {
            if(err) {
              console.error('ERROR!', err);
            }
          });
          res.send(splitIt(oldestMsg.message));
        } else {
          res.send(null)
        }
      })

  })

// on routes that end in /messages/:message_id
// ----------------------------------------------------
router.route('/messages/:message_id')

  // get the message with that id
  .get(function(req, res) {
    Message.findById(req.params.message_id, function(err, message) {
      if (err)
        res.send(err);
        res.json(message);
    });
  })

  // update the message with this id
  .put(function(req, res) {
    Message.findById(req.params.message_id, function(err, message) {

      if (err)
        res.send(err);

      message.name = req.body.name;
      message.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Message updated!' });
      });

    });
  })

  // delete the message with this id
  .delete(function(req, res) {
    Message.remove({
      _id: req.params.message_id
    }, function(err, message) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);