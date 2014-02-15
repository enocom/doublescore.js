var __ = {},
    context = {},
    each;

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
    result.push(iterator.call(context, value));
  });

  return result;
};

__.reduce = function(coll, iterator, start) {
  var result = start || 0;

  each(coll, function(value) {
    result = iterator.call(context, result, value);
  });

  return result;
};

__.filter = function(coll, iterator) {
  var result = [];

  each(coll, function(value) {
    if (iterator.call(context, value)) result.push(value);
  });

  return result;
};

__.reject = function(coll, iterator) {
  return __.filter(coll, function(value) {
    return !iterator.call(context, value);
  });
};

__.every = function(coll, iterator) {
  var result = true;

  each(coll, function(value) {
    if (!(result = result && iterator.call(context, value))) return;
  });

  return result;
};

__.some = function(coll, iterator) {
  var result = false;

  each(coll, function(value) {
    if (iterator.call(context, value)) {
      result = true;
      return;
    }
  });

  return result;
};

__.find = function(coll, iterator) {
  var result;

  each(coll, function(value) {
    if (iterator.call(context, value)) {
      result = value;
      return;
    }
  });

  return result;
};

__.pluck = function(coll, propertyName) {
  var result = [],
      value;

  each(coll, function(obj) {
    if ((value = obj[propertyName]) !== undefined) result.push(value);
  });

  return result;
};

__.max = function(coll, iterator) {
  var max = coll[0],
      comparison;

  each(coll, function(value) {
    if (iterator) {
      comparison = iterator.call(context, value) > iterator.call(context, max);
    } else {
      comparison = value > max;
    }

    if (comparison) {
      max = value;
    }
  });

  return max;
};

__.min = function(coll, iterator) {
  var min = coll[0],
      comparison;

  each(coll, function(value) {
    if (iterator) {
      comparison = iterator.call(context, value) < iterator.call(context, min);
    } else {
      comparison = value < min;
    }

    if (comparison) {
      min = value;
    }
  });

  return min;
};
