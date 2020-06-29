import * as Benchmark from 'benchmark'
import * as A from '../../src/Apply'
import * as E from '../../src/Either'

/*
sequenceT (1) x 15,737,986 ops/sec ±0.71% (88 runs sampled)
sequenceT (2) x 8,389,840 ops/sec ±0.65% (86 runs sampled)
sequenceT (3) x 5,759,450 ops/sec ±0.54% (90 runs sampled)
sequenceT (4) x 4,307,637 ops/sec ±1.44% (85 runs sampled)
sequenceT (5) x 3,464,223 ops/sec ±1.75% (85 runs sampled)
sequenceT (6) x 1,899,460 ops/sec ±2.75% (84 runs sampled)
*/

const suite = new Benchmark.Suite()

const sequenceT = A.sequenceT(E.applicativeEither)

suite
  .add('sequenceT (1)', function () {
    sequenceT(E.right(1))
  })
  .add('sequenceT (2)', function () {
    sequenceT(E.right(1), E.right(2))
  })
  .add('sequenceT (3)', function () {
    sequenceT(E.right(1), E.right(2), E.right(3))
  })
  .add('sequenceT (4)', function () {
    sequenceT(E.right(1), E.right(2), E.right(3), E.right(4))
  })
  .add('sequenceT (5)', function () {
    sequenceT(E.right(1), E.right(2), E.right(3), E.right(4), E.right(5))
  })
  .add('sequenceT (6)', function () {
    sequenceT(E.right(1), E.right(2), E.right(3), E.right(4), E.right(5), E.right(6))
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
