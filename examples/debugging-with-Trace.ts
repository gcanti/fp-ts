import { head } from 'fp-ts/lib/Array'
import { left } from 'fp-ts/lib/Either'
import { Option, option, some } from 'fp-ts/lib/Option'
import { spy, trace, traceA, traceM } from 'fp-ts/lib/Trace'

//
// spy
//

const foo = left<string, number>('foo')
const bar = spy(foo.mapLeft(s => s.length))
console.log(bar)
// => left(3)

//
// trace
//

const bar2 = foo.mapLeft(s => trace('mapping the left side', () => s.length))
console.log(bar2)
// => 'mapping the left side'

//
// traceA
//

const traceAOption = traceA(option)

traceAOption('start computation')
  .chain(() => some(1))
  .chain(() => traceAOption('end computation'))
// => start computation
// => end computation

//
// traceM
//

const traceMOption = traceM(option)

const baz: Option<number> = some([1, 2, 3])
  .chain(traceMOption)
  .chain(head)
  .chain(traceMOption)
console.log(baz)
// => [1, 2, 3]
// => 1
