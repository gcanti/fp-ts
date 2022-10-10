import * as Benchmark from 'benchmark'
import * as alt from '../../src/typeclasses/Alt'
import { pipe } from '../../src/Function'
import type { Kind, TypeLambda } from '../../src/HKT'
import * as option from '../../src/Option'

const suite = new Benchmark.Suite()

export const firstSuccessOfReadonlyArray =
  <G extends TypeLambda>(Alt: alt.Alt<G>) =>
  <S, R, O, E, A>(startWith: Kind<G, S, R, O, E, A>) =>
  (self: ReadonlyArray<Kind<G, S, R, O, E, A>>): Kind<G, S, R, O, E, A> =>
    self.reduce((acc, ga) => Alt.orElse(ga)(acc), startWith)

const input: ReadonlyArray<option.Option<number>> = [
  option.none,
  option.none,
  option.none,
  option.none,
  option.none,
  option.none,
  option.none,
  option.none,
  option.some(9)
]

suite
  .add('firstSuccessOf (production)', function () {
    pipe(input, alt.firstSuccessOf(option.Alt)(option.none as option.Option<number>))
  })
  .add('firstSuccessOf (ReadonlyArray)', function () {
    pipe(input, firstSuccessOfReadonlyArray(option.Alt)(option.none as option.Option<number>))
  })
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
