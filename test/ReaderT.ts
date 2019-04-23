import * as assert from 'assert'
import { none, option, some } from '../src/Option'
import { reader } from '../src/Reader'
import * as readerT from '../src/ReaderT'
import { lookup } from '../src/Record'

describe('ReaderT', () => {
  it('getReaderT', () => {
    const T = readerT.getReaderT(option)

    function configure(key: string) {
      return (e: Record<string, string>) => lookup(key, e)
    }

    const setupConnection = T.chain(configure('host'), host => {
      return T.chain(configure('user'), user => {
        return T.map(configure('password'), password => [host, user, password] as [string, string, string])
      })
    })

    const goodConfig = {
      host: 'myhost',
      user: 'giulio',
      password: 'password'
    }

    assert.deepStrictEqual(setupConnection(goodConfig), some(['myhost', 'giulio', 'password']))

    const badConfig = {
      host: 'myhost',
      user: 'giulio'
    }

    assert.deepStrictEqual(setupConnection(badConfig), none)

    const f = T.fromReader(reader.of<void, number>(1))
    assert.deepStrictEqual(f(undefined), some(1))
  })
})
