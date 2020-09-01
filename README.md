
# Установка

|production|dev|
|:---|:---|
|`npm i @graangh/utils`| `npm i -D @graangh/utils`|

# Использование

```js
// Node.js
const {Type, PropertyHandler} = require('@graangh/utils');
```

# Документация
*ДОСТУПНЫЕ ИНСТРУМЕНТЫ*:

- [Type](#type-section-anchor)  — Объект для работы с типом произвольного значения
- [PropertyHandler](#propertyhandler-section-anchor) - Класс для обработки свойств объекта

## <a id="type-section-anchor">*Type*</a> 

Объект для работы с типом произвольного значения.

### Константы
```js 
Type.UNDEFINED = 'undefined'
Type.NULL      = 'null'
Type.BOOLEAN   = 'boolean'
Type.NUMBER    = 'number'
Type.STRING    = 'string'
Type.ARRAY     = 'array'
Type.FUNCTION  = 'function'
Type.OBJECT    = 'object'
Type.Symbol    = 'symbol'
```

### Методы
 - **`of`**_`(value)`_ - определение типа для переданного значения 
	
 > Значение возвращается в виде предоставленных констант выше.
 > Для объекта __без прототипа__ вернет *Boolean(FALSE)*
	 
```js
const { Type } = require('@graangh/utils');
	
console.log( Type.of('hello world') ); // Выведет <string> string 
console.log( Type.of(0) );             // Выведет <string> number
console.log( Type.of(undefined) );     // Выведет <string> undefined
console.log( Type.of(null) );          // Выведет <string> null
console.log( Type.of(Object.create(null)) ); // Выведет <string> object
console.log( Type.of() );              // Выведет <boolean> false
``` 

## <a id="propertyhandler-section-anchor">*PropertyHandler*</a> 

Класс для обработки свойств объекта

```js
/*
 * Создание экземпляра
 * 
 *      target - required
 * description - optional
 */
const ph = new PropertyHandler(target, description);
```

### Методы

- **`describe`**_`(description)`_ — добавление описания свойств объекта

*description* — это объект, где имя свойства совпадает с именем свойства объекта *target*, переданным в конструктор **PropertyHandler**.

```
description = {
	[targetPName: descriptor]
	[...]
};
```

 Значением для каждого свойства выступает условный объект *descriptor* (*перечислен исчерпывающий список доступных свойств*): 

```
descriptor = {
	default: <any>
	[type: <String|Array> of Type formatted like]
	[extra: <Function>]
}
```

|имя свойства `descriptor`|обязательное|описание|
|:---|:---:|---|
|`default`|&#9989;|Значение по умолчанию. Применяется если исходное значение не проходит проверку|
|`type`||Тип переменной. Указывается в формате объекта [Type](#type-section-anchor)|
|`extra`||Дополнительная функция проверки. `function(value)`, где *value* - исходное значение. Функция должна вернуть значение, которое рассматривается как ***true*** или ***false***  |

Все свойства *descriptor* не являются обязательными.

### Пример *Description*:

```js
const description = {
	'property-one' : {
		default: 1,
		type: Type.NUMBER,
		extra: v => v > 0 && v < 10 
	},
	// Можно указать некоторые из них
	'property-two' : {
		default: 'hello',
		type: Type.STRING
	},
	'property-three' : {
		default: null,
		// список для множества типов
		type: [Type.NULL, Type.ARRAY]
	},
	'property-four' : {
		default: new Date,
		type: Type.OBJECT,
		extra: v => v instanceof Date
	},
	// В таком случае default = undefined
	// тип значения любой
	// проверка проведется только по extra 
	'property-five' : {
		extra: v => v instanceof Date
	}
};
```

После вызова _**describe**_() и происходит обработка целевого объекта. 
Можно просто передать _description_ конструктору и обойтись без вызова данного метода.


[function.name article-en]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#JavaScript_compressors_and_minifiers
[function.name article-ru]: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/name#JavaScript_compressors_and_minifiers