import * as Benchmark from 'benchmark'
import { getMonoid, empty } from '../../src/ReadonlyArray'

const suite = new Benchmark.Suite()

const M = getMonoid<number>()
const as: ReadonlyArray<number> = [1, 2, 3]

suite
  .add('concat', function () {
    M.concat(as, empty)
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
