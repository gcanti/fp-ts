import * as Benchmark from 'benchmark'
import * as RNEA from '../../src/ReadonlyNonEmptyArray'
import * as _ from '../../src/TaskEither'
import { pipe } from '../../src/function'

/*
A.traverseWithIndex(_.ApplicativeSeq) x 309 ops/sec ±8.49% (67 runs sampled)
_.traverseSeqArrayWithIndex x 1,502 ops/sec ±4.20% (20 runs sampled)
Fastest is _.traverseSeqArrayWithIndex
*/

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000))

suite
  .add('A.traverseWithIndex(_.ApplicativeSeq)', function () {
    return pipe(
      as,
      RNEA.traverseWithIndex(_.ApplicativeSeq)((_i, a) => _.of(a))
    )()
  })
  .add('_.traverseReadonlyArrayWithIndexSeq', function () {
    return pipe(
      as,
      _.traverseReadonlyArrayWithIndexSeq((_i, a) => _.of(a))
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
