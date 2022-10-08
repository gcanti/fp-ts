import * as _ from '@fp-ts/core/Applicative'
import * as T from '@fp-ts/core/Async'
import * as TE from '@fp-ts/core/AsyncResult'
import { pipe } from '@fp-ts/core/Function'
import type { Monoid } from '@fp-ts/core/Monoid'
import * as E from '@fp-ts/core/Result'
import * as S from '@fp-ts/core/string'
import { deepStrictEqual } from '@fp-ts/core/test/util'

describe('Applicative', () => {
  it('getApplicativeMonoid', async () => {
    const log: Array<string> = []

    const right = (s: string, millis: number): TE.AsyncResult<string, string> =>
      TE.fromAsync(
        T.delay(millis)(
          T.fromSync(() => {
            log.push(s)
            return s
          })
        )
      )
    const left = (s: string, millis: number): TE.AsyncResult<string, string> =>
      TE.failAsync(
        T.delay(millis)(
          T.fromSync(() => {
            log.push(s)
            return s
          })
        )
      )
    const M1: Monoid<TE.AsyncResult<string, string>> = _.getApplicativeMonoid(TE.Applicative)(S.Monoid)
    deepStrictEqual(await pipe(right('a', 20), M1.combine(right('b', 10)))(), E.succeed('ab'))
    deepStrictEqual(log, ['a', 'b'])

    deepStrictEqual(await pipe(right('c', 10), M1.combine(left('d', 20)))(), E.fail('d'))
    deepStrictEqual(log, ['a', 'b', 'c', 'd'])

    const M2: Monoid<TE.AsyncResult<string, string>> = _.getApplicativeMonoid(TE.Applicative)(S.Monoid)
    deepStrictEqual(await pipe(right('e', 20), M2.combine(right('f', 10)))(), E.succeed('ef'))
    deepStrictEqual(log, ['a', 'b', 'c', 'd', 'e', 'f'])

    deepStrictEqual(await pipe(right('g', 10), M2.combine(left('h', 20)))(), E.fail('h'))
    deepStrictEqual(log, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])

    deepStrictEqual(await pipe(TE.succeed('a'), M2.combine(M2.empty))(), E.succeed('a'))
    deepStrictEqual(await pipe(M2.empty, M2.combine(TE.succeed('a')))(), E.succeed('a'))
  })
})
