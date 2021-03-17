import * as Benchmark from 'benchmark'
import * as _ from '../../src/Either'
import { pipe } from '../../src/function'
import * as RNEA from '../../src/ReadonlyNonEmptyArray'

/*
 */

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000))

suite
  .add('RNEA.sequence(_.Applicative)', function () {
    pipe(as, RNEA.traverse(_.Applicative)(_.of))
  })
  .add('_.sequenceReadonlyNonEmptyArray', function () {
    pipe(as, _.traverseReadonlyNonEmptyArrayWithIndex(_.of))
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
