import * as Benchmark from 'benchmark'
import * as _ from '../../src/ReadonlyNonEmptyArray'

/*
snoc x 11,443,076 ops/sec ±1.78% (85 runs sampled)
snoc2 x 40,554,861 ops/sec ±1.52% (84 runs sampled)
*/

const suite = new Benchmark.Suite()

export const snoc2 = <A>(init: ReadonlyArray<A>, end: A): _.ReadonlyNonEmptyArray<A> => {
  const len = init.length
  const r = Array(len + 1)
  for (let i = 0; i < len; i++) {
    r[i] = init[i]
  }
  r[len] = end
  return (r as unknown) as _.ReadonlyNonEmptyArray<A>
}

suite
  .add('snoc', function () {
    _.snoc([2, 3, 4], 1)
  })
  .add('snoc2', function () {
    snoc2([2, 3, 4], 1)
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
