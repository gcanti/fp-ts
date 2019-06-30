import * as Benchmark from 'benchmark'
import { flow } from '../../src/function'

const suite = new Benchmark.Suite()

export function flowWithoutSwitch<A extends Array<unknown>, B>(ab: (...a: A) => B): (...a: A) => B
export function flowWithoutSwitch<A extends Array<unknown>, B, C>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C
export function flowWithoutSwitch<A extends Array<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...a: A) => D
export function flowWithoutSwitch<A extends Array<unknown>, B, C, D, E>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): (...a: A) => E
export function flowWithoutSwitch<A extends Array<unknown>, B, C, D, E, F>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (...a: A) => F
export function flowWithoutSwitch<A extends Array<unknown>, B, C, D, E, F, G>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (...a: A) => G
export function flowWithoutSwitch<A extends Array<unknown>, B, C, D, E, F, G, H>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (...a: A) => H
export function flowWithoutSwitch<A extends Array<unknown>, B, C, D, E, F, G, H, I>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (...a: A) => I
export function flowWithoutSwitch<A extends Array<unknown>, B, C, D, E, F, G, H, I, J>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (...a: A) => J
export function flowWithoutSwitch(...fns: Array<Function>): Function {
  const len = fns.length - 1
  return function(this: any, ...x: Array<any>) {
    let y = fns[0].apply(this, x)
    for (let i = 1; i <= len; i++) {
      y = fns[i].call(this, y)
    }
    return y
  }
}

const f = (n: number) => n + 1
const g = (n: number) => n * 2

suite
  .add('flow without switch', function(this: unknown) {
    flowWithoutSwitch(f, g, f, g, f, g, f, g, f)(2)
  })
  .add('flow', function(this: unknown) {
    flow(
      f,
      g,
      f,
      g,
      f,
      g,
      f,
      g,
      f
    )(2)
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
