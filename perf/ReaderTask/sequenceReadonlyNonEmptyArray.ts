import * as Benchmark from 'benchmark'
import * as RNEA from '../../src/ReadonlyNonEmptyArray'
import * as _ from '../../src/ReaderTask'
import { pipe, SK } from '../../src/function'

/*
 RNEA.sequence(_.ApplicativeSeq) x 255 ops/sec ±6.38% (35 runs sampled)
_.sequenceReadonlyNonEmptyArray x 2,877 ops/sec ±7.83% (78 runs sampled)
Fastest is _.sequenceReadonlyNonEmptyArray
*/

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000), RNEA.map(_.of))

suite
  .add('RNEA.sequence(_.ApplicativeSeq)', async function () {
    await pipe(as, RNEA.sequence(_.ApplicativeSeq))(undefined)()
  })
  .add('_.sequenceReadonlyNonEmptyArray', async function () {
    await pipe(as, _.traverseReadonlyNonEmptyArrayWithIndex(SK))(undefined)()
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
