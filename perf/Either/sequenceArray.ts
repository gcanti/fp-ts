import * as Benchmark from 'benchmark'
import * as A from '../../src/Array'
import * as E from '../../src/Either'
import { pipe } from '../../src/function'

/*
for an array with size 1000
A.sequence(E.either) x 311 ops/sec ±9.97% (59 runs sampled)
E.sequenceArray x 92,649 ops/sec ±9.29% (66 runs sampled)
Fastest is E.sequenceArray
*/

const suite = new Benchmark.Suite()

const arrE = pipe(A.range(0, 1000), A.map(E.right))

suite
  .add('A.sequence(E.either)', function () {
    pipe(arrE, A.sequence(E.either))
  })
  .add('E.sequenceArray', function () {
    pipe(arrE, E.sequenceArray)
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
