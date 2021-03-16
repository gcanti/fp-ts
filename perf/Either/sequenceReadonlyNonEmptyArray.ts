import * as Benchmark from 'benchmark'
import * as RNEA from '../../src/ReadonlyNonEmptyArray'
import * as _ from '../../src/Either'
import { pipe } from '../../src/function'

/*
 */

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000), RNEA.map(_.of))

suite
  .add('RNEA.sequence(_.Applicative)', function () {
    pipe(as, RNEA.sequence(_.Applicative))
  })
  .add('_.sequenceReadonlyNonEmptyArray', function () {
    pipe(as, _.sequenceReadonlyNonEmptyArray)
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
