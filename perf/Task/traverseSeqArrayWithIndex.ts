import * as Benchmark from 'benchmark'
import * as A from '../../src/Array'
import * as T from '../../src/Task'
import { pipe } from '../../src/function'

/*
traverseSeqArrayWithIndex x 416 ops/sec ±8.78% (50 runs sampled)
*/

const suite = new Benchmark.Suite()

const as = A.range(0, 1000)

suite
  .add('A.traverseWithIndex(T.ApplicativeSeq)', function () {
    return pipe(
      as,
      A.traverseWithIndex(T.ApplicativeSeq)((_, a) => T.of(a))
    )()
  })
  .add('traverseSeqArrayWithIndex', function () {
    return pipe(
      as,
      T.traverseSeqArrayWithIndex((_, a) => T.of(a))
    )()
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
