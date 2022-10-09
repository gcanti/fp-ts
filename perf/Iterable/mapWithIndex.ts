import * as Benchmark from 'benchmark'
import { pipe } from '../../src/Function'
import * as iterable from '../../src/Iterable'

const suite = new Benchmark.Suite()

const input: ReadonlyArray<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9]

suite
  .add('Iterable', function () {
    pipe(
      input,
      iterable.mapWithIndex((i, a) => i + a)
    )
  })
  .add('native', function () {
    input.map((a, i) => i + a)
  })
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
