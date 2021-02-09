import * as U from './util'
import * as _ from '../src/Store'
import * as RA from '../src/ReadonlyArray'
import { pipe } from '../src/function'

const len = (s: string): number => s.length

describe('Store', () => {
  describe('pipeables', () => {
    it('map', () => {
      const wa: _.Store<string, number> = { peek: len, pos: 'a' }
      U.deepStrictEqual(
        _.extract(
          pipe(
            wa,
            _.map((n) => n + 1)
          )
        ),
        2
      )
    })

    it('extend', () => {
      const wa: _.Store<string, number> = { peek: len, pos: 'a' }
      U.deepStrictEqual(
        _.extract(
          pipe(
            wa,
            _.extend((wa) =>
              _.extract(
                pipe(
                  wa,
                  _.map((n) => n + 1)
                )
              )
            )
          )
        ),
        2
      )
    })

    it('duplicate', () => {
      const wa: _.Store<string, number> = { peek: len, pos: 'a' }
      U.deepStrictEqual(_.extract(_.extract(pipe(wa, _.duplicate))), 1)
    })
  })

  it('seek', () => {
    const wa: _.Store<string, number> = { peek: len, pos: 'a' }
    U.deepStrictEqual(_.extract(pipe(wa, _.seek('aa'))), 2)
  })

  it('seeks', () => {
    const wa: _.Store<string, number> = { peek: len, pos: 'a' }
    U.deepStrictEqual(
      _.extract(
        pipe(
          wa,
          _.seeks((s) => s + 'a')
        )
      ),
      2
    )
  })

  it('peeks', () => {
    const wa: _.Store<string, number> = { peek: len, pos: 'a' }
    U.deepStrictEqual(
      pipe(
        wa,
        _.peeks((s) => s + 'a')
      ),
      2
    )
  })

  it('experiment', () => {
    const wa: _.Store<string, number> = { peek: len, pos: 'a' }
    U.deepStrictEqual(
      pipe(
        wa,
        _.experiment(RA.Functor)((s) => [s, s + 'a'])
      ),
      [1, 2]
    )
  })
})
