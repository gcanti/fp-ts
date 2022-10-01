import * as Benchmark from 'benchmark'
import * as _ from '../../src/These'
import { pipe } from '../../src/f'
import * as RNEA from '../../src/ReadonlyNonEmptyArray'
import * as S from '../../src/string'

/*
RNEA.sequence(_.getApplicative(S.Semigroup)) x 1,162 ops/sec ±0.29% (89 runs sampled)
_.sequenceReadonlyNonEmptyArray x 170,081 ops/sec ±0.29% (88 runs sampled)
Fastest is _.sequenceReadonlyNonEmptyArray
*/

const suite = new Benchmark.Suite()

const as = pipe(RNEA.range(0, 1000))

suite
  .add('RNEA.sequence(_.getApplicative(S.Semigroup))', function () {
    pipe(as, RNEA.traverse(_.getApplicative(S.Semigroup))(_.of))
  })
  .add('_.sequenceReadonlyNonEmptyArray', function () {
    pipe(as, _.traverseReadonlyNonEmptyArrayWithIndex(S.Semigroup)(_.of))
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
