import * as Benchmark from 'benchmark'
import { pipe } from '../../src/function'

const suite = new Benchmark.Suite()

export function pipe2(a: unknown, ...fns: ReadonlyArray<Function>): unknown {
  let out: unknown = a
  for (let i = 0; i < fns.length; i++) {
    out = fns[i](out)
  }
  return out
}

const f = (n: number) => n + 1
const g = (n: number) => n * 2

suite
  .add('pipe2', function (this: unknown) {
    pipe2(2, f, g, f, g, f, g, f, g, f)
  })
  .add('pipe', function (this: unknown) {
    pipe(2, f, g, f, g, f, g, f, g, f)
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
