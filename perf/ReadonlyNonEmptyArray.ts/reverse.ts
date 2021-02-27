import * as Benchmark from 'benchmark'
import * as _ from '../../src/ReadonlyNonEmptyArray'

/*
snoc x 11,443,076 ops/sec ±1.78% (85 runs sampled)
snoc2 x 40,554,861 ops/sec ±1.52% (84 runs sampled)
*/

const suite = new Benchmark.Suite()

export const reverse2 = <A>(as: _.ReadonlyNonEmptyArray<A>): _.ReadonlyNonEmptyArray<A> => as.slice().reverse() as any

suite
  .add('reverse', function () {
    _.reverse([1, 2, 3, 4])
  })
  .add('reverse2', function () {
    reverse2([1, 2, 3, 4])
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
