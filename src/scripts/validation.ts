module Validation {
    declare var tv4:any;
    declare var Schemas:any;

    export function validate(entity:String, obj) {
        var result =  tv4.validateResult(obj, Schemas.definitions[""+entity]);
        return result;
    }
}