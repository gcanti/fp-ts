import * as Benchmark from 'benchmark'
import * as RNEA from '../../src/ReadonlyNonEmptyArray'
import * as _ from '../../src/ReaderTaskEither'
import { pipe } from '../../src/function'

/*
A.traverseWithIndex(_.ApplicativeSeq) x 200 ops/sec ±6.32% (44 runs sampled)
_.traverseSeqArrayWithIndex x 4,132 ops/sec ±8.65% (67 runs sampled)
Fastest is _.traverseSeqArrayWithIndex
*/

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000))

suite
  .add('A.traverseWithIndex(_.ApplicativeSeq)', function () {
    return pipe(
      as,
      RNEA.traverseWithIndex(_.ApplicativeSeq)((_i, a) => _.of(a))
    )(undefined)()
  })
  .add('_.traverseReadonlyArrayWithIndexSeq', function () {
    return pipe(
      as,
      _.traverseReadonlyArrayWithIndexSeq((_i, a) => _.of(a))
    )(undefined)()
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
