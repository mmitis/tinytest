'use strict';

/**
 * Assertion class
 * @param value - value to compare
 * @constructor
 */
const Assertion = function (value){
    //properties
    this._props = {
        negable : false,
        value: value
    };
    this.defineMiddleOperator('not', 'negable', !this._props.negable);
};

/**
 * Sets new middleware operators which changes properties
 * @param propertySelector - name of the operator which to set
 * @param propertyName - name of edited property
 * @param propertyValue - new value of the property
 */
Assertion.prototype.defineMiddleOperator = function(propertySelector, propertyName, propertyValue){
    Object.defineProperty(this, propertySelector, { get: ()=> {
        let clone = Object.create(Assertion.prototype);
        Assertion.call(clone, this._props.value);
        clone._props[propertyName] = propertyValue;
        return clone;
    }
    });
};

/**
 * Parses the compare functions and check if the condition is passed
 * @param expression - function which compares to the value func(value){}
 * @returns {boolean}
 */
Assertion.prototype.to = function(expression) {
    if(typeof expression == 'function'){
        return this._props.negable ? !expression(this._props.value) : expression(this._props.value);
    } else {
        return expression === this._props.value;
    }
};

/**
 * Returns new assertion object
 * @param value - value to compare
 * @returns {Assertion}
 */
const expect = function(value){
    return new Assertion(value);
};

/**
 * Compare if the selected value is equal to expected
 * @param assertionValue - value to compare
 * @returns {Function} function for the comparator
 */
const eq = function(assertionValue){
    return (expectValue)=> {
        return assertionValue == expectValue;
    };
};

/**
 * Compare if the selected value is lower than expected
 * @param assertionValue - value to compare
 * @returns {Function} function for the comparator (false is one of argument is not number)
 */
const beGreaterThan = function(assertionValue){
    return (expectValue)=> {
        return !isNaN(assertionValue) && !isNaN(expectValue) ? assertionValue < expectValue : false;
    };
};

module.exports = {
    expect,
    eq,
    beGreaterThan
};
