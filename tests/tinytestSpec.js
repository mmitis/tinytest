'use strict';

let testsuite = require('./../lib/tinytest');
let expectTiny = testsuite.expect,
    beGreaterThan = testsuite.beGreaterThan,
    eq = testsuite.eq;

describe('Test tinytest :)', function(){

    it('should check base type - equations', function(){
        expect(
            expectTiny(1).to(eq(1))
        ).toBe(true);

        expect(
            expectTiny(2).to(eq(1))
        ).toBe(false);
    });

    it('should check base type - beGreaterThan ', function(){
        expect(
            expectTiny(1).to(beGreaterThan(0))
        ).toBe(true);

        expect(
            expectTiny(3).to(beGreaterThan(7))
        ).toBe(false);
    });

    it('should check base type - NOT operator', function(){
        expect(
            expectTiny(1).not.to(eq(1))
        ).toBe(false);

        expect(
            expectTiny(1).not.to(eq(2))
        ).toBe(true);

        expect(
            expectTiny(1).not.not.not.to(eq(2))
        ).toBe(true);

        expect(
            expectTiny(1).not.to(beGreaterThan(2))
        ).toBe(true);
    });

    it('should compare functions', function(){
        let func1 = ()=>{};
        let func2 = ()=>{};

        expect(
            expectTiny(func1).not.to(eq(func2))
        ).toBe(true);

        func1 = func2;

        expect(
            expectTiny(func1).to(eq(func2))
        ).toBe(true);

    });

    it('should returns false when compare arguments are not numbers', function(){
        let func1 = ()=>{};

        expect(
            expectTiny(func1).to(beGreaterThan(1))
        ).toBe(false);

    })
});