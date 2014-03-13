var
  __ = {},
  each,
  findByComparison;

var
  arrayProto  = Array.prototype,
  objectProto = Object.prototype;

var
  slice       = arrayProto.slice,
  toString    = objectProto.toString;

/***************************************************
 * Collections (Arrays and Objects)
 ***************************************************/
__.each = each = function(obj, iterator) {
  var index, length, keys, key;
  if (obj === null) return;
  if (obj.length === +obj.length) {
    for (index = 0, length = obj.length; index < length; index++) {
      iterator(obj[index], index, obj);
    }
  } else {
    keys = __.keys(obj);
    for (index = 0, length = keys.length; index < length; index++) {
      key = keys[index];
      iterator(obj[key], key, obj);
    }
  }
};

__.map = function(coll, iterator) {
  var result = [];

  each(coll, function(value) {
    result.push(iterator(value));
  });

  return result;
};

__.reduce = function(coll, iterator, start) {
  var result = start || 0;

  each(coll, function(value) {
    result = iterator(result, value);
  });

  return result;
};

__.filter = function(coll, iterator) {
  var result = [];

  each(coll, function(value) {
    if (iterator(value)) result.push(value);
  });

  return result;
};

__.reject = function(coll, iterator) {
  return __.filter(coll, function(value) {
    return !iterator(value);
  });
};

__.every = function(coll, iterator) {
  var result = true;

  each(coll, function(value) {
    if (!(result = result && iterator(value))) return;
  });

  return result;
};

__.some = function(coll, iterator) {
  var result = false;

  each(coll, function(value) {
    if (iterator(value)) {
      result = true;
      return;
    }
  });

  return result;
};

__.find = function(coll, iterator) {
  var result;

  each(coll, function(value) {
    if (iterator(value)) {
      result = value;
      return;
    }
  });

  return result;
};

__.contains = __.includes = function(coll, query) {
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
        return comparator(a, b);
      };

  each(coll, function(value) {
    if (iterator) {
      var a = iterator(value),
          b = iterator(memo);
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
    key = iterator(value);

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

__.invoke = function(coll, method) {
  var isFunc = typeof method === "function",
      args = slice.call(arguments, 2);

  return __.map(coll, function(val) {
    if (isFunc) {
      return method.apply(this, [val].concat(args));
    }
    return val[method].apply(val, args);
  });
};

__.without = function(coll) {
  var toRemove = slice.call(arguments, 1);
  return __.filter(coll, function(item) {
    return !__.contains(toRemove, item);
  });
};

__.partition = function(coll, predicate) {
  var positive = [],
      negative = [];

  each(coll, function(item) {
    if (predicate(item)) {
      positive.push(item);
    } else {
      negative.push(item);
    }
  });

  return [positive, negative];
};

__.union = function() {
  return __.unique(__.flatten(slice.call(arguments)));
};

__.unique = function(arr) {
  var seen = [],
      memo = [];

  each(arr, function(value) {
    if(!__.includes(seen, value)) {
      memo.push(value);
    }

    seen.push(value);
  });

  return memo;
};

var count = function(coll, query) {
  var count = 0;

  each(coll, function(value) {
    if(value === query) count++;
  });

  return count;
};

__.intersection = function() {
  var arrays = slice.call(arguments),
      arrayCount = arguments.length,
      allValues = __.flatten(arrays);

  return __.unique(__.reject(allValues, function(value) {
    return count(allValues, value) !== arrayCount;
  }));
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

__.isEmpty = function(obj) {
  if (__.isArray(obj)) return obj.length === 0;
  return __.keys(obj).length === 0;
};

__.isUndefined = function(obj) {
  return obj === void 0;
};

__.isNaN = function(obj) {
  return obj !== obj;
};

__.isNull = function(obj) {
  return obj === null;
};

each(["Array", "String", "Object", "Number", "Function"], function(type) {
  __["is" + type] = function(obj) {
    return toString.call(obj) === "[object " + type + "]";
  };
});

__.sortBy = function(coll, method) {
  return coll.sort(function(a, b) {
    if (__.isString(method)) {
      return a[method] - b[method];
    }
    return method(a) - method(b);
  });
};

function getRandomElement(coll) {
  return coll[Math.floor(Math.random() * coll.length)];
}

__.sample = function(coll, sampleSize) {
  var i, memo = [], sample;

  if (__.isUndefined(sampleSize)) {
    return getRandomElement(coll);
  }

  for (i = sampleSize; i > 0; i--) {
    sample = getRandomElement(coll);
    while (__.contains(memo, sample)) {
      sample = getRandomElement(coll);
    }
    memo.push(sample);
  }

  return memo;
};
