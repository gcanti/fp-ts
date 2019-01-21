import * as Benchmark from 'benchmark'
import { fromOptions } from '../../src/These'
import { some } from '../../src/Option'

const suite = new Benchmark.Suite()

const fl = some('error')
const fa = some(1)

suite
  .add('fromOptions', function() {
    fromOptions(fl, fa)
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
