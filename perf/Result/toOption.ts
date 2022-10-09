import * as Benchmark from 'benchmark'
import * as result from '../../src/Result'
import * as _ from '../../src/internal'
import type { Option } from '../../src/Option'

const suite = new Benchmark.Suite()

export const getSuccess = <E, A>(self: result.Result<E, A>): Option<A> =>
  result.isFailure(self) ? _.none : _.some(self.success)

const input = result.succeed(1)

suite
  .add('toOption (production)', function () {
    result.toOption(input)
  })
  .add('getSuccess', function () {
    getSuccess(input)
  })
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
