describe("__.partial", function() {
  it("creates a partial function", function() {
    var add = function(a, b) { return a + b; },
        addTwo = __.partial(add, 2);

    expect(addTwo(2)).toEqual(4);
  });

  it("accepts multiple arguments", function() {
    var addThreeNums = function(a, b, c) { return a + b + c; },
        addTwoAndThree = __.partial(addThreeNums, 2, 3);

    expect(addTwoAndThree(4)).toEqual(9);
  });
});

describe("__.bind", function() {
  it("binds a function to an object", function() {
    var f = function() { return "Hi " + this.name + "!"; };

    f = __.bind(f, { name: "Eno" });

    expect(f()).toEqual("Hi Eno!");
  });
});
