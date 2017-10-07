import { left } from 'fp-ts/lib/Either'
import * as array from 'fp-ts/lib/Array'
import * as option from 'fp-ts/lib/Option'
import { spy, trace, traceA, traceM } from 'fp-ts/lib/Trace'

//
// spy
//

const foo = left<string, number>('foo')
const bar = spy(foo.mapLeft(s => s.length))
// => left(3)

//
// trace
//

const bar2 = foo.mapLeft(s => trace('mapping the left side', () => s.length))
// => 'mapping the left side'

//
// traceA
//

const traceAOption = traceA(option)

traceAOption('start computation').chain(() => option.some(1)).chain(() => traceAOption('end computation'))
// => start computation
// => end computation

//
// traceM
//

const traceMOption = traceM(option)

const baz: option.Option<number> = option.some([1, 2, 3]).chain(traceMOption).chain(array.head).chain(traceMOption)
// => [1, 2, 3]
// => 1
