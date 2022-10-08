import * as Benchmark from 'benchmark'
import * as _ from '../../src/NonEmptyReadonlyArray'
import type { Eq } from '../../src/Eq'
import * as iterable from '../../src/Iterable'
import * as number from '../../src/number'
import type { NonEmptyArray } from '../../src/internal'

/*

*/

const suite = new Benchmark.Suite()

export const toNonEmptyIterable = <A>(self: _.NonEmptyReadonlyArray<A>): iterable.NonEmptyIterable<A> => {
  const a = _.head(self)
  return [
    a,
    {
      [Symbol.iterator]() {
        let i = 0
        return {
          next() {
            i++
            return { value: self[i], done: i === self.length }
          }
        }
      }
    }
  ]
}

export const uniq1 = <A>(Eq: Eq<A>) => {
  const uniq = iterable.uniq(Eq)
  return (self: _.NonEmptyReadonlyArray<A>): _.NonEmptyReadonlyArray<A> =>
    self.length === 1 ? self : uniq(toNonEmptyIterable(self))
}

export const uniq2 = <A>(Eq: Eq<A>) => {
  const uniq = iterable.uniq(Eq)
  return (self: _.NonEmptyReadonlyArray<A>): _.NonEmptyReadonlyArray<A> =>
    self.length === 1 ? self : uniq(_.unprepend(self))
}

export const uniq3 =
  <A>(E: Eq<A>) =>
  (as: _.NonEmptyReadonlyArray<A>): _.NonEmptyReadonlyArray<A> => {
    if (as.length === 1) {
      return as
    }
    const out: NonEmptyArray<A> = [_.head(as)]
    const rest = _.tail(as)
    for (const a of rest) {
      if (out.every((o) => !E.equals(o)(a))) {
        out.push(a)
      }
    }
    return out
  }

const u = _.uniq(number.Eq)
const u1 = uniq1(number.Eq)
const u2 = uniq2(number.Eq)
const u3 = uniq3(number.Eq)

const input: _.NonEmptyReadonlyArray<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9]

suite
  .add('uniq', function () {
    u(input)
  })
  .add('uniq1', function () {
    u1(input)
  })
  .add('uniq2', function () {
    u2(input)
  })
  .add('uniq3', function () {
    u3(input)
  })
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
