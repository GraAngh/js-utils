'use strict';

const msgs = require('.\\msg\\ArgumentError.json');

class ArgumentError extends Error
{
    constructor (argPos, argName, msgIndex) {
        super(msgs[msgIndex] ? msgs[msgIndex] : '[сообщение не определено]');
        this.name = 'ArgumentError';
        this.argument = {};
        this.argument.position = argPos;
        this.argument.name = argName;
    }
}

module.exports = ArgumentError;