import * as Benchmark from 'benchmark'
import { flow } from '../../src/function'

const suite = new Benchmark.Suite()

export function flow2(...fns: ReadonlyArray<Function>): Function {
  const len = fns.length
  return function (this: any, ...x: ReadonlyArray<any>) {
    let y = fns[0].apply(this, x)
    for (let i = 1; i < len; i++) {
      y = fns[i].call(this, y)
    }
    return y
  }
}

const f = (n: number) => n + 1
const g = (n: number) => n * 2

suite
  .add('flow2', function (this: unknown) {
    flow2(f, g, f, g, f, g, f, g, f)(2)
  })
  .add('flow', function (this: unknown) {
    flow(f, g, f, g, f, g, f, g, f)(2)
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
