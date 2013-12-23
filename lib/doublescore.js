var __ = {};

__.keys = function(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
};

__.each = function(obj, iterator, context) {
  for (var index = 0, length = obj.length; index < length; index++) {
    iterator.call(context, obj[index], index, obj);
  }
};
