import * as Benchmark from 'benchmark'
import { pipe } from '../../src/Function'
import * as RNEA from '../../src/ReadonlyNonEmptyArray'
import * as _ from '../../src/TaskThese'
import * as S from '../../src/string'
import * as T from '../../src/Async'

/*
RNEA.traverse(_.getApplicative(T.ApplicativePar, S.Semigroup)) x 324 ops/sec ±8.10% (59 runs sampled)
_.sequenceReadonlyNonEmptyArray x 2,620 ops/sec ±8.45% (78 runs sampled)
Fastest is _.sequenceReadonlyNonEmptyArray
*/

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000))

suite
  .add('RNEA.traverse(_.getApplicative(T.ApplicativePar, S.Semigroup))', async function () {
    await pipe(as, RNEA.traverse(_.getApplicative(T.ApplicativePar, S.Semigroup))(_.of))()
  })
  .add('_.sequenceReadonlyNonEmptyArray', async function () {
    await pipe(as, _.traverseReadonlyNonEmptyArrayWithIndex(S.Semigroup)(_.of))()
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
