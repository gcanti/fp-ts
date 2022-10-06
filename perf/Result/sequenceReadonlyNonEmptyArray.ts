import * as Benchmark from 'benchmark'
import * as _ from '../../src/Result'
import { pipe } from '../../src/Function'
import * as RNEA from '../../src/NonEmptyReadonlyArray'

/*
 */

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000))

suite
  .add('RNEA.sequence(_.Applicative)', function () {
    pipe(as, RNEA.traverse(_.Applicative)(_.succeed))
  })
  .add('_.sequenceReadonlyNonEmptyArray', function () {
    pipe(as, _.traverseReadonlyNonEmptyArrayWithIndex(_.succeed))
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
