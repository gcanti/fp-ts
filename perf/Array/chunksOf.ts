import * as Benchmark from 'benchmark'
import { chunksOf } from '../../src/Array'

const suite = new Benchmark.Suite()

const f = chunksOf(3)

suite
  .add('chunksOf', function() {
    f([1, 2, 3, 4, 5, 6, 7, 8, 9])
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
