import { head } from '../src/Array'
import { left } from '../src/Either'
import { Option, option, some } from '../src/Option'
import { spy, trace, traceA, traceM } from '../src/Trace'

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
