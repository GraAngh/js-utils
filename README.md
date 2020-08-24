
# Install
`npm install @graangh/utils`

# Usage

## Node.js

```js
const {Type, PropertyHandler} = require('@graangh/utils');
```

# Documentation

##  _Type_
Объект для работы с типом некоторого значения

### Constants
```js 
Type.UNDEFINED = 'undefined'
Type.NULL      = 'null'
Type.BOOLEAN   = 'Boolean'
Type.NUMBER    = 'Number'
Type.STRING    = 'String'
Type.ARRAY     = 'Array'
Type.FUNCTION  = 'Function'
Type.OBJECT    = 'Object'
```
### Methods
 - **of** (_value_) - определение типа для переданного значения 
	 > Значение возвращается в виде предоставленных констант выше.
	 > Для объекта __без прототипа__ вернет *Boolean(FALSE)*
	```js
	const { Type } = require('@graangh/utils');
	
	console.log( Type.of('hello world') ); // Выведет <string> String 
	console.log( Type.of(0) );             // Выведет <string> Number
	console.log( Type.of(undefined) );     // Выведет <string> undefined
	console.log( Type.of(null) );          // Выведет <string> null
	console.log( Type.of(Object.create(null)) ); // Выведет <boolean> false
	console.log( Type.of() );              // Выведет <boolean> false
	``` 
## _PropertyHandler_
Класс для обработки свойств объекта
```js
// Создание экземпляра
const ph = new PropertyHandler(targetObj[, descriptionObj]);
```

### Methods
- **describe** (_descriptionObj_)  - добавление описания свойств объекта

```js
const description = {
	// Исчерпывающий список полей доступных для описания
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
	'property-three': {}
};
```

После вызова _**describe**_() и происходит обработка целевого объекта. 
Можно просто передать _descriptionObj_ конструктору и обойтись без вызова данного метода.