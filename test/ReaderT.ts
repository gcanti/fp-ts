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
    const readerOption = readerT.getReaderT(option)

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
})
