describe("__.partial", function() {
  it("creates a partial function", function() {
    var add = function(a, b) { return a + b; },
        addTwo = __.partial(add, 2);

    expect(addTwo(2)).toEqual(4);
  });
});
