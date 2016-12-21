var Filter = (function() {
  function Filter(options) {
    options = options || {};
    this.list = options.emptyList && [] || Array.prototype.concat.apply(require('../lib/badwords.json').words, [require('badwords-list').array, options.list || []]);
    this.placeHolder = options.placeHolder || '*';
    this.regex = options.regex || /[^a-zA-z0-9|\$|\@]|\^/g;
  }

  Filter.prototype.isProfane = function isProfane(string) {
    var words = string.split(' ');
    for (var j = 0; j < words.length; j++) {
      var word = words[j].toLowerCase().replace(this.regex, '');
      if (~this.list.indexOf(word)) {
        return true;
      }
    }
    return false;
  };

  Filter.prototype.cleanMiddle = function cleanMiddle(bookends, len) {
    var stars = Array(len - 1).join('*');
    var sanitized = bookends[0] + stars + bookends[1];
    return sanitized;
  }

  Filter.prototype.replaceWord = function replaceWord(string) {
    var firstLast = [string.charAt(0), string.charAt(string.length - 1)];
    console.log(this.cleanMiddle(firstLast, string.length));
    return this.cleanMiddle(firstLast, string.length);
    // return string.replace(this.regex, '').replace(/\w/g, this.placeHolder);
  };

  Filter.prototype.clean = function clean(string) {
    return string.split(' ').map(function(word) {
      return this.isProfane(word) ? this.replaceWord(word) : word;
    }.bind(this)).join(' ');
  };

  Filter.prototype.addWords = function addWords(words) {
    words = (words instanceof Array) ? words : [words];
    this.list = this.list.concat(words);
  };

  Filter.prototype.removeWords = function removeWords() {
    var words = Array.prototype.slice.call(arguments);
    words.map(function(word) {
      return this.list.indexOf(word);
    }, this).filter(function(index) {
      return !!~index;
    }).forEach(function(index){
      this.list.splice(index, 1);
    }, this);
  };

  return Filter;
})();

module.exports = Filter;