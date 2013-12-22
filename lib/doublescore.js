var __ = {};

__.keys = function(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
};

__.each = function(obj, iterator) {
  for (var i = 0, length = obj.length; i < length; i++) {
    iterator.call(this, obj[i], i, obj);
  }
};
