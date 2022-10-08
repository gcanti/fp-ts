import * as Benchmark from 'benchmark'
import * as _ from '../../src/NonEmptyReadonlyArray'

/*

*/

const suite = new Benchmark.Suite()

export const reverse2 = <A>(as: _.NonEmptyReadonlyArray<A>): _.NonEmptyReadonlyArray<A> => as.slice().reverse() as any

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
