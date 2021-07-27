import * as Benchmark from 'benchmark'
import * as RNEA from '../../src/ReadonlyNonEmptyArray'
import * as _ from '../../src/StateReaderTaskEither'
import { pipe } from '../../src/function'

/*
A.sequence(_.Applicative) x 5,930 ops/sec ±0.39% (90 runs sampled)
_.sequenceArray x 21,057,757 ops/sec ±0.84% (88 runs sampled)
Fastest is _.sequenceArray
*/

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000), RNEA.map(_.of))

suite
  .add('A.sequence(_.Applicative)', function () {
    pipe(as, RNEA.sequence(_.Applicative))
  })
  .add('_.sequenceArray', function () {
    // tslint:disable-next-line: deprecation
    pipe(as, _.sequenceArray)
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
