var __ = {},
    each;

__.keys = function(obj) {
  var key, keys = [];
  for (key in obj) {
    keys.push(key);
  }
  return keys;
};

__.each = each = function(obj, iterator, context) {
  var index, length, keys, key;
  if (obj === null) return;
  if (obj.length === +obj.length) {
    for (index = 0, length = obj.length; index < length; index++) {
      iterator.call(context, obj[index], index, obj);
    }
  } else {
    keys = __.keys(obj);
    for (index = 0, length = keys.length; index < length; index++) {
      key = keys[index];
      iterator.call(context, obj[key], key, obj);
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
