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

  describe("__.find", function() {
   it("returns the first element which passes the truth test", function() {
     var isEven = function(value) { return value % 2 === 0; },
         result;

     result = __.find([1, 2, 3], isEven);
     expect(result).toEqual(2);

     result = __.find([1, 3, 5], isEven);
     expect(result).toBeUndefined();
   });
  });

  describe("__.pluck", function() {
    it("extracts an array of values for a given property", function() {
      var result,
          superheroes = [{name: "Batman", secret_identity: "Bruce Wayne"},
                         {name: "Superman", secret_identity: "Clark Kent"},
                         {name: "Spiderman", secret_identity: "Peter Parker"}];

      result = __.pluck(superheroes, "name");
      expect(result).toEqual(["Batman", "Superman", "Spiderman"]);

      result = __.pluck(superheroes, "occupation");
      expect(result).toEqual([]);
    });
  });

  describe("__.max", function() {
    it("returns the maximum value in a list", function() {
      expect(__.max([-1, -2, -3])).toEqual(-1);
      expect(__.max([351, 745, 564])).toEqual(745);
    });

    it("takes an optional iterator for comparisons", function() {
      var frodo = {name: "Frodo", age: 26},
          biblo = {name: "Bilbo", age: 72},
          samwise = {name: "Samwise", age: 24},
          hobbits = [frodo, biblo, samwise],
          oldest = function(hobbit) { return hobbit.age; };

      expect(__.max(hobbits, oldest)).toEqual(biblo);
    });
  });

  describe("__.min", function() {
    it("returns the minimum value in a list", function() {
      expect(__.min([5, 3, 9])).toEqual(3);
      expect(__.min([-4, -1, -7])).toEqual(-7);
    });
  });
});
