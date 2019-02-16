import * as assert from 'assert'
import { none, option, some } from '../src/Option'
import { reader } from '../src/Reader'
import * as readerT from '../src/ReaderT'
import { StrMap, lookup } from '../src/StrMap'

describe('ReaderT', () => {
  it('fromReader', () => {
    const f = readerT.fromReader(option)(reader.of<void, number>(1))
    assert.deepStrictEqual(f(undefined), some(1))
  })

  it('getReaderT', () => {
    // tslint:disable-next-line: deprecation
    const readerOption = readerT.getReaderT(option)

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

    assert.deepStrictEqual(setupConnection(goodConfig), some(['myhost', 'giulio', 'password']))

    const badConfig = new StrMap({
      host: 'myhost',
      user: 'giulio'
    })

    assert.deepStrictEqual(setupConnection(badConfig), none)
  })

  it('getReaderT2v', () => {
    const readerOption = readerT.getReaderT2v(option)

    function configure(key: string) {
      return (e: StrMap<string>) => lookup(key, e)
    }

    const setupConnection = readerOption.chain(configure('host'), host => {
      return readerOption.chain(configure('user'), user => {
        return readerOption.map(configure('password'), password => [host, user, password] as [string, string, string])
      })
    })

    const goodConfig = new StrMap({
      host: 'myhost',
      user: 'giulio',
      password: 'password'
    })

    assert.deepStrictEqual(setupConnection(goodConfig), some(['myhost', 'giulio', 'password']))

    const badConfig = new StrMap({
      host: 'myhost',
      user: 'giulio'
    })

    assert.deepStrictEqual(setupConnection(badConfig), none)
  })

  it('of', () => {
    // tslint:disable-next-line: deprecation
    const of = readerT.of(option)
    assert.deepStrictEqual(of(1)({}), some(1))
  })

  it('ap', () => {
    // tslint:disable-next-line: deprecation
    const of = readerT.of(option)
    // tslint:disable-next-line: deprecation
    const ap = readerT.ap(option)
    const double = (n: number): number => n * 2
    const fab = of(double)
    const fa = of(1)
    assert.deepStrictEqual(ap(fab, fa)({}), some(2))
  })

  it('ask', () => {
    // tslint:disable-next-line: deprecation
    const ask = readerT.ask(option)
    assert.deepStrictEqual(ask()(1), some(1))
  })

  it('asks', () => {
    // tslint:disable-next-line: deprecation
    const asks = readerT.asks(option)
    assert.deepStrictEqual(asks((s: string) => s.length)('foo'), some(3))
  })
})
