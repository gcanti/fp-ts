import * as assert from 'assert'
import { Store, store, seek, seeks, peeks, experiment } from '../src/Store'
import { array } from '../src/Array'

const len = (s: string): number => s.length

describe('Store', () => {
  it('map', () => {
    const wa: Store<string, number> = { peek: len, pos: 'a' }
    assert.strictEqual(store.extract(store.map(wa, n => n + 1)), 2)
  })

  it('extends', () => {
    const wa: Store<string, number> = { peek: len, pos: 'a' }
    assert.strictEqual(store.extract(store.extend(wa, wa => store.extract(store.map(wa, n => n + 1)))), 2)
  })

  it('seek', () => {
    const wa: Store<string, number> = { peek: len, pos: 'a' }
    assert.strictEqual(store.extract(seek(wa, 'aa')), 2)
  })

  it('seeks', () => {
    const wa: Store<string, number> = { peek: len, pos: 'a' }
    assert.strictEqual(store.extract(seeks(wa, s => s + 'a')), 2)
  })

  it('peeks', () => {
    const wa: Store<string, number> = { peek: len, pos: 'a' }
    assert.strictEqual(peeks(wa, s => s + 'a'), 2)
  })

  it('experiment', () => {
    const wa: Store<string, number> = { peek: len, pos: 'a' }
    assert.deepStrictEqual(experiment(array)(wa, s => [s, s + 'a']), [1, 2])
  })
})
