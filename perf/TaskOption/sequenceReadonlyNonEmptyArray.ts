import * as Benchmark from 'benchmark'
import * as RNEA from '../../src/ReadonlyNonEmptyArray'
import * as _ from '../../src/TaskOption'
import { pipe, SK } from '../../src/function'

/*
 */

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000), RNEA.map(_.of))

suite
  .add('RNEA.sequence(_.ApplicativeSeq)', async function () {
    await pipe(as, RNEA.sequence(_.ApplicativeSeq))()
  })
  .add('_.sequenceReadonlyNonEmptyArray', async function () {
    await pipe(as, _.traverseReadonlyNonEmptyArrayWithIndex(SK))()
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
