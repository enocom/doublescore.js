describe("array methods", function() {
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

  describe("__.rest", function() {
    it("returns all but the first element of a collection", function() {
      expect(__.rest([1, 2, 3, 4])).toEqual([2, 3, 4]);
    });

    it("takes an optional index from which to start", function() {
      expect(__.rest([1, 2, 3, 4], 2)).toEqual([3, 4]);
    });
  });

  describe("__.without", function() {
    it("returns a copy of the array with all passed args removed", function() {
      var result = __.without([1, 2, 3], 2);
      expect(result).toEqual([1, 3]);
    });

    it("takes multiple values to remove", function() {
      var result = __.without([1, 2, 3], 2, 3);
      expect(result).toEqual([1]);
    });
  });

  describe("__.partition", function() {
    it("splits an array into arrays satisfying a predicate", function() {
      var isOdd = function(num) { return num % 2 !== 0; };

      expect(__.partition([1, 2, 3, 4], isOdd)).toEqual([[1, 3], [2, 4]]);
    });
  });

  describe("__.union", function() {
    it("returns all unique elements in multiple arrays", function() {
      expect(__.union([1, 2], [2, 3], [3, 4])).toEqual([1, 2, 3, 4]);
    });
  });

  describe("__.unique", function() {
    it("returns the unique values in an array", function() {
      expect(__.unique([1, 2, 2, 3, 4, 2])).toEqual([1, 2, 3, 4]);
    });
  });

  describe("__.intersection", function() {
    it("returns the elements common to multiple arrays", function() {
      expect(__.intersection([1, 2], [2, 10, 1], [3, 2, 1, 10]))
        .toEqual([1, 2]);
    });
  });

  describe("__.difference", function() {
    it("returns values not present in the other arrays", function() {
      expect(__.difference([1, 2, 3], [4, 5], [6, 7]))
        .toEqual([1, 2, 3]);
    });
  });

  describe("__.zip", function() {
    it("zips up a variable number of arrays", function() {
      var abc = ["a", "b", "c"],
          numbers = [1, 2, 3],
          xyz = ["x", "y", "z"];

      expect(__.zip(abc, numbers)).toEqual([["a", 1], ["b", 2], ["c", 3]]);
      expect(__.zip(abc, numbers, xyz))
        .toEqual([["a", 1, "x"], ["b", 2, "y"], ["c", 3, "z"]]);
    });
  });

  describe("__.range", function() {
    it("returns a range of integers up to a passed number", function() {
      var stop = 5;
      expect(__.range(stop)).toEqual([0, 1, 2, 3, 4]);
    });

    it("accepts an optional `start` argument", function() {
      var start = 1,
          stop = 5;
      expect(__.range(start, stop)).toEqual([1, 2, 3, 4]);
    });

    it("accepts an optional third `step` argument", function() {
      var start = 0,
          stop = 6,
          step = 2;
      expect(__.range(start, stop, step)).toEqual([0, 2, 4]);
    });

    it("returns an empty array if passed no arguments", function() {
      expect(__.range()).toEqual([]);
    });
  });

  describe("__.object", function() {
    it("converts arrays of keys and of values into an object", function() {
      var keys = ["Superman", "Batman", "Spiderman"],
          values = ["Clark Kent", "Bruce Wayne", "Peter Parker"],
          object = {
            "Superman" : "Clark Kent",
            "Batman"   : "Bruce Wayne",
            "Spiderman" : "Peter Parker"
          };

      expect(__.object(keys, values)).toEqual(object);
    });

    it("also takes an array of key, value pairs", function() {
      var moviesAndDirectors = [
        ["Kubrick", "Barry Lyndon"],
        ["Kurozawa", "Seven Samurai"],
        ["Anderson", "The Life Aquatic with Steve Zissou"]
      ];

      expect(__.object(moviesAndDirectors)).toEqual({
        Kubrick: "Barry Lyndon",
        Kurozawa: "Seven Samurai",
        Anderson: "The Life Aquatic with Steve Zissou"
      });
    });
  });
});
