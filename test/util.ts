import * as assert from 'assert'
import { Apply, Apply1, Apply2, Apply2C, Apply3, Apply4, sequenceT } from '../src/Apply'
import { FromTask, FromTask1, FromTask2, FromTask3, FromTask4 } from '../src/FromTask'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from '../src/HKT'
import * as T from '../src/Task'

export const deepStrictEqual = <A>(actual: A, expected: A) => {
  assert.deepStrictEqual(actual, expected)
}

export interface AssertParSeq {
  <F extends URIS4>(
    F: Apply4<F>,
    MT: FromTask4<F>,
    run: (fa: Kind4<F, unknown, unknown, unknown, unknown>) => Promise<unknown>
  ): Promise<void>
  <F extends URIS3>(
    F: Apply3<F>,
    MT: FromTask3<F>,
    run: (fa: Kind3<F, unknown, unknown, unknown>) => Promise<unknown>
  ): Promise<void>
  <F extends URIS2>(F: Apply2<F>, MT: FromTask2<F>, run: (fa: Kind2<F, unknown, unknown>) => Promise<unknown>): Promise<
    void
  >
  <F extends URIS2, E>(
    F: Apply2C<F, E>,
    MT: FromTask2<F>,
    run: (fa: Kind2<F, E, unknown>) => Promise<unknown>
  ): Promise<void>
  <F extends URIS>(F: Apply1<F>, MT: FromTask1<F>, run: (fa: Kind<F, unknown>) => Promise<unknown>): Promise<void>
  <F>(F: Apply<F>, MT: FromTask<F>, run: (fa: HKT<F, unknown>) => Promise<unknown>): Promise<void>
}

export const assertParSeq = (expected: ReadonlyArray<string>): AssertParSeq => async <F>(
  F: Apply<F>,
  MT: FromTask<F>,
  run: (fa: HKT<F, unknown>) => Promise<unknown>
) => {
  // tslint:disable-next-line: readonly-array
  const log: Array<string> = []
  const a = MT.fromTask(T.delay(100)(T.fromIO(() => log.push('a'))))
  const b = MT.fromTask(T.fromIO(() => log.push('b')))
  const ab = sequenceT(F)(a, b)
  await run(ab)
  deepStrictEqual(log, expected)
}

export const assertPar = assertParSeq(['b', 'a'])

export const assertSeq = assertParSeq(['a', 'b'])
