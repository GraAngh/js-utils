'use strict';

const msgs = require('.\\msg\\PropertyHandlerError.json');

class PropertyHandlerError extends Error
{
    constructor (pName, mIndex) {
        super(msgs[mIndex] ? 
            `${pName}: ${msgs[mIndex]}` : 
            `${pName}: [сообщение не определно]`);
        this.name = 'PropertyHandlerError';
        this.propertyName = pName;
    }
}

module.exports = PropertyHandlerError;