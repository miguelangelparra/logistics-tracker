var Courses = artifacts.require("./Courses.sol");

contract('Courses', function (accounts) {
    it("should assert true", function(done) {
        var courses = Courses.deployed();
        assert.isTrue(true);
        done();
      })
});


contract("Courses", function(accounts){
    var coursesInstance;

    it("Should be true", function () {
        return Courses.deployed();
        assert.isTrue(true);
    });

    it("Should ")
});

