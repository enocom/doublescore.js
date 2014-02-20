var __ = {},
    nullContext = {},
    each,
    findByComparison;

var arrayProto = Array.prototype;

var slice = arrayProto.slice;

/***************************************************
 * Collections (Arrays and Objects)
 ***************************************************/
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
  })

  return result;
};

__.contains = function(coll, query) {
  if (!!coll.indexOf) return coll.indexOf(query) !== -1;
  return __.some(__.values(coll), function(val) {
    return val === query;
  });
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
  var aMoreThanB,
      compare = function(a, b, comparator) {
        return comparator.call(nullContext, a, b);
      };

  each(coll, function(value) {
    if (iterator) {
      var a = iterator.call(nullContext, value),
          b = iterator.call(nullContext, memo);
      aMoreThanB = compare(a, b, comparator);
    } else {
      aMoreThanB = compare(value, memo, comparator);
    }

    if (aMoreThanB) {
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

__.size = function(obj) {
  if (obj.length === +obj.length) return obj.length;
  return __.keys(obj).length;
};

__.groupBy = function(coll, iterator) {
  var result = {},
      key;

  each(coll, function(value) {
    key = iterator.call(nullContext, value);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(value);
  });

  return result;
};

/***************************************************
 * Arrays
 ***************************************************/
var flatten = function(coll, memo) {
  each(coll, function(value) {
    if (value instanceof Array) {
      flatten(value, memo);
    } else {
      memo.push(value);
    }
  });

  return memo;
};

__.flatten = function(coll) {
  return flatten(coll, []);
};

__.compact = function(coll) {
  return __.filter(coll, function(value) {
    if (!!value) return value;
  });
};

__.first = function(coll, num) {
  if (!!num) return slice.call(coll, 0, num);
  return coll[0];
};

__.initial = function(coll, n) {
  var elementsToRemove = coll.length - (n || 1);
  return slice.call(coll, 0, elementsToRemove);
};

__.last = function(coll, n) {
  if (n) return slice.call(coll, coll.length - n);
  return coll[coll.length - 1];
};

__.rest = function(coll, n) {
  return slice.call(coll, (n || 1));
};

/***************************************************
 * Objects
 ***************************************************/
__.keys = function(obj) {
  var key, keys = [];
  for (key in obj) {
    keys.push(key);
  }
  return keys;
};

__.values = function(obj) {
  var key, values = [];
  for (key in obj) {
    values.push(obj[key]);
  }

  return values;
};
