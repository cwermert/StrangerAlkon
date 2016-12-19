var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
  message: String,
  read: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);