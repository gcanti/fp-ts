import * as _ from '../src/Applicative'
import * as E from '../src/Either'
import { pipe } from '../src/f'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import { deepStrictEqual } from './util'
import * as S from '../src/string'
import type { Monoid } from '../src/Monoid'

describe('Applicative', () => {
  it('getApplicativeMonoid', async () => {
    const log: Array<string> = []

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
    const M1: Monoid<TE.TaskEither<string, string>> = _.getApplicativeMonoid(TE.Applicative)(S.Monoid)
    deepStrictEqual(await pipe(right('a', 20), M1.combine(right('b', 10)))(), E.right('ab'))
    deepStrictEqual(log, ['a', 'b'])

    deepStrictEqual(await pipe(right('c', 10), M1.combine(left('d', 20)))(), E.left('d'))
    deepStrictEqual(log, ['a', 'b', 'c', 'd'])

    const M2: Monoid<TE.TaskEither<string, string>> = _.getApplicativeMonoid(TE.Applicative)(S.Monoid)
    deepStrictEqual(await pipe(right('e', 20), M2.combine(right('f', 10)))(), E.right('ef'))
    deepStrictEqual(log, ['a', 'b', 'c', 'd', 'e', 'f'])

    deepStrictEqual(await pipe(right('g', 10), M2.combine(left('h', 20)))(), E.left('h'))
    deepStrictEqual(log, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])

    deepStrictEqual(await pipe(TE.right('a'), M2.combine(M2.empty))(), E.right('a'))
    deepStrictEqual(await pipe(M2.empty, M2.combine(TE.right('a')))(), E.right('a'))
  })
})
