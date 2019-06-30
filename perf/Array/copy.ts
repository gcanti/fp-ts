import * as Benchmark from 'benchmark'
import { copy } from '../../src/Array'

const suite = new Benchmark.Suite()

const as = [1, 2, 3]

suite
  .add('copy (native)', function() {
    as.slice()
  })
  .add('copy (Array)', function() {
    copy(as)
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
