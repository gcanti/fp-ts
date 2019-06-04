import * as assert from 'assert'
import { Store, store, seek, seeks, peeks, experiment } from '../src/Store'
import { array } from '../src/Array'
import { pipe } from '../src/pipeable'

const len = (s: string): number => s.length

describe('Store', () => {
  it('map', () => {
    const wa = new Store<string, number>(len, 'a')
    assert.strictEqual(store.extract(store.map(wa, n => n + 1)), 2)
  })

  it('extends', () => {
    const wa = new Store<string, number>(len, 'a')
    assert.strictEqual(store.extract(store.extend(wa, wa => store.extract(store.map(wa, n => n + 1)))), 2)
  })

  it('seek', () => {
    const wa = new Store<string, number>(len, 'a')
    assert.strictEqual(
      store.extract(
        pipe(
          wa,
          seek('aa')
        )
      ),
      2
    )
  })

  it('seeks', () => {
    const wa = new Store<string, number>(len, 'a')
    assert.strictEqual(
      store.extract(
        pipe(
          wa,
          seeks(s => s + 'a')
        )
      ),
      2
    )
  })

  it('peeks', () => {
    const wa = new Store<string, number>(len, 'a')
    assert.strictEqual(
      pipe(
        wa,
        peeks(s => s + 'a')
      ),
      2
    )
  })

  it('experiment', () => {
    const wa = new Store<string, number>(len, 'a')
    assert.deepStrictEqual(
      pipe(
        wa,
        experiment(array)(s => [s, s + 'a'])
      ),
      [1, 2]
    )
  })
})
