'use strict';
/*\
|*|
|*| DEFINITION
|*|
\*/ 
const Type = {
    /** 
     *  Получнеие типа значения
     *
     *  @var any value Значение, для которого идет утверждение
     *
     *  @return string 
     */    
    of(value)
    {
        // аргумент не передан
        if (!arguments.length) {
            return false;
        }
        
        // особые переменные
        if (value === null) {
            return this.NULL;
        } 
        if (value === undefined) {
            return this.UNDEFINED;
        }
        
        // проверка наличия прототипа
        if (!value.__proto__) {
            return false;
        }
        return value.__proto__.constructor.name; 
    }
};

Object.defineProperties(Type, {
    'UNDEFINED': {
         value: 'undefined', 
         enumerable : true
    },
    'NULL': {
         value: 'null', 
         enumerable : true
    },
    'BOOLEAN': {
         value: 'boolean', 
         enumerable : true
    },
    'STRING': {
         value: 'string', 
         enumerable : true
    },
    'NUMBER': {
         value: 'number', 
         enumerable : true
    },
    'ARRAY': {
         value: 'array', 
         enumerable : true
    },
    'FUNCTION': {
         value: 'function', 
         enumerable : true
    },
    'OBJECT': {
         value: 'object', 
         enumerable : true
    },
    'SYMBOL': {
         value: 'symbol', 
         enumerable : true
    },
});
/*\
|*|
|*| EXPORT
|*|
\*/ 
module.exports = Type;