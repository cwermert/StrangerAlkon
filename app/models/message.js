var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
  message: String,
  created_at: { type: Date, default: Date.now },
  read: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);