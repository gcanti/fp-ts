import * as Benchmark from 'benchmark'
import * as F from '../src/fluent'
import { option, some, none, fold } from '../src/Option'
import { pipeable, apply, pipe } from '../src/pipeable'

/*

pipeable (inline) x 3,721,768 ops/sec ±0.43% (89 runs sampled)
pipeable x 14,560,080 ops/sec ±1.27% (88 runs sampled)
fluent x 39,130,287 ops/sec ±0.99% (88 runs sampled)
static dictionary x 50,959,548 ops/sec ±0.87% (88 runs sampled)
static dictionary (direct) x 56,698,877 ops/sec ±1.38% (85 runs sampled)

*/

const suite = new Benchmark.Suite()

const fluent = F.fluent(option)

const map = option.map
const chain = option.chain

const O = pipeable(option)

const f = pipe(
  O.map((n: number) => n * 2),
  O.chain(n => (n > 2 ? some(n) : none)),
  O.map(n => n + 1),
  o => fold(o, () => 'none', a => `some(${a})`)
)

suite
  .add('pipeable (inline)', function() {
    apply(
      some(1),
      pipe(
        O.map(n => n * 2),
        O.chain(n => (n > 2 ? some(n) : none)),
        O.map(n => n + 1),
        o => fold(o, () => 'none', a => `some(${a})`)
      )
    )
  })
  .add('pipeable', function() {
    apply(some(1), f)
  })
  .add('fluent', function() {
    // tslint:disable-next-line: no-unused-expression
    fluent(some(1))
      .map(n => n * 2)
      .chain(n => (n > 2 ? some(n) : none))
      .map(n => n + 1)
      .apply(o => fold(o, () => 'none', a => `some(${a})`))
  })
  .add('static dictionary', function() {
    fold(
      option.map(option.chain(option.map(some(1), n => n * 2), n => (n > 2 ? some(n) : none)), n => n + 1),
      () => 'none',
      a => `some(${a})`
    )
  })
  .add('static dictionary (direct)', function() {
    fold(
      map(chain(map(some(1), n => n * 2), n => (n > 2 ? some(n) : none)), n => n + 1),
      () => 'none',
      a => `some(${a})`
    )
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
