import * as Benchmark from 'benchmark'
import * as A from '../../src/ReadonlyArray'
import * as O from '../../src/Option'
import { pipe } from '../../src/function'

/*
for an array with size 1000
A.sequence(O.Applicative) x 1,140 ops/sec ±0.23% (90 runs sampled)
O.sequenceReadonlyArray x 77,823 ops/sec ±2.87% (87 runs sampled)
Fastest is O.sequenceReadonlyArray
*/

const suite = new Benchmark.Suite()

const arr = A.range(0, 1000)

suite
  .add('A.sequence(O.option)', function () {
    return pipe(arr, A.map(O.some), A.sequence(O.Applicative))
  })
  .add('O.sequenceReadonlyArray', function () {
    return pipe(arr, A.map(O.some), O.sequenceReadonlyArray)
  })
  .on('cycle', function (event: any) {
    // tslint:disable-next-line: no-console
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    // tslint:disable-next-line: no-console
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
