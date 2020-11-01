import * as Benchmark from 'benchmark'
import * as A from '../../src/Array'
import * as T from '../../src/Task'
import { pipe } from '../../src/function'

/*
for an array with size 1000
A.sequence(T.task) x 534 ops/sec ±10.52% (64 runs sampled)
T.sequenceArray x 4,237 ops/sec ±7.82% (71 runs sampled)
Promise.all x 4,863 ops/sec ±7.57% (74 runs sampled)
Fastest is Promise.allA
*/

const suite = new Benchmark.Suite()

const arr = A.range(0, 1000)

suite
  .add('A.sequence(T.task)', function () {
    return pipe(arr, A.map(T.of), A.sequence(T.task))()
  })
  .add('T.sequenceArray', function () {
    return pipe(arr, A.map(T.of), T.sequenceArray)()
  })
  .add('Promise.all', function () {
    return pipe(
      arr,
      A.map((x) => Promise.resolve(x)),
      (x) => Promise.all(x)
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
