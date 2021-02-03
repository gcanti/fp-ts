import * as fc from 'fast-check'
import { isDeepStrictEqual } from 'util'
import * as _ from '../src/Separated'
import { pipe } from '../src/function'

describe('Separated', () => {
  describe('pipeables', () => {
    it('mapLeft', () =>
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (left, right) => {
          isDeepStrictEqual(
            pipe(
              _.separated(left, right),
              _.mapLeft((n) => n.toString())
            ),
            _.separated(`${left}`, right)
          )
          isDeepStrictEqual(
            _.Bifunctor.mapLeft(_.separated(left, right), (n) => n.toString()),
            _.separated(`${left}`, right)
          )
        })
      ))

    it('map', () =>
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (left, right) => {
          isDeepStrictEqual(
            pipe(
              _.separated(left, right),
              _.map((n) => n.toString())
            ),
            _.separated(left, `${right}`)
          )
          isDeepStrictEqual(
            _.Functor.map(_.separated(left, right), (n) => n.toString()),
            _.separated(left, `${right}`)
          )
        })
      ))

    it('bimap', () =>
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (left, right) => {
          isDeepStrictEqual(
            pipe(
              _.separated(left, right),
              _.bimap(
                (n) => n.toString(),
                (n) => n.toString()
              )
            ),
            _.separated(`${left}`, `${right}`)
          )
          isDeepStrictEqual(
            _.Bifunctor.bimap(
              _.separated(left, right),
              (n) => n.toString(),
              (n) => n.toString()
            ),
            _.separated(`${left}`, `${right}`)
          )
        })
      ))
  })
})
