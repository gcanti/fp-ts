import * as assert from 'assert'
import { identity } from '../src/function'
import { monoidSum } from '../src/Monoid'
import {
  getComonad,
  Traced
} from '../src/Traced'

describe('Traced', () => {
  it('lift', () => {
    const { map } = getComonad(monoidSum)

    const t = map(
      e => e * 2,
      new Traced((e: number) => e + 1)
    )

    assert.strictEqual(
      (t as Traced<number, number>).run(0),
      2
    )
  })

  it('extract', () => {
    const { extract } = getComonad(monoidSum)

    const t = new Traced<number, number>(identity)

    assert.strictEqual(
      extract(t),
      0
    )
  })

  it('extend', () => {
    const { extend, extract } = getComonad(monoidSum)

    const t = extend(
      ea => extract(ea) * 2,
      new Traced((e: number) => e + 1)
    )

    assert.strictEqual(
      extract(t),
      2
    )
  })

  it('w.extend(g).extend(f) is equivalent to w.extend(_w => f(_w.extend(g)))', () => {
    const { extend, extract } = getComonad(monoidSum)

    const t = new Traced((e: number) => e + 1)

    const g = (ea: Traced<number, number>) => (extract(ea) + 1) * 2
    const f = (ea: Traced<number, number>) => (extract(ea) * 3) ** 4
    const h = (ea: Traced<number, number>) => f(extend(g, ea) as Traced<number, number>)

    assert.strictEqual(
      extract(extend(f, extend(g, t))),
      extract(extend(h, t))
    )
  })

  it('w.extend(_w => _w.extract()) is equivalent to w', () => {
    const { extend, extract } = getComonad(monoidSum)

    const t = new Traced((e: number) => e.toString())

    assert.strictEqual(
      extract(extend(ea => extract(ea), t)),
      extract(t)
    )
  })

  it('w.extend(f).extract() is equivalent to f(w)', () => {
    const { extend, extract } = getComonad(monoidSum)

    const t = new Traced((e: number) => e + 1)

    const f = (ea: Traced<number, number>) => extract(ea).toString()

    assert.strictEqual(
      extract(extend(f , t)),
      f(t)
    )
  })
})
