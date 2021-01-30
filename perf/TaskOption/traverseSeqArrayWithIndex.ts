import * as Benchmark from 'benchmark'
import * as A from '../../src/Array'
import * as _ from '../../src/TaskOption'
import { pipe } from '../../src/function'

/*
A.traverseWithIndex(_.ApplicativeSeq) x 309 ops/sec ±8.49% (67 runs sampled)
_.traverseSeqArrayWithIndex x 1,502 ops/sec ±4.20% (20 runs sampled)
Fastest is _.traverseSeqArrayWithIndex
*/

const suite = new Benchmark.Suite()

const as = A.range(0, 1000)

suite
  .add('A.traverseWithIndex(_.ApplicativeSeq)', function () {
    return pipe(
      as,
      A.traverseWithIndex(_.ApplicativeSeq)((_i, a) => _.of(a))
    )()
  })
  .add('_.traverseSeqArrayWithIndex', function () {
    return pipe(
      as,
      _.traverseSeqArrayWithIndex((_i, a) => _.of(a))
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
