import * as Benchmark from 'benchmark'
import { ReadonlyRecord } from '../../src/ReadonlyRecord'
import * as RA from '../../src/ReadonlyArray'

const suite = new Benchmark.Suite()

export const isEmpty = (r: ReadonlyRecord<string, unknown>): boolean => {
  // tslint:disable-next-line: forin
  for (const _ in r) {
    return false
  }
  return true
}

export const isEmpty2 = (r: ReadonlyRecord<string, unknown>): boolean => RA.isEmpty(Object.keys(r))

const r: ReadonlyRecord<string, number> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 1,
  f: 2,
  g: 3,
  h: 4,
  i: 1,
  j: 2,
  l: 3,
  m: 4
}

suite
  .add('isEmpty', function (this: unknown) {
    isEmpty(r)
  })
  .add('isEmpty2', function (this: unknown) {
    isEmpty2(r)
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
