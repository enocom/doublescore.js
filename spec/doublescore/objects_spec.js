describe("object methods", function() {
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

    it("returns an array with the indices of each element", function() {
      expect(__.keys([1, 2])).toEqual(["0", "1"]);
    });
  });

  describe("__.values", function() {
    it("returns an object's values", function() {
      expect(__.values({a: 1, b: 2})).toEqual([1, 2]);
    });
  });

  describe("__.isEmpty", function() {
    it("returns true if object contains no values", function() {
      expect(__.isEmpty([])).toBeTruthy();
      expect(__.isEmpty([undefined, NaN, null])).toBeFalsy();
      expect(__.isEmpty([1, 2, 3])).toBeFalsy();
    });
  });

  describe("__.isArray", function() {
    it("returns true if the passed object is an Array", function() {
      expect(__.isArray([])).toBeTruthy();
      expect(__.isArray({})).toBeFalsy();
    });
  });
});
