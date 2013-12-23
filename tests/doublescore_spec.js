describe("__.keys", function() {
  it("returns an array of an object's keys", function() {
    var obj = {
      "foo": true,
  "bar": false
    };

    expect(__.keys(obj)).toEqual(["foo", "bar"]);
  });

  it("returns an empty array if the object is empty", function() {
    var empty = {};
    expect(__.keys(empty)).toEqual([]);
  });
});

describe("__.each", function() {
  it("iterates over an array calling a function for each item", function() {
    var arr = [1, 2, 3],
    memo = [],
    iterator = function(item) {
      memo.push(item);
    };

  __.each(arr, iterator);

  expect(memo).toEqual([1, 2, 3]);
  });

  it("takes an iterator with an optional index", function() {
    var arr = [1, 2, 3],
    memo = {},
    iterator = function(item, index) {
      memo[item] = index;
    };

  __.each(arr, iterator);

  expect(memo).toEqual({1: 0, 2: 1, 3: 2});
  });

  it("may reference the original array in the iterator", function() {
    var arr = [1],
    iterator = function(item, index, obj) {
      obj.push("foo");
    };

  __.each(arr, iterator);

  expect(arr).toEqual([1, "foo"]);
  });

  it("takes an optional context", function() {
    var arr = ["foo"],
    thisArg = {
      thisArgProperty: false
    },
    iterator = function() {
      this.thisArgProperty = true;
    };

  __.each(arr, iterator, thisArg);

  expect(thisArg.thisArgProperty).toBeTruthy();
  });

  it("also takes an object", function() {
    var obj = {one: 1, two: 2},
    memo = [],
    iterator = function(value, key, obj) {
      memo.push(value, key, obj);
    };

  __.each(obj, iterator);

  var expected = [1, "one", {one: 1, two: 2}, 2, "two", {one: 1, two: 2}];
  expect(memo).toEqual(expected);
  });

  it("does nothing when passed null", function() {
    var memo = [],
    iterator = function(item) {
      memo.push(item);
    };

  __.each(null, iterator);

  expect(memo).toEqual([]);
  });
});
