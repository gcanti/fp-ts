import * as assert from 'assert'
import { getContM } from '../src/ContT'
import { IO, io } from '../src/IO'

const T = getContM(io)

const gt2 = (n: number): IO<boolean> => io.of(n > 2)

describe('ContT', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(T.map(T.of<boolean, number>(1), double)(gt2)(), false)
    assert.deepStrictEqual(T.map(T.of<boolean, number>(2), double)(gt2)(), true)
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const mab = T.of<boolean, (n: number) => number>(double)
    const ma = T.of<boolean, number>(1)
    assert.deepStrictEqual(T.ap(mab, ma)(gt2)(), false)
  })

  it('chain', () => {
    const doubleM = (n: number) => T.of<boolean, number>(n * 2)
    assert.deepStrictEqual(T.chain(T.of<boolean, number>(1), doubleM)(gt2)(), false)
    assert.deepStrictEqual(T.chain(T.of<boolean, number>(2), doubleM)(gt2)(), true)
  })

  it('fromM', () => {
    assert.deepStrictEqual(T.fromM<boolean, number>(io.of(1))(gt2)(), false)
    assert.deepStrictEqual(T.fromM<boolean, number>(io.of(3))(gt2)(), true)
  })
})
