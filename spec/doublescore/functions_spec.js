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
