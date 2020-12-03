import * as Benchmark from 'benchmark'
import { chain, flatten } from '../../src/ReadonlyArray'
import { identity } from '../../src/function'

const suite = new Benchmark.Suite()

const as: ReadonlyArray<ReadonlyArray<number>> = [[1], [2], [3]]

const flatten2: <A>(as: ReadonlyArray<ReadonlyArray<A>>) => ReadonlyArray<A> = chain(identity)

suite
  .add('flatten', function () {
    flatten(as)
  })
  .add('flatten2', function () {
    flatten2(as)
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
