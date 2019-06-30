import * as Benchmark from 'benchmark'
import { getUnionMonoid } from '../../src/Set'
import { eqString } from '../../src/Eq'

const suite = new Benchmark.Suite()

const M = getUnionMonoid(eqString)
const s = new Set(['a', 'b'])

suite
  .add('concat', function() {
    M.concat(s, M.empty)
  })
  .on('cycle', function(event: any) {
    // tslint:disable-next-line: no-console
    console.log(String(event.target))
  })
  .on('complete', function(this: any) {
    // tslint:disable-next-line: no-console
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
