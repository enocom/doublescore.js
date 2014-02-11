describe("doublescore.js", function() {
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

  describe("__.map", function() {
    var addOne = function(num) { return num + 1; };

    it("transforms a collection with a function", function() {
      var result = __.map([1, 2, 3], addOne);
      expect(result).toEqual([2, 3, 4]);
    });

    it("transforms an object's keys with a function", function() {
      var result = __.map({a: 1, b: 2, c: 3}, addOne);
      expect(result).toEqual([2, 3, 4]);
    });
  });

  describe("__.reduce", function() {
    var add = function(memo, num) { return memo + num; };

    it("reduces a collection with a function", function() {
      var result = __.reduce([1, 2, 3], add);
      expect(result).toEqual(6);
    });

    it("accepts an initial memo value", function() {
      var result = __.reduce([1, 2, 3], add, 10);
      expect(result).toEqual(16);
    });
  });

  describe("__.filter", function() {
    it("filters a collection given a boolean condition", function() {
      var multipleOfTwo = function(value) { return value % 2 === 0; },
          result;

      result = __.filter([1, 2, 4, 5], multipleOfTwo);
      expect(result).toEqual([2, 4]);
    });
  });

  describe("__.reject", function() {
    it("is the opposite of filter", function() {
      var multipleOfThree = function(value) { return value % 3 === 0; },
          result;

      result = __.reject([1, 3, 4, 6, 5], multipleOfThree);
      expect(result).toEqual([1, 4, 5]);
    });
  });

  describe("__.every", function() {
    it("returns true if all elements satify a truth test", function() {
      var greaterThanFive = function(value) { return value > 5; },
          result;

      result = __.every([7, 8, 9], greaterThanFive);
      expect(result).toBeTruthy();

      result = __.every([1, 2, 6], greaterThanFive);
      expect(result).toBeFalsy();
    });
  });

  describe("__.some", function() {
    it("returns true if any element satifies a truth test", function() {
      var isFortyTwo = function(value) { return value === 42; },
          result;

      result = __.some(["7", "foo", 42, 3], isFortyTwo);
      expect(result).toBeTruthy();

      result = __.some([1, 2, "bar"], isFortyTwo);
      expect(result).toBeFalsy();
    });
  });
});
