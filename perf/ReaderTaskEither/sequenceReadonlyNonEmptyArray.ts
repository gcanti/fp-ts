import * as Benchmark from 'benchmark'
import { pipe } from '../../src/function'
import * as _ from '../../src/ReaderTaskEither'
import * as RNEA from '../../src/ReadonlyNonEmptyArray'

/*
 */

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000))

suite
  .add('RNEA.sequence(_.ApplicativeSeq)', async function () {
    await pipe(as, RNEA.traverse(_.ApplicativeSeq)(_.of))(undefined)()
  })
  .add('_.sequenceReadonlyNonEmptyArray', async function () {
    await pipe(as, _.traverseReadonlyNonEmptyArrayWithIndex(_.of))(undefined)()
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
