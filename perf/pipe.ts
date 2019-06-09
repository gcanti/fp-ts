import * as Benchmark from 'benchmark'
import * as O from '../src/Option'
import { pipe } from '../src/pipeable'

const suite = new Benchmark.Suite()

/*
function composition x 22,180,951 ops/sec ±0.50% (86 runs sampled)
pipe x 6,236,586 ops/sec ±2.02% (88 runs sampled)
static dictionary x 55,716,161 ops/sec ±2.25% (85 runs sampled)
*/

suite
  .add('function composition', function() {
    O.map(
      (n: number) => n + 1
    )(O.chain((n: number) => (n > 2 ? O.some(n) : O.none))(O.map((n: number) => n * 2)(O.some(1))))
  })
  .add('pipe', function() {
    pipe(
      O.some(1),
      O.map(n => n * 2),
      O.chain(n => (n > 2 ? O.some(n) : O.none)),
      O.map(n => n + 1)
    )
  })
  .add('static dictionary', function() {
    O.option.map(O.option.chain(O.option.map(O.some(1), n => n * 2), n => (n > 2 ? O.some(n) : O.none)), n => n + 1)
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
