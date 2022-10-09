import * as Benchmark from 'benchmark'
import * as alt from '../../src/Alt'
import type { Kind, TypeLambda } from '../../src/HKT'
import * as option from '../../src/Option'

const suite = new Benchmark.Suite()

export const firstSuccessOfNonEmpty2 = <G extends TypeLambda>(Alt: alt.Alt<G>) => {
  const firstSuccessOf_ = alt.firstSuccessOf(Alt)
  return <S, R, O, E, A>(
    head: Kind<G, S, R, O, E, A>,
    ...tail: ReadonlyArray<Kind<G, S, R, O, E, A>>
  ): Kind<G, S, R, O, E, A> => firstSuccessOf_(head)(tail)
}

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
    alt.firstSuccessOfNonEmpty(option.Alt)(option.none, ...input)
  })
  .add('firstSuccessOf2', function () {
    firstSuccessOfNonEmpty2(option.Alt)(option.none, ...input)
  })
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
