QUnit.specify("Permutron", function(){
    describe("When generating 1 character IDs using 52 characters", function() {
        var perm = new Permutron(1, true);
        var ids = [];

        before(function(){
            while(!perm.depletedAvailableIds) {
                ids.push(perm.next());
            }
        });

        it("should have maxIdsPossible of 52", function(){
            assert(perm.maxIdsPossible()).equals(52);
        });

        it("should have actually generated 52 ids", function(){
            assert(ids.length).equals(52);
        });
    });
    describe("When generating up-to-2-character-IDs using 52 characters", function() {
        var perm = new Permutron(2);
        var ids = [];

        before(function(){
            while(!perm.depletedAvailableIds) {
                ids.push(perm.next());
            }
        });

        it("should have maxIdsPossible of 2,756", function(){
            assert(perm.maxIdsPossible()).equals(2756);
        });

        it("should have actually generated 2,756 ids", function(){
            assert(ids.length).equals(2756);
        });
    });
    describe("When generating up-to-3 character IDs using 52 characters", function() {
        var perm = new Permutron(3);
        var ids = [];

        before(function(){
            while(!perm.depletedAvailableIds) {
                ids.push(perm.next());
            }
        });

        it("should have maxIdsPossible of 143,364", function(){
            assert(perm.maxIdsPossible()).equals(143364);
        });

        it("should have actually generated 143,364 ids", function(){
            assert(ids.length).equals(143364);
        });
    });
    describe("When generating up-to-3 character IDs using 3 characters", function() {
        var perm = new Permutron(3, false, "ABC");
        var ids = [];

        before(function(){
            while(!perm.depletedAvailableIds) {
                ids.push(perm.next());
            }
        });

        it("should have maxIdsPossible of 39", function(){
            assert(perm.maxIdsPossible()).equals(39);
        });

        it("should have actually generated 39 ids", function(){
            assert(ids.length).equals(39);
        });
    });
    describe("When generating up-to-3 character IDs using 5 characters", function() {
        var perm = new Permutron(5, false, "ABC");
        var ids = [];

        before(function(){
            while(!perm.depletedAvailableIds) {
                ids.push(perm.next());
            }
        });

        it("should have maxIdsPossible of 363", function(){
            assert(perm.maxIdsPossible()).equals(363);
        });

        it("should have actually generated 363 ids", function(){
            assert(ids.length).equals(363);
        });
    });
});