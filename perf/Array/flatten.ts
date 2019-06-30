import * as Benchmark from 'benchmark'
import { array, flatten } from '../../src/Array'
import { identity } from '../../src/function'

const suite = new Benchmark.Suite()

const as = [[1], [2], [3]]

const flatten2 = <A>(as: Array<Array<A>>): Array<A> => array.chain(as, identity)

suite
  .add('flatten', function() {
    flatten(as)
  })
  .add('flatten2', function() {
    flatten2(as)
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
