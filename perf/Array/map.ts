import * as Benchmark from 'benchmark'
import { map, filter } from '../../src/Array'
import { pipe } from '../../src/pipeable'

const suite = new Benchmark.Suite()

const as = [1, 2, 3]
const double = (n: number) => n * 2

suite
  .add('native', function() {
    as.map(double).filter(n => n > 2)
  })
  .add('pipe', function() {
    pipe(as, map(double), filter(n => n > 2))
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
