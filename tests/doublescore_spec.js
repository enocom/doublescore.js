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
    it("iterates over an array with a function for each element", function() {
      var obj = [1, 2, 3],
          memo = [],
          iterator = function(item) {
            memo.push(item);
          };

      __.each(obj, iterator);

      expect(memo).toEqual([1, 2, 3]);
    });

    it("takes an iterator whose arguments include an optional index", function() {
      var obj = [1, 2, 3],
          memo = {},
          iterator = function(item, index) {
            memo[item] = index;
          };

      __.each(obj, iterator);

      expect(memo).toEqual({1: 0, 2: 1, 3: 2});
    });
  });
});