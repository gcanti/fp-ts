import * as Benchmark from 'benchmark'
import * as O from '../src/Option'
import { pipe } from '../src/pipeable'
import { flow } from '../src/function'

const suite = new Benchmark.Suite()

/*
pipe x 13,635,124 ops/sec ±0.61% (90 runs sampled)
pipe implemented in terms of flow x 3,163,124 ops/sec ±0.35% (87 runs sampled)
*/

// pipe implemented in terms of  flow
const pipe2: typeof pipe = (a: unknown, ...fns: ReadonlyArray<any>): Function => (flow as any)(...fns)(a)

suite
  .add('pipe', function () {
    pipe(
      O.some(1),
      O.map((n) => n * 2),
      O.chain((n) => (n > 2 ? O.some(n) : O.none)),
      O.map((n) => n + 1)
    )
  })
  .add('pipe implemented in terms of flow', function () {
    pipe2(
      O.some(1),
      O.map((n) => n * 2),
      O.chain((n) => (n > 2 ? O.some(n) : O.none)),
      O.map((n) => n + 1)
    )
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
