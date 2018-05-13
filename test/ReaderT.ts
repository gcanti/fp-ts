import * as assert from 'assert'
import { none, option, some } from '../src/Option'
import { reader } from '../src/Reader'
import * as readerT from '../src/ReaderT'
import { StrMap, lookup } from '../src/StrMap'

const readerOption = readerT.getReaderT(option)

describe('ReaderT', () => {
  it('fromReader', () => {
    const f = readerT.fromReader(option)(reader.of<void, number>(1))
    assert.deepEqual(f(undefined), some(1))
  })

  it('ReaderOption', () => {
    function configure(key: string) {
      return (e: StrMap<string>) => lookup(key, e)
    }

    const setupConnection = readerOption.chain(host => {
      return readerOption.chain(user => {
        return readerOption.map(password => [host, user, password] as [string, string, string], configure('password'))
      }, configure('user'))
    }, configure('host'))

    const goodConfig = new StrMap({
      host: 'myhost',
      user: 'giulio',
      password: 'password'
    })

    assert.deepEqual(setupConnection(goodConfig), some(['myhost', 'giulio', 'password']))

    const badConfig = new StrMap({
      host: 'myhost',
      user: 'giulio'
    })

    assert.deepEqual(setupConnection(badConfig), none)
  })

  it('of', () => {
    const of = readerT.of(option)
    assert.deepEqual(of(1)({}), some(1))
  })

  it('ap', () => {
    const of = readerT.of(option)
    const ap = readerT.ap(option)
    const double = (n: number): number => n * 2
    const fab = of(double)
    const fa = of(1)
    assert.deepEqual(ap(fab, fa)({}), some(2))
  })

  it('ask', () => {
    const ask = readerT.ask(option)
    assert.deepEqual(ask()(1), some(1))
  })

  it('asks', () => {
    const asks = readerT.asks(option)
    assert.deepEqual(asks((s: string) => s.length)('foo'), some(3))
  })
})
