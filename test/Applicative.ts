import * as _ from '../src/Applicative'
import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import { deepStrictEqual } from './util'
import * as S from '../src/string'
import type { Monoid } from '../src/Monoid'

describe('Applicative', () => {
  it('getApplicativeMonoid', async () => {
    const log: Array<string> = []
    // const a = _.right('a')
    const right = (s: string, millis: number): TE.TaskEither<string, string> =>
      TE.rightTask(
        T.delay(millis)(
          T.fromIO(() => {
            log.push(s)
            return s
          })
        )
      )
    const left = (s: string, millis: number): TE.TaskEither<string, string> =>
      TE.leftTask(
        T.delay(millis)(
          T.fromIO(() => {
            log.push(s)
            return s
          })
        )
      )
    const M1: Monoid<TE.TaskEither<string, string>> = _.getApplicativeMonoid(TE.ApplicativePar)(S.Monoid)
    deepStrictEqual(await pipe(right('a', 20), M1.concat(right('b', 10)))(), E.right('ab'))
    deepStrictEqual(log, ['b', 'a'])

    deepStrictEqual(await pipe(right('c', 10), M1.concat(left('d', 20)))(), E.left('d'))
    deepStrictEqual(log, ['b', 'a', 'c', 'd'])

    const M2: Monoid<TE.TaskEither<string, string>> = _.getApplicativeMonoid(TE.ApplicativeSeq)(S.Monoid)
    deepStrictEqual(await pipe(right('e', 20), M2.concat(right('f', 10)))(), E.right('ef'))
    deepStrictEqual(log, ['b', 'a', 'c', 'd', 'e', 'f'])

    deepStrictEqual(await pipe(right('g', 10), M2.concat(left('h', 20)))(), E.left('h'))
    deepStrictEqual(log, ['b', 'a', 'c', 'd', 'e', 'f', 'g', 'h'])

    deepStrictEqual(await pipe(TE.right('a'), M2.concat(M2.empty))(), E.right('a'))
    deepStrictEqual(await pipe(M2.empty, M2.concat(TE.right('a')))(), E.right('a'))
  })
})
