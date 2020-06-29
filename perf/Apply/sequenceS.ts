import * as Benchmark from 'benchmark'
import * as A from '../../src/Apply'
import * as E from '../../src/Either'

/*
sequenceS (1) x 13,783,868 ops/sec ±1.90% (82 runs sampled)
sequenceS (2) x 8,007,962 ops/sec ±1.55% (83 runs sampled)
sequenceS (3) x 4,969,669 ops/sec ±1.50% (86 runs sampled)
sequenceS (4) x 3,796,491 ops/sec ±0.98% (87 runs sampled)
sequenceS (5) x 2,973,628 ops/sec ±0.50% (89 runs sampled)
sequenceS (6) x 1,126,226 ops/sec ±3.36% (84 runs sampled)
*/

const suite = new Benchmark.Suite()

const sequenceS = A.sequenceS(E.applicativeEither)

suite
  .add('sequenceS (1)', function () {
    sequenceS({ a: E.right(1) })
  })
  .add('sequenceS (2)', function () {
    sequenceS({ a: E.right(1), b: E.right(2) })
  })
  .add('sequenceS (3)', function () {
    sequenceS({ a: E.right(1), b: E.right(2), c: E.right(3) })
  })
  .add('sequenceS (4)', function () {
    sequenceS({ a: E.right(1), b: E.right(2), c: E.right(3), d: E.right(4) })
  })
  .add('sequenceS (5)', function () {
    sequenceS({ a: E.right(1), b: E.right(2), c: E.right(3), d: E.right(4), e: E.right(5) })
  })
  .add('sequenceS (6)', function () {
    sequenceS({ a: E.right(1), b: E.right(2), c: E.right(3), d: E.right(4), e: E.right(5), f: E.right(6) })
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
