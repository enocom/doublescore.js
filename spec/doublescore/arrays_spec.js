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
});