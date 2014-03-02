describe("collection methods (arrays and objects)", function() {
  /***************************************************
   * Collections
   ***************************************************/
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

    it("calls the iterator on all the values of an object", function() {
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

  describe("__.contains", function() {
    it("returns true if a value is present in a list", function() {
      expect(__.contains([1, 2], 2)).toBeTruthy();
      expect(__.contains([1, 2], 42)).toBeFalsy();
    });

    it("returns true if a value is present in an objects keys", function() {
      expect(__.contains({a: 1, b: 2}, 1)).toBeTruthy();
      expect(__.contains({a: 1, b: 2}, 0)).toBeFalsy();
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

  describe("__.invoke", function() {
    it("calls a function name on the elements of a collection", function() {
      expect(__.invoke([[5, 4, 3], [3, 2, 1]], "sort"))
        .toEqual([[3, 4, 5], [1, 2, 3]]);
    });

    it("accepts a function as well", function() {
      var sort = function(unsortedCollection) {
        return unsortedCollection.sort();
      };

      expect(__.invoke([[5, 4, 3], [3, 2, 1]], sort))
        .toEqual([[3, 4, 5], [1, 2, 3]]);
    });

    it("accepts a function and forwards variable arguments", function() {
      var multiplyByTwoAndAdd = function(valueToMultiply, addValue) {
        return (valueToMultiply * 2) + addValue;
      };

      expect(__.invoke([2, 3], multiplyByTwoAndAdd, 3))
        .toEqual([7, 9]);
    });
  });

  describe("__.sortBy", function() {
    it("returns a sorted copy of a list according to an iterator", function() {
      var unsorted = [1, 2, 3],
          sin      = function(num) { return Math.sin(num); },
          expected = [3, 1, 2];

      expect(__.sortBy(unsorted, sin)).toEqual(expected);
    });

    it("also takes a property as an iterator", function() {
      var unsorted = [[1, 2, 3], [1, 2], [1]],
          expected = [[1], [1, 2], [1, 2, 3]];

        expect(__.sortBy(unsorted, "length")).toEqual(expected);
      });
    });

    describe("__.sample", function() {
      it("returns a random element from a collection", function() {
        spyOn(Math, "random").and.returnValue("1");

        expect(__.sample([1, 2, 3])).toEqual(2);
      });

      it("takes an optional number of desired elements", function() {
        var i = 0,
        numberGenerator = function() {
          var firstIndex = 1,
              secondIndex = 0;
          if (i == 0) {
            i++;
            return firstIndex;
          }
          return secondIndex;
        };

        spyOn(Math, "random").and.callFake(numberGenerator);

        expect(__.sample([1, 2, 3], 2)).toEqual([2, 1]);
    });
  });

  // Collections ToDo:
  // where, findWhere, reduceRight, findWhere,
  // indexBy, countBy, shuffle,
  // toArray
});
