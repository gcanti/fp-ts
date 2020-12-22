import * as assert from 'assert'
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative4 } from '../src/Applicative'
import { FromTask, FromTask1, FromTask2, FromTask2C, FromTask3, FromTask4 } from '../src/FromTask'
import { pipe } from '../src/function'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from '../src/HKT'
import * as T from '../src/Task'

export interface AssertParSeq {
  <F extends URIS4>(
    F: Applicative4<F>,
    MT: FromTask4<F>,
    run: (fa: Kind4<F, unknown, unknown, unknown, unknown>) => Promise<unknown>
  ): Promise<void>
  <F extends URIS3>(
    F: Applicative3<F>,
    MT: FromTask3<F>,
    run: (fa: Kind3<F, unknown, unknown, unknown>) => Promise<unknown>
  ): Promise<void>
  <F extends URIS2>(
    F: Applicative2<F>,
    MT: FromTask2<F>,
    run: (fa: Kind2<F, unknown, unknown>) => Promise<unknown>
  ): Promise<void>
  <F extends URIS2, E>(
    F: Applicative2C<F, E>,
    MT: FromTask2C<F, E>,
    run: (fa: Kind2<F, E, unknown>) => Promise<unknown>
  ): Promise<void>
  <F extends URIS>(F: Applicative1<F>, MT: FromTask1<F>, run: (fa: Kind<F, unknown>) => Promise<unknown>): Promise<void>
  <F>(F: Applicative<F>, MT: FromTask<F>, run: (fa: HKT<F, unknown>) => Promise<unknown>): Promise<void>
}
export const assertParSeq = (expected: ReadonlyArray<string>): AssertParSeq => async <F>(
  F: Applicative<F>,
  MT: FromTask<F>,
  run: (fa: HKT<F, unknown>) => Promise<unknown>
) => {
  // tslint:disable-next-line: readonly-array
  const log: Array<string> = []
  const a = MT.fromTask(T.delay(100)(T.fromIO(() => log.push('a'))))
  const b = MT.fromTask(T.fromIO(() => log.push('b')))
  const tuple = <A>(a: A) => <B>(b: B): readonly [A, B] => [a, b]
  const ab = pipe(a, F.map(tuple), F.ap(b))
  await run(ab)
  assert.deepStrictEqual(log, expected)
}

export const assertPar = assertParSeq(['b', 'a'])

export const assertSeq = assertParSeq(['a', 'b'])
