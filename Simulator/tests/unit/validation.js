import should from 'should';
import * as consts from '../../utils/consts.js';
import { validateData, validateSchema } from '../../utils/validation.js';

//Validation Tests
describe("Validation", function() {
  describe("validateData", function() {
    it("Should Reject Non Array Data", function () {
      const data = {"x": 42, "y": 42};
      validateData(data).should.be.false();
    })

    it("Should Reject Non Array/Object Entries", function () {
      const data = [42]
      validateData(data).should.be.false();
    })

    it("Should Accept Array Data with Array Entries", function () {
      const data = [[1, 2, 3], [1,2,3]];
      validateData(data).should.be.true();
    })

    it("Should Accept Array Data with Object Entries", function () {
      const data = [{ "x": 1, "y":2 }, { "x":1, "y":2 }];
      validateData(data).should.be.true();
    })
  });

  describe("validateSchema", function() {
    it("Should Reject Non Array Schema List", function () {
      const data = { id: "id", columns : [{ id:1, dataType: "int" }] };
      validateSchema(data).should.be.false();
    })

    it("Should Reject Schema Without Id", function () {
      const data = [{ columns : [{ id:1, dataType: "int" }] }];
      validateSchema(data).should.be.false();
    })

    it("Should Reject Schema Without Columns", function () {
      const data = [{ id: "id" }];
      validateSchema(data).should.be.false();
    })

    it("Should Accept Correct Schema", function () {
      const data = [{ id: "id", columns : [{ id:1, dataType: "int" }] }];
      validateSchema(data).should.be.true();
    })
  });
});
