var __ = {};
var each;

__.keys = function(obj) {
  var key, keys = [];
  for (key in obj) {
    keys.push(key);
  }
  return keys;
};

__.each = each = function(obj, iterator) {
  var index, length, keys, key;
  if (obj === null) return;
  if (obj.length === +obj.length) {
    for (index = 0, length = obj.length; index < length; index++) {
      iterator.call({}, obj[index], index, obj);
    }
  } else {
    keys = __.keys(obj);
    for (index = 0, length = keys.length; index < length; index++) {
      key = keys[index];
      iterator.call({}, obj[key], key, obj);
    }
  }
};

__.map = function(coll, iterator) {
  var result = [];

  each(coll, function(value) {
    result.push(iterator.call({}, value));
  });

  return result;
};

__.reduce = function(coll, iterator, start) {
  var result = start || 0;

  each(coll, function(value) {
    result = iterator.call({}, result, value);
  });

  return result;
};

__.filter = function(coll, iterator) {
  var result = [];

  each(coll, function(value) {
    if(iterator.call({}, value)) result.push(value);
  });

  return result;
};

__.reject = function(coll, iterator) {
  return __.filter(coll, function(value) {
    return !iterator.call({}, value);
  });
};

__.every = function(coll, iterator) {
  var result = true;

  each(coll, function(value) {
    if(!(result = result && iterator.call({}, value))) return;
  });

  return result;
};

__.some = function(coll, iterator) {
  var result = false;

  each(coll, function(value) {
    if(iterator.call({}, value)) {
      result = true;
      return;
    }
  });

  return result;
};

__.find = function(coll, iterator) {
  var result;

  each(coll, function(value) {
    if(iterator.call({}, value)) {
      result = value;
      return;
    }
  });

  return result;
};
