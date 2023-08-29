# utility-is

> Utils for javascript

## Install
```sh
pnpm add utility-is
```

## Usage

```js
import u from 'utility-is'

u('❤️');
// => string

u.isString('❤️')
// => true

u.isNonNullable(null)
// => false
```

## Api

### u(value)

return the type of `value`

Example:
 - `'string'`
 - `'number'`
 - `'boolean'`
 - `'array'`
 - `'object'`
 - `'symbol'`
 - `'map'`
 - `'set'`

### u.isXXX

like:
##### isNumber(value)

##### isArray(value)

##### isPromise(value)

##### isAsyncFunction(value)

return `false` if there is no `await` statement in the function

```text
And More...
```
