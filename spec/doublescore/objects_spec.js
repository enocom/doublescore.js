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

  describe("__.isString", function() {
    it("returns true if the passed object is a String", function() {
      expect(__.isString("")).toBeTruthy();
      expect(__.isString([])).toBeFalsy();
    });
  });

  describe("__.isObject", function() {
    it("returns true if the parameter is an object", function() {
      expect(__.isObject({})).toBeTruthy();
      expect(__.isObject([])).toBeFalsy();
    });
  });

  describe("__.isUndefined", function() {
    it("returns true if the parameter is undefined", function() {
      expect(__.isUndefined(undefined)).toBeTruthy();
      expect(__.isUndefined(nullContext.foobar)).toBeTruthy();
    });

    it("returns false for all non-undefined values", function() {
      expect(__.isUndefined(null)).toBeFalsy();
      expect(__.isUndefined(false)).toBeFalsy();
      expect(__.isUndefined(NaN)).toBeFalsy();
      expect(__.isUndefined("")).toBeFalsy();
      expect(__.isUndefined(0)).toBeFalsy();
    });
  });

  describe("__.isNaN", function() {
    it("returns true if the parameter is NaN", function() {
      expect(__.isNaN(NaN)).toBeTruthy();
      expect(__.isNaN(undefined)).toBeFalsy();
    });
  });

  describe("__.isNumber", function() {
    it("returns true if the obejct is a number", function() {
      expect(__.isNumber(1)).toBeTruthy();
      expect(__.isNumber([])).toBeFalsy();
    });
  });

  describe("__.isFunction", function() {
    it("returns true if the object is a function", function() {
      var func = function() {};
      expect(__.isFunction(func)).toBeTruthy();
      expect(__.isFunction([])).toBeFalsy();
    });
  });
});
