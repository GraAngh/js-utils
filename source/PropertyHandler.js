'use strict';
/** 
 * @author GA graang@gmail.com
 */
 
/*\
|*|
|*| DEPENDENCIES
|*|
\*/
const Type = require('.\\Type.js');
const ArgumentError = require('.\\Error\\ArgumentError.js');
const PropertyHandlerError = require('.\\Error\\PropertyHandlerError.js');
/*\
|*|
|*| DEFINITION
|*|
\*/

/** 
 * Объект-обертка для объекта.
 *
 * Проводит обработку свойств с заданными параметрами. 
 * Проверяет/изменяет значения свойств.
 *
 * @var object target Обробатываемый объекта
 */
function PropertyHandler(target, description)
{   
    if (Type.of(target) !== Type.OBJECT) {
        throw new ArgumentError(1, 'target', 'obj');
    }
    Object.defineProperties(this, {
        target: {
            value: target
        }
    });
    
    if (description) {
        this.describe(description);
    }
}

/**
 * Описание каждого необходимого свойства 
 *  
 * Объект описания имеет общую структуру 
 * {
 *     (property-name): {     # имя контролируемого свойства исходного объекта
 *        [default:    <any>] # значение (не обзательное) 
 *        [type:    <string>] # имя типа значения в соответсвии с модулем Type (не обзательное) 
 *        [extra: <callable>] # функция дополнительной проверки (не обзательное) 
 *     }  
 * }
 *
 * @var <object> description Объект описания свойств
 */
PropertyHandler.prototype.describe = function(description) {
    this.description = description;
    this._handle();
};

/**
 * Обработка свойства объекта 
 */
PropertyHandler.prototype._handle = function handle() {
    const pNames = Object.keys(this.description);
    pNames.forEach(pName => {
        this.description[pName].type = 
            this._normalizeTypePresentation(this.description[pName].type); 
        if (!this._check(this.description[pName].default, this.description[pName])) {
            throw new PropertyHandlerError(pName, 'description-default');
        }
        this._handleProperty(pName);
    }); 
};
/**
 * Внутренний метод преобразования аргумента vType
 *
 * @var <string>|<array>|<undefined> значение типа свойства объекта
 *
 * @return <array>|<undefined> нормализованное представление типа свойства объекта
 */
PropertyHandler.prototype._normalizeTypePresentation = function(vType) {
    switch ( Type.of(vType) ) {
    case Type.STRING:
        vType = [vType];
        break;
    case Type.UNDEFINED:
    case Type.ARRAY:
        break;
    default:
        throw new ArgumentError(3, 'vType', 'str|arr|undef');
    }
    return vType;
};

PropertyHandler.prototype._check = function(value, description) {
    if (description.type === undefined) {
        return true;
    }
    if (description.type.some(t => Type.of(value) === t)) {
        if (description.extra) {
            if ( description.extra(value) ) {
                return true;
            }
            return false;
        }
        return true;
    }
    
    return false;
};

PropertyHandler.prototype._handleProperty = function(pName) {
    if (!this._check(this.target[pName], this.description[pName])) {
        this.target[pName] = this.description[pName].default;        
    }
};
/*\
|*|
|*| EXPORT
|*|
\*/
module.exports = PropertyHandler;
