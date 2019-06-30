import * as Benchmark from 'benchmark'
import * as O from '../../src/Option'

const suite = new Benchmark.Suite()

/*
fold x 36,072,854 ops/sec ±0.35% (88 runs sampled)
foldUncurried x 35,822,344 ops/sec ±0.43% (89 runs sampled)
isNone x 39,538,896 ops/sec ±0.38% (90 runs sampled)
*/

function foldUncurried<A, R>(ma: O.Option<A>, onNone: () => R, onSome: (a: A) => R): R {
  return O.isNone(ma) ? onNone() : onSome(ma.value)
}

const x = O.some(1)

const onNone = () => 'none'
const onSome = (a: unknown) => `some(${a})`

suite
  .add('fold', function() {
    O.fold(onNone, onSome)(x)
  })
  .add('foldUncurried', function() {
    foldUncurried(x, onNone, onSome)
  })
  .add('isNone', function() {
    // tslint:disable-next-line: no-unused-expression
    O.isNone(x) ? 'none' : `some(${x.value})`
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
