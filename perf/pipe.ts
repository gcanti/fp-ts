import * as Benchmark from 'benchmark'
import * as O from '../src/Option'
import { pipe } from '../src/pipeable'

const suite = new Benchmark.Suite()

/*
pipe x 21,640,747 ops/sec ±0.48% (85 runs sampled)
static dictionary x 57,118,380 ops/sec ±0.35% (88 runs sampled)
*/

suite
  .add('pipe', function() {
    pipe(
      O.some(1),
      O.map(n => n * 2),
      O.chain(n => (n > 2 ? O.some(n) : O.none)),
      O.map(n => n + 1)
    )
  })
  .add('static dictionary', function() {
    const x = O.some(1)
    const y = O.option.map(x, n => n * 2)
    const z = O.option.chain(y, n => (n > 2 ? O.some(n) : O.none))
    O.option.map(z, n => n + 1)
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
