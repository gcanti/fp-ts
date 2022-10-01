import * as Benchmark from 'benchmark'
import { pipe } from '../../src/f'
import { Predicate } from '../../src/Predicate'
import * as _ from '../../src/ReadonlyArray'

/*
 */

const suite = new Benchmark.Suite()

export const filter =
  <B extends A, A = B>(predicate: Predicate<A>) =>
  (fb: ReadonlyArray<B>): ReadonlyArray<B> => {
    return fb.filter((b) => predicate(b))
  }

const input = pipe(
  100,
  _.makeBy((i) => i)
)

const predicate: Predicate<number> = (n) => n % 2 === 0

suite
  .add('filter (native)', function () {
    pipe(input, filter(predicate))
  })
  .add('filter', function () {
    pipe(input, _.filter(predicate))
  })
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
