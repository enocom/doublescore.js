var __ = {},
    nullContext = {},
    each,
    findByComparison;

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
      iterator.call(nullContext, obj[index], index, obj);
    }
  } else {
    keys = __.keys(obj);
    for (index = 0, length = keys.length; index < length; index++) {
      key = keys[index];
      iterator.call(nullContext, obj[key], key, obj);
    }
  }
};

__.map = function(coll, iterator) {
  var result = [];

  each(coll, function(value) {
    result.push(iterator.call(nullContext, value));
  });

  return result;
};

__.reduce = function(coll, iterator, start) {
  var result = start || 0;

  each(coll, function(value) {
    result = iterator.call(nullContext, result, value);
  });

  return result;
};

__.filter = function(coll, iterator) {
  var result = [];

  each(coll, function(value) {
    if (iterator.call(nullContext, value)) result.push(value);
  });

  return result;
};

__.reject = function(coll, iterator) {
  return __.filter(coll, function(value) {
    return !iterator.call(nullContext, value);
  });
};

__.every = function(coll, iterator) {
  var result = true;

  each(coll, function(value) {
    if (!(result = result && iterator.call(nullContext, value))) return;
  });

  return result;
};

__.some = function(coll, iterator) {
  var result = false;

  each(coll, function(value) {
    if (iterator.call(nullContext, value)) {
      result = true;
      return;
    }
  });

  return result;
};

__.find = function(coll, iterator) {
  var result;

  each(coll, function(value) {
    if (iterator.call(nullContext, value)) {
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

findByComparison = function(coll, memo, iterator, comparator) {
  var comparison,
      compare = function(a, b, comparator) {
        return comparator.call(nullContext, a, b);
      };

  each(coll, function(value) {
    if (iterator) {
      var a = iterator.call(nullContext, value),
          b = iterator.call(nullContext, memo);
      winsComparison = compare(a, b, comparator);
    } else {
      winsComparison = compare(value, memo, comparator);
    }

    if (winsComparison) {
      memo = value;
    }
  });

  return memo;
};

__.max = function(coll, iterator) {
  var memo = coll[0],
      greaterThan = function(a, b) { return a > b; };

  return findByComparison(coll, memo, iterator, greaterThan);
};

__.min = function(coll, iterator) {
  var memo = coll[0],
      lessThan = function(a, b) { return a < b; };

  return findByComparison(coll, memo, iterator, lessThan);
};
