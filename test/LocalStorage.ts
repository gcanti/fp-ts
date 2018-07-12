import * as assert from 'assert'
import { getItem, setItem, removeItem, clear, length, key } from '../src/LocalStorage'
import { some, none } from '../src/Option'

const mockLocalStorage = (state: Record<string, string | undefined>): Storage => {
  const storage = {
    clear: () => {
      for (let k of Object.keys(state)) {
        delete state[k]
      }
    },
    getItem: (key: string): string | null => {
      const item = state[key]
      return item === undefined ? null : item
    },
    key: (index: number): string | null => {
      const x: string | undefined = Object.keys(state)[index]
      // tslint:disable-next-line
      return x === undefined ? null : x
    },
    get length(): number {
      return Object.keys(state).length
    },
    removeItem: (key: string): void => {
      delete state[key]
    },
    setItem: (key: string, value: string): void => {
      state[key] = value
    }
  }
  return storage
}

describe('LocalStorage', () => {
  it('clear', () => {
    const g = global as any
    const original = g.localStorage
    const state = { a: 'foo' }
    g.localStorage = mockLocalStorage(state)
    clear.run()
    assert.deepEqual(state, {})
    g.localStorage = original
  })

  it('getItem', () => {
    const g = global as any
    const original = g.localStorage
    g.localStorage = mockLocalStorage({
      a: 'foo'
    })
    assert.deepEqual(getItem('a').run(), some('foo'))
    assert.deepEqual(getItem('b').run(), none)
    g.localStorage = original
  })

  it('key', () => {
    const g = global as any
    const original = g.localStorage
    g.localStorage = mockLocalStorage({
      a: 'foo'
    })
    assert.deepEqual(key(0).run(), some('a'))
    assert.deepEqual(key(1).run(), none)
    g.localStorage = original
  })

  it('length', () => {
    const g = global as any
    const original = g.localStorage
    g.localStorage = mockLocalStorage({
      a: 'foo'
    })
    assert.deepEqual(length.run(), 1)
    g.localStorage = original
  })

  it('removeItem', () => {
    const g = global as any
    const original = g.localStorage
    const state = { a: 'foo' }
    g.localStorage = mockLocalStorage(state)
    removeItem('a').run()
    assert.deepEqual(state, {})
    g.localStorage = original
  })

  it('setItem', () => {
    const g = global as any
    const original = g.localStorage
    const state = {}
    g.localStorage = mockLocalStorage(state)
    setItem('a', 'foo').run()
    assert.deepEqual(state, { a: 'foo' })
    g.localStorage = original
  })
})
