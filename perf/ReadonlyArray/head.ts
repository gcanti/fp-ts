import * as Benchmark from 'benchmark'
import * as readonlyArray from '../../src/ReadonlyArray'
import type { Option } from '../../src/Option'
import * as _ from '../../src/internal'

const suite = new Benchmark.Suite()

export const head = <A>(self: ReadonlyArray<A>): Option<A> =>
  readonlyArray.isNonEmpty(self) ? _.some(self[0]) : _.none

const input = [1, 2, 3]

suite
  .add('head (production)', function () {
    readonlyArray.head(input)
  })
  .add('head', function () {
    head(input)
  })
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
