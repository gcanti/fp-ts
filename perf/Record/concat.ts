import * as Benchmark from 'benchmark'
import { getMonoid } from '../../src/Record'
import { semigroupSum } from '../../src/Semigroup'

const suite = new Benchmark.Suite()

const M = getMonoid(semigroupSum)
const as = { a: 1, b: 2 }

suite
  .add('concat', function() {
    M.concat(as, M.empty)
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
