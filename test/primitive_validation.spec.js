
var validPrimitives = {
    aNumber: 1,
    aBoolean: false,
    aString: "a",
    anEnum: "Monday"
};

describe('A Number', function () {
    it('should be a number', function () {

        var result = Validation.validate('Primitives', validPrimitives);
        expect(result.valid).toBe(true);
    });

    it('should not be something else', function () {
        var obj = JSON.parse(JSON.stringify(validPrimitives))
        obj.aNumber = "Abc";

        var result = Validation.validate('Primitives', obj);
        expect(result.valid).toBe(false);
        expect(result.error.code).toBe(tv4.errorCodes.INVALID_TYPE);
    });
});