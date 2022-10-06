import * as Benchmark from 'benchmark'
import { pipe } from '../../src/Function'
import * as _ from '../../src/ReaderAsyncResult'
import * as RNEA from '../../src/NonEmptyReadonlyArray'

/*
 */

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000))

suite
  .add('RNEA.sequence(_.Applicative)', async function () {
    await pipe(as, RNEA.traverse(_.Applicative)(_.succeed))(undefined)()
  })
  .add('_.sequenceReadonlyNonEmptyArray', async function () {
    await pipe(as, _.traverseReadonlyNonEmptyArrayWithIndex(_.succeed))(undefined)()
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
