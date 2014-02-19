describe("doublescore.js", function() {
  /***************************************************
   * Collections
   ***************************************************/
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
          superheroes = [{name: "Batman", secretIdentity: "Bruce Wayne"},
                         {name: "Superman", secretIdentity: "Clark Kent"},
                         {name: "Spiderman", secretIdentity: "Peter Parker"}];

      result = __.pluck(superheroes, "name");
      expect(result).toEqual(["Batman", "Superman", "Spiderman"]);

      result = __.pluck(superheroes, "occupation");
      expect(result).toEqual([]);
    });
  });

  describe("minimum and maximum", function() {
    var frodo = {name: "Frodo", age: 26},
        biblo = {name: "Bilbo", age: 72},
        samwise = {name: "Samwise", age: 24},
        hobbits = [frodo, biblo, samwise],
        age = function(hobbit) { return hobbit.age; };

    describe("__.max", function() {
      it("returns the maximum value in a list", function() {
        expect(__.max([-1, -2, -3])).toEqual(-1);
        expect(__.max([351, 745, 564])).toEqual(745);
      });

      it("takes an optional iterator for comparisons", function() {
        expect(__.max(hobbits, age)).toEqual(biblo);
      });
    });

    describe("__.min", function() {
      it("returns the minimum value in a list", function() {
        expect(__.min([5, 3, 9])).toEqual(3);
        expect(__.min([-4, -1, -7])).toEqual(-7);
      });

      it("takes an optional iterator for comparisons", function() {
        expect(__.min(hobbits, age)).toEqual(samwise);
      });
    });
  });

  describe("__.size", function() {
    it("returns the number of values in a collection", function() {
      expect(__.size([1, 2, 3])).toEqual(3);
    });

    it("returns the number of keys in an object", function() {
      expect(__.size({a: "a", b: "b", c: "c"})).toEqual(3);
    });
  });

  describe("__.groupBy", function() {
    it("sorts all values in a collection, keyed using a function", function() {
      var words = ["apple", "ant", "banana", "donut"],
          byFirstLetter = function(word) { return word[0]; },
          expectedResult = {
            "a": ["apple", "ant"],
            "b": ["banana"],
            "d": ["donut"]
          };

      expect(__.groupBy(words, byFirstLetter)).toEqual(expectedResult);
    });

    it("works on collections of numbers as well", function() {
      var numbers = [1.3, 2.2, 1.2, 3.5],
          floor = function(num) { return Math.floor(num); },
          expectedResult = {
            1: [1.3, 1.2],
            2: [2.2],
            3: [3.5]
          };

      expect(__.groupBy(numbers, floor)).toEqual(expectedResult);
    });
  });

  // Collections ToDo:
  // reduceRight, findWhere, invoke, sortBy, indexBy, countBy, shuffle,
  // sample, toArray

  /***************************************************
   * Arrays
   ***************************************************/
  describe("__.flatten", function() {
    it("flattens a nested array", function() {
      var nested1 = [[1, [2, [3, [4]]]], 5, [6, 7]],
          expected1 = [1, 2, 3, 4, 5, 6, 7],
          nested2 = [5, [[[4], 3], 2], [1]],
          expected2 = [5, 4, 3, 2, 1];

      expect(__.flatten(nested1)).toEqual(expected1);
      expect(__.flatten(nested2)).toEqual(expected2);
    });
  });

  describe("__.compact", function() {
    it("returns an array with all falsey values removed", function() {
      var uncompacted = [false, 0, null, NaN, undefined, "", 42];

      expect(__.compact(uncompacted)).toEqual([42]);
    });
  });

  describe("__.first", function() {
    it("returns the first element of an array", function() {
      expect(__.first([1, 2, 3])).toEqual(1);
    });

    it("returns an optional number of items", function() {
      expect(__.first([1, 2, 3], 2)).toEqual([1, 2]);
    });
  });

  describe("__.initial", function() {
    it("returns all entries but the last", function() {
      expect(__.initial([1, 2, 3])).toEqual([1, 2]);
    });

    it("returns all entries but the last (optional) n items", function() {
      expect(__.initial([1, 2, 3, 4], 2)).toEqual([1, 2]);
    });
  });

  describe("__.last", function() {
    it("returns the last element of an array", function() {
      expect(__.last([1, 2, 3])).toEqual(3);
    });

    it("returns the last (optional) n elements of an array", function() {
      expect(__.last([1, 2, 3], 2)).toEqual([2, 3]);
    });
  });
});
