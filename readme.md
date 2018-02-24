# intersperse-iterable

Interjects a value between each iterated item.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i intersperse-iterable
```

## API

The module exports a single function.

### Parameters

1. Bindable: `iter` (iterable)
2. Optional: `separator` (function or any): A value to interleave between each item iterated by `iter`, or a callback that generates such a value. If `separator` is a function, it will be passed four arguments: the index of the first item, the first item itself, the index of the second item, and the second item itself. The callback’s return value will be inserted between the first and second items.

### Return Value

An iterator which yields the values from `iter`, interleaved with values as determined by `separator`.

## Example

```javascript
const intersperse = require('intersperse-iterable')

const iter1 = intersperse(['work', 'work'], 'break')
Array.from(iter1) // ['work', 'break', 'work']

const iter2 = intersperse([1, 3, 5], (index1, value1, index2, value2) => value1 + value2)
Array.from(iter2) // [1, 4, 3, 8, 5]

// Supports the bind operator
const iter3 = [1, 2, 3]::intersperse((i1, val1) => val1 + 0.5)
Array.from(iter3) // [1, 1.5, 2, 2.5, 3]
```

## Related

* [intersperse-array](https://github.com/lamansky/intersperse-array)
