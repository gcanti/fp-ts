import * as Benchmark from 'benchmark'
import { pipe, pipeOp } from '../../src/function'

const suite = new Benchmark.Suite()

const len = (s: string) => s.length
const double = (n: number) => n * 2
const gt2 = (n: number) => n > 2

suite
  .add('pipe', function() {
    pipe(
      len,
      double,
      gt2
    )('a')
  })
  .add('pipeOf', function() {
    pipeOp('a', len, double, gt2)
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
