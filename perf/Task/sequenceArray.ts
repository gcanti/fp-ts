import * as Benchmark from 'benchmark'
import * as RNEA from '../../src/ReadonlyNonEmptyArray'
import * as _ from '../../src/Task'
import { pipe } from '../../src/function'

/*
A.sequence(_.ApplicativePar) x 390 ops/sec ±13.15% (44 runs sampled)
_.sequenceArray x 3,460 ops/sec ±7.30% (57 runs sampled)
Fastest is _.sequenceArray
*/

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000), RNEA.map(_.of))

suite
  .add('A.sequence(_.ApplicativePar)', function () {
    return pipe(as, RNEA.sequence(_.ApplicativePar))()
  })
  .add('_.sequenceArray', function () {
    // tslint:disable-next-line: deprecation
    return pipe(as, _.sequenceArray)()
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
