import * as assert from 'assert'
import type { Apply } from '../src/Apply'
import type { FromTask } from '../src/FromTask'
import { pipe } from '../src/Function'
import type { TypeLambda, Kind } from '../src/HKT'
import * as T from '../src/Task'
import type * as Se from '../src/Semigroup'
import * as fc from 'fast-check'
import type { Eq } from '../src/Eq'

export const deepStrictEqual = <A>(actual: A, expected: A) => {
  assert.deepStrictEqual(actual, expected)
}

export const strictEqual = <A>(actual: A, expected: A) => {
  assert.strictEqual(actual, expected)
}

export const double = (n: number): number => n * 2

export interface AssertParSeq {
  <F extends TypeLambda>(
    F: Apply<F>,
    MT: FromTask<F>,
    run: (fa: Kind<F, unknown, unknown, unknown, unknown, unknown>) => Promise<unknown>
  ): Promise<void>
}
export const assertParSeq =
  (expected: ReadonlyArray<string>): AssertParSeq =>
  async <F extends TypeLambda>(
    F: Apply<F>,
    MT: FromTask<F>,
    run: (fa: Kind<F, unknown, unknown, unknown, unknown, unknown>) => Promise<unknown>
  ): Promise<void> => {
    const log: Array<string> = []
    const a = MT.fromTask(T.delay(100)(T.fromIO(() => log.push('a'))))
    const b = MT.fromTask(T.fromIO(() => log.push('b')))
    const tuple =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    const ab = pipe(a, F.map(tuple), F.ap(b))
    await run(ab)
    deepStrictEqual(log, expected)
  }

export const assertPar = assertParSeq(['b', 'a'])

export const assertSeq = assertParSeq(['a', 'b'])

// -------------------------------------------------------------------------------------
// laws
// -------------------------------------------------------------------------------------

export const laws = {
  semigroup: {
    associativity:
      <A>(S: Se.Semigroup<A>, E: Eq<A>) =>
      (a: A, b: A, c: A): boolean =>
        E.equals(pipe(a, S.combine(b), S.combine(c)))(pipe(a, S.combine(pipe(b, S.combine(c)))))
  }
}

// -------------------------------------------------------------------------------------
// properties
// -------------------------------------------------------------------------------------

export const properties = {
  semigroup: {
    associativity:
      <A>(S: Se.Semigroup<A>, E: Eq<A>) =>
      (arb: fc.Arbitrary<A>) =>
        fc.property(arb, arb, arb, laws.semigroup.associativity(S, E))
  }
}
